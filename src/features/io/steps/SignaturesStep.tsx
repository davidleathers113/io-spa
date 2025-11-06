import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { IoPayload } from '../schema';
import FormSection from '../../../components/FormSection';
import SignaturePad from '../../../components/SignaturePad';

interface StepProps {
  register: UseFormRegister<IoPayload>;
  errors: FieldErrors<IoPayload>;
}

const SignaturesStep: React.FC<StepProps> = ({ register, errors }) => {
  return (
    <FormSection title="Signatures">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Buyer signature */}
        <div className="space-y-4">
          <SignaturePad name="sig_buyer_data" label="Buyer Signature" register={register} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <label htmlFor="sig_buyer_title" className="block text-sm font-medium text-gray-700">Buyer Title</label>
              <input
                type="text"
                id="sig_buyer_title"
                {...register('sig_buyer_title')}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
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
        </div>
        {/* Seller signature */}
        <div className="space-y-4">
          <SignaturePad name="sig_seller_data" label="Seller Signature" register={register} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="sig_seller_name" className="block text-sm font-medium text-gray-700">Seller Name</label>
              <input
                type="text"
                id="sig_seller_name"
                {...register('sig_seller_name')}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {errors.sig_seller_name && <p className="mt-1 text-sm text-red-600">{errors.sig_seller_name.message}</p>}
            </div>
            <div>
              <label htmlFor="sig_seller_title" className="block text-sm font-medium text-gray-700">Seller Title</label>
              <input
                type="text"
                id="sig_seller_title"
                {...register('sig_seller_title')}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="sig_seller_date" className="block text-sm font-medium text-gray-700">Seller Date</label>
              <input
                type="date"
                id="sig_seller_date"
                {...register('sig_seller_date')}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {errors.sig_seller_date && <p className="mt-1 text-sm text-red-600">{errors.sig_seller_date.message}</p>}
            </div>
          </div>
        </div>
      </div>
    </FormSection>
  );
};

export default SignaturesStep;
