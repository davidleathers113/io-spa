import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IoSchema, type IoPayload } from './schema';
import useAutosave from '../../hooks/useAutosave';
import { postToNetlify } from '../../lib/netlify';
import PrintButton from '../../components/PrintButton';
import { ORG_SELLER_DEFAULTS, mergeSellerDefaults } from '../../lib/org';

import Stepper from '../../components/Stepper';
import PartiesStep from './steps/PartiesStep';
import CampaignStep from './steps/CampaignStep';
import ComplianceStep from './steps/ComplianceStep';
import BillingStep from './steps/BillingStep';
import TermsStep from './steps/TermsStep';
import SignaturesStep from './steps/SignaturesStep';

const steps = [
  'Parties',
  'Campaign',
  'Compliance',
  'Billing',
  'Terms',
  'Signatures',
  'Review & Submit',
];

const IoForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [testMode, setTestMode] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    getValues,
    trigger,
    control,
    setValue,
  } = useForm<IoPayload>({
    // Manually asserted to sidestep resolver/RHF typing friction on defaulted fields
    resolver: zodResolver(IoSchema) as any,
    mode: 'all', // Validate on blur and change
    defaultValues: {
      issuer_role: 'seller',
      // Prefill seller from org defaults; kept editable off in UI
      ...ORG_SELLER_DEFAULTS,
    } as any,
  });

  // Hydrate and persist form state locally
  useAutosave({ watch, reset });

  // Minimal per-step field gating for Next navigation
  const stepFieldNames: string[][] = [
    // Parties (buyer only; seller is prefilled from org)
    ['buyer_company','buyer_contact','buyer_email'],
    // Campaign
    ['campaigns.0.offer_name','campaigns.0.payout_model'],
    // Compliance
    [],
    // Billing
    ['billing_cycle'],
    // Terms
    [],
    // Signatures
    [],
    // Review (no gating here)
    [],
  ];

  const renderStep = () => {
    const props = { register, errors, control, setValue, watch };
    switch (currentStep) {
      case 0: return <PartiesStep {...props} />;
      case 1: return <CampaignStep {...props} />;
      case 2: return <ComplianceStep {...props} />;
      case 3: return <BillingStep {...props} />;
      case 4: return <TermsStep {...props} />;
      case 5: return <SignaturesStep {...props} />;
      case 6: {
        const data = getValues();
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Review</h2>
            <p className="text-sm text-gray-600">Print or save as PDF for your records.</p>
            <div className="rounded-md border p-4 bg-white">
              {/* Parties */}
              <h3 className="text-base font-semibold mb-2">Parties</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <div><span className="font-medium">Buyer Company:</span> {data.buyer_company}</div>
                  <div><span className="font-medium">Buyer Contact:</span> {data.buyer_contact}</div>
                  <div><span className="font-medium">Buyer Email:</span> {data.buyer_email}</div>
                </div>
                <div>
                  <div><span className="font-medium">Seller Company:</span> {data.seller_company}</div>
                  <div><span className="font-medium">Seller Contact:</span> {data.seller_contact}</div>
                  <div><span className="font-medium">Seller Email:</span> {data.seller_email}</div>
                </div>
              </div>
              {/* Campaigns */}
              <h3 className="text-base font-semibold mt-6 mb-2">Campaigns</h3>
              <div className="space-y-4">
                {Array.isArray((data as any).campaigns) && (data as any).campaigns.map((c: any, i: number) => {
                  const callType = c.call_type_inbound ? 'Inbound' : c.call_type_live ? 'Live Transfer' : '—';
                  return (
                    <div key={i} className="border rounded p-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="font-medium">Campaign {i+1}: {c.offer_name || '—'}</div>
                        <div className="text-slate-600">{c.vertical || '—'}</div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2 text-sm">
                        <div><span className="font-medium">Call Type:</span> {callType}</div>
                        <div><span className="font-medium">Dates:</span> {c.start_date || '—'}{c.end_date ? ` → ${c.end_date}` : ''}</div>
                        <div><span className="font-medium">Timezone:</span> {c.timezone || '—'}</div>
                        <div className="md:col-span-3"><span className="font-medium">Dest Numbers:</span> {(c.dest_numbers||'').split(',').filter(Boolean).join(', ') || '—'}</div>
                        <div className="md:col-span-3"><span className="font-medium">Sources:</span> {c.sources_text || '—'}</div>
                        <div><span className="font-medium">Payout:</span> {c.payout_model || '—'}</div>
                        {c.price_per_call !== undefined && <div><span className="font-medium">Price/Call:</span> {c.price_per_call}</div>}
                        {c.qual_seconds !== undefined && <div><span className="font-medium">Buffer (s):</span> {c.qual_seconds}</div>}
                        {c.cpa_amount !== undefined && <div><span className="font-medium">CPA:</span> {c.cpa_amount}</div>}
                        {c.revenue_share_pct !== undefined && <div><span className="font-medium">RevShare %:</span> {c.revenue_share_pct}</div>}
                        {c.retainer_amount !== undefined && <div><span className="font-medium">Retainer:</span> {c.retainer_amount}</div>}
                        <div><span className="font-medium">Daily Cap:</span> {c.cap_daily ?? 0}</div>
                        <div><span className="font-medium">Concurrency:</span> {c.cap_concurrency ?? 0}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* Billing */}
              <h3 className="text-base font-semibold mt-6 mb-2">Billing</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div><span className="font-medium">Cycle:</span> {data.billing_cycle || '—'}</div>
                <div><span className="font-medium">Invoice To:</span> {data.invoice_to || '—'}</div>
                <div><span className="font-medium">PO#:</span> {data.po_number || '—'}</div>
              </div>
              {/* Terms */}
              <h3 className="text-base font-semibold mt-6 mb-2">Terms</h3>
              <div className="text-sm"><span className="font-medium">Effective Date:</span> {data.effective_date || '—'}</div>
              {data.custom_terms && (
                <div className="mt-2 text-sm"><span className="font-medium">Custom Terms:</span> {data.custom_terms}</div>
              )}
            </div>
            <div className="flex gap-3">
              <PrintButton className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300" />
            </div>
          </div>
        );
      }
      default: return <PartiesStep {...props} />;
    }
  };

  const handleNext = async () => {
    if (testMode) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
      return;
    }
    // Manually gate by step-specific fields to improve UX.
    const fields = stepFieldNames[currentStep] ?? [];
    if (fields.length === 0) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
      return;
    }
    const valid = await trigger(fields as any, { shouldFocus: true });
    if (valid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const onSubmit: SubmitHandler<IoPayload> = async (data) => {
    // Decide multipart if files present (buyer_w9 or attachments)
    const maybeW9 = (data as any)['buyer_w9'];
    const maybeAttachments = (data as any)['attachments'];
    const hasFiles =
      (typeof File !== 'undefined' && maybeW9 instanceof File) ||
      (typeof FileList !== 'undefined' && maybeW9 instanceof FileList && maybeW9.length > 0) ||
      (typeof FileList !== 'undefined' && maybeAttachments instanceof FileList && maybeAttachments.length > 0);

    // Split out file-like fields when urlencoded
    // Ensure seller defaults present on payload
    const payload: Record<string, unknown> = mergeSellerDefaults({ ...data });
    if (!hasFiles) {
      if (typeof File !== 'undefined' && payload['buyer_w9'] instanceof File) delete payload['buyer_w9'];
      if (typeof FileList !== 'undefined' && payload['buyer_w9'] instanceof FileList) delete payload['buyer_w9'];
      if (typeof FileList !== 'undefined' && payload['attachments'] instanceof FileList) delete payload['attachments'];
    }

    try {
      const res = await postToNetlify(payload, {
        multipart: hasFiles,
        // Manually leaving recaptchaToken undefined; wire if enabled.
        formName: 'io-form',
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        // Surface a basic error; production could show a toast or error summary.
        alert('Submission failed. Please try again.');
      }
    } catch (e) {
      alert('Submission error. Please try again.');
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl max-w-4xl mx-auto">
      <div className="flex items-start justify-between">
        <Stepper steps={steps} currentStep={currentStep} />
        <label className="ml-4 inline-flex items-center gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            checked={testMode}
            onChange={(e) => setTestMode(e.target.checked)}
            className="h-4 w-4"
            aria-label="Enable test mode to skip step validation"
          />
          Test mode (skip validation)
        </label>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8" data-netlify="true" data-netlify-honeypot="bot-field" name="io-form">
        {/* Error summary region for a11y */}
        <div role="status" aria-live="polite" className="sr-only">
          {Object.keys(errors).length > 0 ? 'There are validation errors on this step' : ''}
        </div>
        {/* Hidden inputs to mirror Netlify form config */}
        <input type="hidden" name="form-name" value="io-form" />
        <p className="hidden">
          <label>
            Don’t fill this out if you’re human: <input name="bot-field" />
          </label>
        </p>
        {submitted ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold mb-2">Thank you!</h2>
            <p className="text-gray-600">Your insertion order has been submitted.</p>
          </div>
        ) : (
          <>
        {renderStep()}
        <div className="flex justify-between mt-8 border-t pt-6" style={{ borderColor: 'var(--brand-border)' }}>
          {
            currentStep > 0 &&
            <button type="button" onClick={handlePrev} className="btn btn-secondary">
              Previous
            </button>
          }
          {
            currentStep < steps.length - 1 ? (
              <button type="button" onClick={handleNext} className="btn btn-primary ml-auto">
                Next
              </button>
            ) : (
              <button type="submit" className="btn btn-primary ml-auto">
                Submit Insertion Order
              </button>
            )
          }
        </div>
          </>
        )}
      </form>
    </div>
  );
};

export default IoForm;