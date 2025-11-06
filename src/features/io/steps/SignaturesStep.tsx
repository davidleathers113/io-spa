import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { IoPayload } from '../schema';
import FormSection from '../../../components/FormSection';

interface StepProps {
  register: UseFormRegister<IoPayload>;
  errors: FieldErrors<IoPayload>;
}

const SignaturesStep: React.FC<StepProps> = ({ register, errors }) => {
  return (
    <FormSection title="Signatures">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="sig_buyer_name" className="block text-sm font-medium text-gray-700">Buyer Name</label>
          <input
            type="text"
            id="sig_buyer_name"
            {...register('sig_buyer_name')}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.sig_buyer_name && <p className="mt-1 text-sm text-red-600">{errors.sig_buyer_name.message}</p>}
        </div>
        <div>
          <label htmlFor="sig_buyer_date" className="block text-sm font-medium text-gray-700">Buyer Date</label>
          <input
            type="date"
            id="sig_buyer_date"
            {...register('sig_buyer_date')}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.sig_buyer_date && <p className="mt-1 text-sm text-red-600">{errors.sig_buyer_date.message}</p>}
        </div>
      </div>
    </FormSection>
  );
};

export default SignaturesStep;
