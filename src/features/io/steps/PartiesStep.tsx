import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { IoPayload } from '../schema';
import FormSection from '../../../components/FormSection';
import { ORG_SELLER_DEFAULTS, hasSellerDefaults } from '../../../lib/org';

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
            <div>
              <label htmlFor="buyer_email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="buyer_email"
                {...register('buyer_email')}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {errors.buyer_email && <p className="mt-1 text-sm text-red-600">{(errors as any).buyer_email?.message}</p>}
            </div>
            <div>
              <label htmlFor="buyer_phone" className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                id="buyer_phone"
                {...register('buyer_phone')}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="buyer_address" className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                id="buyer_address"
                {...register('buyer_address')}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Seller Details (read-only from org defaults) */}
        <div className="md:col-span-1">
          <h3 className="text-lg font-medium mb-2">Seller / Publisher</h3>
           <div className="flex flex-col gap-4">
            <div>
              <label htmlFor="seller_company" className="block text-sm font-medium text-gray-700">Company Name</label>
              <input
                type="text"
                id="seller_company"
                {...register('seller_company')}
                defaultValue={ORG_SELLER_DEFAULTS.seller_company}
                disabled
                className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md sm:text-sm"
              />
              {errors.seller_company && <p className="mt-1 text-sm text-red-600">{errors.seller_company.message}</p>}
            </div>
             <div>
              <label htmlFor="seller_contact" className="block text-sm font-medium text-gray-700">Contact Name</label>
              <input
                type="text"
                id="seller_contact"
                {...register('seller_contact')}
                defaultValue={ORG_SELLER_DEFAULTS.seller_contact}
                disabled
                className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md sm:text-sm"
              />
              {errors.seller_contact && <p className="mt-1 text-sm text-red-600">{errors.seller_contact.message}</p>}
            </div>
            <div>
              <label htmlFor="seller_email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="seller_email"
                {...register('seller_email')}
                defaultValue={ORG_SELLER_DEFAULTS.seller_email}
                disabled
                className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md sm:text-sm"
              />
              {errors.seller_email && <p className="mt-1 text-sm text-red-600">{(errors as any).seller_email?.message}</p>}
            </div>
            <div>
              <label htmlFor="seller_phone" className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                id="seller_phone"
                {...register('seller_phone')}
                defaultValue={ORG_SELLER_DEFAULTS.seller_phone}
                disabled
                className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="seller_address" className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                id="seller_address"
                {...register('seller_address')}
                defaultValue={ORG_SELLER_DEFAULTS.seller_address}
                disabled
                className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md sm:text-sm"
              />
            </div>
          </div>
          {!hasSellerDefaults() && (
            <p className="mt-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded p-2">
              Seller info is not configured. Set it in <code className="font-mono">src/lib/org.ts</code> before sending live IOs.
            </p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <label htmlFor="billing_email" className="block text-sm font-medium text-gray-700">Billing Email</label>
          <input
            type="email"
            id="billing_email"
            {...register('billing_email')}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {(errors as any).billing_email && <p className="mt-1 text-sm text-red-600">{(errors as any).billing_email?.message}</p>}
        </div>
      </div>
    </FormSection>
  );
};

export default PartiesStep;
