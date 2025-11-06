import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IoSchema, type IoPayload } from './schema';
import useAutosave from '../../hooks/useAutosave';
import { postToNetlify } from '../../lib/netlify';
import JsonExportButton from '../../components/JsonExportButton';
import PrintButton from '../../components/PrintButton';
import { ORG_SELLER_DEFAULTS, mergeSellerDefaults } from '../../lib/org';

import Stepper from '../../components/Stepper';
import PartiesStep from './steps/PartiesStep';
import CampaignStep from './steps/CampaignStep';
import PricingStep from './steps/PricingStep';
import ComplianceStep from './steps/ComplianceStep';
import BillingStep from './steps/BillingStep';
import TermsStep from './steps/TermsStep';
import SignaturesStep from './steps/SignaturesStep';

const steps = [
  'Parties',
  'Campaign',
  'Pricing',
  'Compliance',
  'Billing',
  'Terms',
  'Signatures',
  'Review & Submit',
];

const IoForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    getValues,
    trigger,
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
    ['offer_name','vertical','start_date'],
    // Pricing
    ['payout_model','price_per_call','qual_seconds'],
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
    const props = { register, errors };
    switch (currentStep) {
      case 0: return <PartiesStep {...props} />;
      case 1: return <CampaignStep {...props} />;
      case 2: return <PricingStep {...props} />;
      case 3: return <ComplianceStep {...props} />;
      case 4: return <BillingStep {...props} />;
      case 5: return <TermsStep {...props} />;
      case 6: return <SignaturesStep {...props} />;
      case 7: {
        const data = getValues();
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Review</h2>
            <p className="text-sm text-gray-600">
              Please review your details below. You can use the Previous button to make changes.
            </p>
            <div className="rounded-md border p-4 bg-gray-50 overflow-x-auto">
              <pre className="text-xs leading-relaxed">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
            <div className="flex gap-3">
              <JsonExportButton
                data={data}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              />
              <PrintButton className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300" />
            </div>
          </div>
        );
      }
      default: return <PartiesStep {...props} />;
    }
  };

  const handleNext = async () => {
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
      <Stepper steps={steps} currentStep={currentStep} />
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
        <div className="flex justify-between mt-8 border-t pt-6">
          {
            currentStep > 0 &&
            <button type="button" onClick={handlePrev} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
              Previous
            </button>
          }
          {
            currentStep < steps.length - 1 ? (
              <button type="button" onClick={handleNext} className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ml-auto">
                Next
              </button>
            ) : (
              <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 ml-auto">
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