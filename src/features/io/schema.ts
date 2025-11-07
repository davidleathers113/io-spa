// src/features/io/schema.ts
import { z } from 'zod';

export const Parties = z.object({
  buyer_company: z.string().min(2),
  buyer_contact: z.string().min(2),
  buyer_email: z.string().email(),
  buyer_phone: z.string().optional(),
  buyer_address: z.string().optional(),
  billing_email: z.string().email().optional(),
  // Seller fields are provided by the initiator's org profile; not edited by buyer.
  seller_company: z.string().min(2).optional(),
  seller_contact: z.string().min(2).optional(),
  seller_email: z.string().email().optional(),
  seller_phone: z.string().optional(),
  seller_address: z.string().optional(),
  seller_notes: z.string().optional(),
});

// Legacy single-campaign fields (kept optional for backward compatibility)
export const Campaign = z.object({
  offer_name: z.string().min(2),
  vertical: z.string().min(2),
  start_date: z.string().min(1),
  end_date: z.string().optional(),
  timezone: z.string().default('America/New_York'),
  dest_numbers: z.string().optional(), // comma‑separated
  call_type_inbound: z.boolean().optional(),
  call_type_live: z.boolean().optional(),
  src_search: z.boolean().optional(),
  src_social: z.boolean().optional(),
  src_display: z.boolean().optional(),
  src_email: z.boolean().optional(),
  src_sms: z.boolean().optional(),
  src_outbound: z.boolean().optional(),
  prohibited_sources: z.string().optional(),
  geo_allowed: z.string().optional(),
  geo_excluded: z.string().optional(),
  daypart: z.string().optional(),
}).partial();

// Legacy global pricing (kept optional; pricing now per-campaign line)
export const Pricing = z.object({
  payout_model: z.enum(['Per Qualified Call','RevShare','Flat Retainer']).optional(),
  price_per_call: z.coerce.number().nonnegative().optional(),
  qual_seconds: z.coerce.number().int().nonnegative().optional(),
  cap_daily: z.coerce.number().int().nonnegative().optional(),
  cap_concurrency: z.coerce.number().int().nonnegative().optional(),
  billable_kpis: z.string().optional(),
  return_policy: z.string().optional(),
  pricing_notes: z.string().optional(),
});

export const Compliance = z.object({
  req_recording: z.boolean().default(true),
  req_tcpa: z.boolean().default(true),
  req_scrub: z.boolean().default(true),
  req_script: z.boolean().optional(),
  req_double_verify: z.boolean().optional(),
  req_affiliate_disclosure: z.boolean().optional(),
  proof_link: z.string().url().optional(),
  qa_notes: z.string().optional(),
  compliance_contact: z.string().optional(),
});

// New: per-campaign line structure for multi-line IOs
export const CampaignLine = z.object({
  // Basics
  offer_name: z.string().min(2),
  vertical: z.string().min(2),
  start_date: z.string().min(1),
  end_date: z.string().optional(),
  timezone: z.string().default('America/New_York'),
  line_notes: z.string().optional(),
  // Call setup
  call_type_inbound: z.boolean().optional(),
  call_type_live: z.boolean().optional(),
  dest_numbers: z.string().optional(),         // comma-separated
  tracking_numbers: z.string().optional(),     // comma- or newline-separated
  ivr_notes: z.string().optional(),
  // Targeting
  src_search: z.boolean().optional(),
  src_social: z.boolean().optional(),
  src_display: z.boolean().optional(),
  src_email: z.boolean().optional(),
  src_sms: z.boolean().optional(),
  src_outbound: z.boolean().optional(),
  // New: require buyer to describe sources in their own words
  sources_text: z.string().min(1, 'Please describe the sources for this campaign'),
  prohibited_sources: z.string().optional(),
  geo_allowed: z.string().optional(),
  geo_excluded: z.string().optional(),
  daypart: z.string().optional(),
  // Pricing per line
  payout_model: z.enum(['Per Qualified Call','RevShare','Flat Retainer','CPA','Raw Call']),
  price_per_call: z.coerce.number().nonnegative().optional(),
  qual_seconds: z.coerce.number().int().nonnegative().optional(),
  revenue_share_pct: z.coerce.number().min(0).max(100).optional(),
  retainer_amount: z.coerce.number().nonnegative().optional(),
  cpa_amount: z.coerce.number().nonnegative().optional(),
  // Caps
  cap_daily: z.coerce.number().int().nonnegative().optional(),
  cap_concurrency: z.coerce.number().int().nonnegative().optional(),
  // Qualification and returns
  qualified_conditions: z.object({
    no_ivr: z.boolean().default(true).optional(),
    us_only: z.boolean().default(true).optional(),
    no_duplicate_days: z.coerce.number().int().nonnegative().default(30).optional(),
  }).partial().optional(),
  duplicate_window_days: z.coerce.number().int().nonnegative().default(30).optional(),
  return_reasons_allowed: z.array(z.string()).optional(),
  // Consent and compliance (per line)
  consent_required: z.boolean().optional(),
  consent_one_to_one: z.boolean().optional(),
  consent_seller_named: z.array(z.string()).optional(),
  consent_timestamp: z.string().optional(),
  consent_ip: z.string().optional(),
  consent_user_agent: z.string().optional(),
  consent_screenshot_url: z.string().url().optional(),
  recording_disclosure_in_script: z.boolean().optional(),
  dnc_policy_url: z.string().url().optional(),
  dnc_scrub_cadence: z.enum(['realtime','daily','weekly']).optional(),
}).refine((line) => {
  // Enforce pricing fields conditionally
  switch (line.payout_model) {
    case 'Per Qualified Call':
      return line.price_per_call !== undefined && line.qual_seconds !== undefined;
    case 'Raw Call':
      return line.price_per_call !== undefined; // no qual_seconds requirement
    case 'CPA':
      return line.cpa_amount !== undefined;
    case 'RevShare':
      return line.revenue_share_pct !== undefined;
    case 'Flat Retainer':
      return line.retainer_amount !== undefined;
    default:
      return true;
  }
}, { message: 'Pricing fields missing for selected payout_model' });

export const Billing = z.object({
  billing_cycle: z.enum(['Weekly (Net 7)','Biweekly (Net 14)','Monthly (Net 30)']),
  invoice_to: z.string().email().optional(),
  po_number: z.string().optional(),
  payment_method: z.enum(['ACH','Wire','Credit Card']).optional(),
  remit_notes: z.string().optional(),
  invoice_cutoff_day: z.enum(['Mon','Tue','Wed','Thu','Fri']).optional(),
  returns_window_days: z.coerce.number().int().nonnegative().optional(),
});

export const Terms = z.object({
  effective_date: z.string().optional(),
  termination: z.string().optional(),
  custom_terms: z.string().optional(),
});

export const Signatures = z.object({
  sig_buyer_data: z.string().optional(), // dataURL or file name if converted to Blob
  sig_buyer_name: z.string().optional(),
  sig_buyer_date: z.string().optional(),
  sig_buyer_title: z.string().optional(),
  sig_seller_data: z.string().optional(),
  sig_seller_name: z.string().optional(),
  sig_seller_date: z.string().optional(),
  sig_seller_title: z.string().optional(),
  esign_acknowledged: z.boolean().optional(),
  signer_metadata: z.object({
    ts: z.string().optional(),
    ip: z.string().optional(),
    ua: z.string().optional(),
  }).partial().optional(),
});

export const IoSchema = z.object({
  // files are handled by <input type="file" /> via multipart/form-data
  buyer_w9: z.any().optional(),
  attachments: z.any().optional(),
  issuer_role: z.enum(['seller','buyer']).default('seller'),
  // New multi-line campaigns
  campaigns: z.array(CampaignLine).min(1, 'Add at least one campaign line'),
}).merge(Parties).merge(Campaign).merge(Pricing).merge(Compliance).merge(Billing).merge(Terms).merge(Signatures);

export type IoPayload = z.infer<typeof IoSchema>;
