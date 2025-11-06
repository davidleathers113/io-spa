import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { IoPayload } from '../schema';
import FormSection from '../../../components/FormSection';

interface StepProps {
  register: UseFormRegister<IoPayload>;
  errors: FieldErrors<IoPayload>;
}

const PartiesStep: React.FC<StepProps> = ({ register, errors }) => {

  return (
    <FormSection title="Parties">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Buyer Details */}
        <div className="md:col-span-1">
          <h3 className="text-lg font-medium mb-2">Buyer / Advertiser</h3>
          <div className="flex flex-col gap-4">
            <div>
              <label htmlFor="buyer_company" className="block text-sm font-medium text-gray-700">Company Name</label>
              <input 
                type="text" 
                id="buyer_company" 
                {...register('buyer_company')} 
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {errors.buyer_company && <p className="mt-1 text-sm text-red-600">{errors.buyer_company.message}</p>}
            </div>
             <div>
              <label htmlFor="buyer_contact" className="block text-sm font-medium text-gray-700">Contact Name</label>
              <input 
                type="text" 
                id="buyer_contact" 
                {...register('buyer_contact')} 
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {errors.buyer_contact && <p className="mt-1 text-sm text-red-600">{errors.buyer_contact.message}</p>}
            </div>
          </div>
        </div>

        {/* Seller Details */}
        <div className="md:col-span-1">
          <h3 className="text-lg font-medium mb-2">Seller / Publisher</h3>
           <div className="flex flex-col gap-4">
            <div>
              <label htmlFor="seller_company" className="block text-sm font-medium text-gray-700">Company Name</label>
              <input 
                type="text" 
                id="seller_company" 
                {...register('seller_company')} 
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {errors.seller_company && <p className="mt-1 text-sm text-red-600">{errors.seller_company.message}</p>}
            </div>
             <div>
              <label htmlFor="seller_contact" className="block text-sm font-medium text-gray-700">Contact Name</label>
              <input 
                type="text" 
                id="seller_contact" 
                {...register('seller_contact')} 
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {errors.seller_contact && <p className="mt-1 text-sm text-red-600">{errors.seller_contact.message}</p>}
            </div>
          </div>
        </div>
      </div>
    </FormSection>
  );
};

export default PartiesStep;
