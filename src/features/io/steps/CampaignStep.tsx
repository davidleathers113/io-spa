import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { IoPayload } from '../schema';
import FormSection from '../../../components/FormSection';

interface StepProps {
  register: UseFormRegister<IoPayload>;
  errors: FieldErrors<IoPayload>;
}

const CampaignStep: React.FC<StepProps> = ({ register, errors }) => {
  return (
    <FormSection title="Campaign">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="offer_name" className="block text-sm font-medium text-gray-700">Offer Name</label>
          <input
            type="text"
            id="offer_name"
            {...register('offer_name')}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.offer_name && <p className="mt-1 text-sm text-red-600">{errors.offer_name.message}</p>}
        </div>
        <div>
          <label htmlFor="vertical" className="block text-sm font-medium text-gray-700">Vertical</label>
          <input
            type="text"
            id="vertical"
            {...register('vertical')}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.vertical && <p className="mt-1 text-sm text-red-600">{errors.vertical.message}</p>}
        </div>
      </div>
    </FormSection>
  );
};

export default CampaignStep;
