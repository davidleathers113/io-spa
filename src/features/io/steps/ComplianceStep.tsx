import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { IoPayload } from '../schema';
import FormSection from '../../../components/FormSection';

interface StepProps {
  register: UseFormRegister<IoPayload>;
  errors: FieldErrors<IoPayload>;
}

const ComplianceStep: React.FC<StepProps> = ({ register, errors }) => {
  return (
    <FormSection title="Compliance">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3 pt-2">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" id="req_recording" {...register('req_recording')} className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
            Require Recording
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" id="req_tcpa" {...register('req_tcpa')} className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
            TCPA Compliance Required
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" id="req_scrub" {...register('req_scrub')} className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
            DNC/Opt‑Out Scrubbing
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" id="req_script" {...register('req_script')} className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
            Script Review Required
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" id="req_double_verify" {...register('req_double_verify')} className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
            Double Verification
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" id="req_affiliate_disclosure" {...register('req_affiliate_disclosure')} className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
            Affiliate Disclosure
          </label>
        </div>
        <div>
          <label htmlFor="proof_link" className="block text-sm font-medium text-gray-700">Proof Link</label>
          <input
            type="text"
            id="proof_link"
            {...register('proof_link')}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.proof_link && <p className="mt-1 text-sm text-red-600">{errors.proof_link.message}</p>}
          <div className="mt-4">
            <label htmlFor="qa_notes" className="block text-sm font-medium text-gray-700">QA Notes</label>
            <textarea
              id="qa_notes"
              {...register('qa_notes')}
              rows={4}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="compliance_contact" className="block text-sm font-medium text-gray-700">Compliance Contact</label>
            <input
              type="text"
              id="compliance_contact"
              {...register('compliance_contact')}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </div>
    </FormSection>
  );
};

export default ComplianceStep;
