// Autosave form data to localStorage with hydration on mount.
// Manually implemented to provide resilient persistence without server deps.
import { useEffect, useRef } from 'react';
import { IoSchema, type IoPayload } from '../features/io/schema';

type UseAutosaveArgs = {
	watch: (callback: (value: unknown, info: { name?: string; type?: string }) => void) => {
		unsubscribe: () => void;
	};
	reset: (values: Partial<IoPayload>) => void;
	storageKey?: string;
	debounceMs?: number;
};

function removeUnserializableFiles<T extends Record<string, unknown>>(data: T): T {
	// Shallowly strip File/FileList values; nested complex objects remain stringified as JSON.
	const clone: Record<string, unknown> = {};
	for (const [key, value] of Object.entries(data)) {
		if (typeof File !== 'undefined' && value instanceof File) continue;
		if (typeof FileList !== 'undefined' && value instanceof FileList) continue;
		clone[key] = value as unknown;
	}
	return clone as T;
}

export function useAutosave({ watch, reset, storageKey = 'ioFormData', debounceMs = 500 }: UseAutosaveArgs): void {
	const timerRef = useRef<number | null>(null);
	const mountedRef = useRef<boolean>(false);

	// Hydrate from localStorage on mount
	useEffect(() => {
		if (mountedRef.current) return;
		mountedRef.current = true;
		try {
			const raw = localStorage.getItem(storageKey);
			if (!raw) return;
			const parsed = JSON.parse(raw);
			// Accept partials to avoid blocking hydration when schema evolves
			const safe = IoSchema.partial().safeParse(parsed);
			if (safe.success) {
				reset(safe.data as Partial<IoPayload>);
			}
		} catch {
			// Intentionally ignore malformed storage
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Subscribe to changes and debounce-save
	useEffect(() => {
		const subscription = watch((value) => {
			// Debounce writes to reduce churn
			if (timerRef.current) {
				window.clearTimeout(timerRef.current);
			}
			timerRef.current = window.setTimeout(() => {
				try {
					const cleaned = removeUnserializableFiles(
						(value || {}) as Record<string, unknown>
					);
					// Optional schema guard to avoid storing non-conforming shapes
					const safe = IoSchema.partial().safeParse(cleaned);
					if (safe.success) {
						localStorage.setItem(storageKey, JSON.stringify(safe.data));
					}
				} catch {
					// Best-effort persistence; ignore storage errors
				}
			}, debounceMs) as unknown as number;
		});
		return () => {
			if (timerRef.current) {
				window.clearTimeout(timerRef.current);
			}
			subscription.unsubscribe();
		};
	}, [watch, storageKey, debounceMs]);
}

export default useAutosave;
