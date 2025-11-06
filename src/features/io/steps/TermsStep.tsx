import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { IoPayload } from '../schema';
import FormSection from '../../../components/FormSection';

interface StepProps {
  register: UseFormRegister<IoPayload>;
  errors: FieldErrors<IoPayload>;
}

const TermsStep: React.FC<StepProps> = ({ register, errors }) => {
  return (
    <FormSection title="Terms">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="effective_date" className="block text-sm font-medium text-gray-700">Effective Date</label>
          <input
            type="date"
            id="effective_date"
            {...register('effective_date')}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.effective_date && <p className="mt-1 text-sm text-red-600">{errors.effective_date.message}</p>}
        </div>
        <div>
          <label htmlFor="termination" className="block text-sm font-medium text-gray-700">Termination</label>
          <input
            type="text"
            id="termination"
            {...register('termination')}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="e.g., Either party may terminate with 7 days written notice."
          />
        </div>
        <div>
          <label htmlFor="custom_terms" className="block text-sm font-medium text-gray-700">Custom Terms</label>
          <textarea
            id="custom_terms"
            {...register('custom_terms')}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            rows={4}
          />
          {errors.custom_terms && <p className="mt-1 text-sm text-red-600">{errors.custom_terms.message}</p>}
        </div>
      </div>
    </FormSection>
  );
};

export default TermsStep;
