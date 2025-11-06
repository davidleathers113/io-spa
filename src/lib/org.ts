// Organization defaults for the Seller/Publisher party.
// Manually change these to your organization details or wire to env via import.meta.env.
export const ORG_SELLER_DEFAULTS = {
	seller_company: '',
	seller_contact: '',
	seller_email: '',
	seller_phone: '',
	seller_address: '',
};

export function hasSellerDefaults(): boolean {
	return !!(ORG_SELLER_DEFAULTS.seller_company && ORG_SELLER_DEFAULTS.seller_contact && ORG_SELLER_DEFAULTS.seller_email);
}

// Helper to merge defaults into an arbitrary payload without overwriting provided values.
export function mergeSellerDefaults<T extends Record<string, unknown>>(payload: T): T {
	const result: Record<string, unknown> = { ...payload };
	(Object.keys(ORG_SELLER_DEFAULTS) as Array<keyof typeof ORG_SELLER_DEFAULTS>).forEach((k) => {
		if (result[k] === undefined || result[k] === '' || result[k] === null) {
			result[k] = ORG_SELLER_DEFAULTS[k];
		}
	});
	return result as T;
}


