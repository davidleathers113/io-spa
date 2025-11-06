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
});

export const Pricing = z.object({
  payout_model: z.enum(['Per Qualified Call','RevShare','Flat Retainer']),
  price_per_call: z.coerce.number().nonnegative(),
  qual_seconds: z.coerce.number().int().nonnegative(),
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

export const Billing = z.object({
  billing_cycle: z.enum(['Weekly (Net 7)','Biweekly (Net 14)','Monthly (Net 30)']),
  invoice_to: z.string().email().optional(),
  po_number: z.string().optional(),
  payment_method: z.enum(['ACH','Wire','Credit Card']).optional(),
  remit_notes: z.string().optional(),
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
});

export const IoSchema = z.object({
  // files are handled by <input type="file" /> via multipart/form-data
  buyer_w9: z.any().optional(),
  attachments: z.any().optional(),
  issuer_role: z.enum(['seller','buyer']).default('seller'),
}).merge(Parties).merge(Campaign).merge(Pricing).merge(Compliance).merge(Billing).merge(Terms).merge(Signatures);

export type IoPayload = z.infer<typeof IoSchema>;
