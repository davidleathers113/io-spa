import { useState, useMemo } from 'react';
import { Controller, type Control } from 'react-hook-form';

type TagInputProps<FormT> = {
	control: Control<FormT>;
	name: string;
	placeholder?: string;
	helperText?: string;
	/**
	 * Sanitize a token before adding. Return undefined to skip adding.
	 */
	sanitize?: (raw: string) => string | undefined;
};

function splitToList(raw: string | null | undefined): string[] {
	if (!raw) return [];
	return raw
		.split(/[,\n]/g)
		.map((s) => s.trim())
		.filter((s) => s.length > 0);
}

export function defaultPhoneSanitizer(raw: string): string | undefined {
	const digits = raw.replace(/\D+/g, '');
	if (!digits) return undefined;
	// Accept 10-11 digits commonly used in NANP; otherwise keep raw digits >=7
	if (digits.length >= 7) return digits;
	return undefined;
}

export default function TagInput<FormT>({
	control,
	name,
	placeholder,
	helperText,
	sanitize,
}: TagInputProps<FormT>) {
	const [draft, setDraft] = useState('');
	const sanitizeToken = useMemo(() => sanitize ?? ((s: string) => s.trim() || undefined), [sanitize]);

	return (
		<Controller
			control={control}
			name={name as any}
			render={({ field: { value, onChange, onBlur } }) => {
				const tags = splitToList((value as unknown as string) ?? '');

				const commitDraft = () => {
					const cleaned = sanitizeToken(draft);
					if (!cleaned) return;
					const next = Array.from(new Set([...tags, cleaned]));
					onChange(next.join(','));
					setDraft('');
				};

				const removeAt = (idx: number) => {
					const next = tags.filter((_, i) => i !== idx);
					onChange(next.join(','));
				};

				return (
					<div>
						<div className="flex flex-wrap items-center gap-2 rounded-md border border-gray-300 bg-white px-2 py-1.5 focus-within:ring-2 focus-within:ring-blue-500">
							{tags.map((t, i) => (
								<span key={`${t}-${i}`} className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700">
									{t}
									<button
										type="button"
										className="text-slate-500 hover:text-slate-700"
										aria-label={`Remove ${t}`}
										onClick={() => removeAt(i)}
									>
										×
									</button>
								</span>
							))}
							<input
								value={draft}
								onChange={(e) => setDraft(e.target.value)}
								onBlur={(e) => {
									onBlur();
									if (e.target.value.trim()) commitDraft();
								}}
								onKeyDown={(e) => {
									if (e.key === 'Enter' || e.key === ',') {
										e.preventDefault();
										commitDraft();
									} else if (e.key === 'Backspace' && !draft && tags.length > 0) {
										removeAt(tags.length - 1);
									}
								}}
								className="flex-1 min-w-[8ch] border-0 focus:outline-none focus:ring-0 text-sm py-1"
								placeholder={placeholder ?? 'Type and press Enter'}
								inputMode="text"
								aria-label={placeholder ?? 'Tag input'}
							/>
						</div>
						{helperText && <p className="mt-1 text-xs text-gray-500">{helperText}</p>}
					</div>
				);
			}}
		/>
	);
}


