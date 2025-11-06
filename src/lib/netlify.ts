// Helper functions for interacting with Netlify Forms.
// Manually implemented to centralize encoding and submission logic.

export type NetlifySubmitOptions = {
	multipart?: boolean;
	recaptchaToken?: string;
	honeypotValue?: string;
	formName?: string; // default: 'io-form'
};

// x-www-form-urlencoded encoder (RFC 3986)
export function encodeFormUrl(data: Record<string, unknown>): string {
	// Manually implemented to ensure consistent encoding across environments.
	const params = new URLSearchParams();
	Object.entries(data).forEach(([key, value]) => {
		if (value === undefined || value === null) return;
		if (Array.isArray(value)) {
			value.forEach((v) => params.append(key, String(v)));
		} else {
			params.append(key, String(value));
		}
	});
	return params.toString();
}

// Construct FormData for multipart/form-data
export function buildMultipartFormData(
	payload: Record<string, unknown>,
	optionalFiles?: Record<string, File | Blob | FileList | undefined | null>
): FormData {
	// Manually implemented to preserve file metadata and support FileList.
	const formData = new FormData();
	Object.entries(payload).forEach(([key, value]) => {
		if (value === undefined || value === null) return;
		// Convert objects to JSON strings to avoid [object Object]
		const isPlainObject =
			typeof value === 'object' && !(value instanceof Blob) && !(value instanceof File);
		formData.append(key, isPlainObject ? JSON.stringify(value) : String(value));
	});

	if (optionalFiles) {
		Object.entries(optionalFiles).forEach(([key, value]) => {
			if (!value) return;
			if (value instanceof File || value instanceof Blob) {
				formData.append(key, value);
			} else if (typeof FileList !== 'undefined' && value instanceof FileList) {
				// Append all files in the FileList under the same field name
				for (let i = 0; i < value.length; i += 1) {
					formData.append(key, value.item(i)!);
				}
			}
		});
	}
	return formData;
}

// Post to Netlify captured forms on the same origin (static site)
export async function postToNetlify(
	payload: Record<string, unknown>,
	options: NetlifySubmitOptions = {}
): Promise<Response> {
	// Manually chosen defaults to match hidden form config.
	const formName = options.formName ?? 'io-form';
	const enriched: Record<string, unknown> = {
		'form-name': formName,
		'bot-field': options.honeypotValue ?? '',
		...payload,
	};
	if (options.recaptchaToken) {
		enriched['g-recaptcha-response'] = options.recaptchaToken;
	}

	if (options.multipart) {
		// Detect File/Blob fields from payload to include as files, not JSON
		const fileFields: Record<string, File | Blob | FileList> = {};
		const nonFilePayload: Record<string, unknown> = {};
		for (const [key, value] of Object.entries(enriched)) {
			if (
				value instanceof File ||
				value instanceof Blob ||
				(typeof FileList !== 'undefined' && value instanceof FileList)
			) {
				fileFields[key] = value as any;
			} else {
				nonFilePayload[key] = value;
			}
		}
		const formData = buildMultipartFormData(nonFilePayload, fileFields);
		// Netlify expects POST to the same page or '/'
		// Manually using '/' to avoid SPA route issues.
		return fetch('/', {
			method: 'POST',
			body: formData,
		});
	}

	const body = encodeFormUrl(enriched);
	return fetch('/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body,
	});
}

export default {
	encodeFormUrl,
	buildMultipartFormData,
	postToNetlify,
};
