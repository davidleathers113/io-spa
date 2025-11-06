# Insertion Order (IO) App

A modern, single‑initiator insertion order (IO) web app for capturing buyer details, campaign setup, pricing, compliance, billing, terms, and e‑signatures. Built for fast data entry, guard‑railed validation, and clean Netlify Form submissions.

### What you can do
- Complete an IO in guided steps with inline validation
- Upload a Buyer W‑9 and supporting attachments
- Capture buyer and seller signatures on canvas
- Review everything before sending, export JSON, and print a clean copy
- Submit securely to Netlify Forms (no backend required)

### How it works
- The Seller/Publisher fields are prefilled from your organization profile and locked. Only Buyer inputs are collected.
- Autosave keeps your progress locally; you can close and return later.
- File uploads and signatures are sent using `multipart/form-data` automatically; otherwise submissions use URL‑encoded payloads.

### Using the app
1. Parties: enter Buyer details (company, contact, email, etc.).
2. Campaign: dates, timezone, call types, sources, and targeting.
3. Pricing: payout model, rates, caps, KPIs, and notes.
4. Compliance: toggles (TCPA, recording, scrubbing), proof link, notes.
5. Billing: cycle, invoice email, PO number, payment method, remittance notes. Upload W‑9 and any attachments.
6. Terms: effective date, termination, custom terms.
7. Signatures: sign on canvas for both buyer and seller (or print to sign).
8. Review & Submit: download a JSON copy, print, then submit.

### Export & print
- Use “Export as JSON” to download the current IO payload.
- Use “Print” for a print‑optimized layout; controls are hidden in print.

### Privacy
- Autosave data is stored in your browser’s `localStorage` only.
- Submissions are sent to Netlify Forms; configure the site to receive entries.

### Developer docs
For local development, configuration (Seller org profile), Netlify setup, and detailed architecture, see the developer guide:

- `./DEVELOPER.md`

### License
Internal use. Update this section if publishing externally.
