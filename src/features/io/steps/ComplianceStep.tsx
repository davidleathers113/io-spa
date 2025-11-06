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
        <div className="flex items-center gap-2 mt-6">
          <input
            type="checkbox"
            id="req_recording"
            {...register('req_recording')}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <label htmlFor="req_recording" className="text-sm font-medium text-gray-700">Require Recording</label>
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
        </div>
      </div>
    </FormSection>
  );
};

export default ComplianceStep;
