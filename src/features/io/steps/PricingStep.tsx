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
          <label htmlFor="payout_model" className="block text-sm font-medium text-gray-700">Payout Model</label>
          <select
            id="payout_model"
            {...register('payout_model')}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="Per Qualified Call">Per Qualified Call</option>
            <option value="RevShare">RevShare</option>
            <option value="Flat Retainer">Flat Retainer</option>
          </select>
          {errors.payout_model && <p className="mt-1 text-sm text-red-600">{errors.payout_model.message}</p>}
        </div>
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
        <div>
          <label htmlFor="cap_daily" className="block text-sm font-medium text-gray-700">Daily Cap</label>
          <input
            type="number"
            id="cap_daily"
            {...register('cap_daily')}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="cap_concurrency" className="block text-sm font-medium text-gray-700">Concurrency Cap</label>
          <input
            type="number"
            id="cap_concurrency"
            {...register('cap_concurrency')}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="billable_kpis" className="block text-sm font-medium text-gray-700">Billable KPIs</label>
          <input
            type="text"
            id="billable_kpis"
            {...register('billable_kpis')}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="md:col-span-1">
          <label htmlFor="return_policy" className="block text-sm font-medium text-gray-700">Return Policy</label>
          <textarea
            id="return_policy"
            {...register('return_policy')}
            rows={3}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="md:col-span-1">
          <label htmlFor="pricing_notes" className="block text-sm font-medium text-gray-700">Pricing Notes</label>
          <textarea
            id="pricing_notes"
            {...register('pricing_notes')}
            rows={3}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>
    </FormSection>
  );
};

export default PricingStep;
