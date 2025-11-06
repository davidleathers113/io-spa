import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { IoPayload } from '../schema';
import FormSection from '../../../components/FormSection';

interface StepProps {
  register: UseFormRegister<IoPayload>;
  errors: FieldErrors<IoPayload>;
}

const PricingStep: React.FC<StepProps> = ({ register, errors }) => {
  return (
    <FormSection title="Pricing">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="price_per_call" className="block text-sm font-medium text-gray-700">Price Per Call</label>
          <input
            type="number"
            id="price_per_call"
            {...register('price_per_call')}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.price_per_call && <p className="mt-1 text-sm text-red-600">{errors.price_per_call.message}</p>}
        </div>
        <div>
          <label htmlFor="qual_seconds" className="block text-sm font-medium text-gray-700">Qualified Seconds</label>
          <input
            type="number"
            id="qual_seconds"
            {...register('qual_seconds')}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.qual_seconds && <p className="mt-1 text-sm text-red-600">{errors.qual_seconds.message}</p>}
        </div>
      </div>
    </FormSection>
  );
};

export default PricingStep;
