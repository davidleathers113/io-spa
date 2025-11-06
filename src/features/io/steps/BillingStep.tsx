import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import type { IoPayload } from '../schema';
import FormSection from '../../../components/FormSection';

interface StepProps {
  register: UseFormRegister<IoPayload>;
  errors: FieldErrors<IoPayload>;
}

const BillingStep: React.FC<StepProps> = ({ register, errors }) => {
  return (
    <FormSection title="Billing">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="billing_cycle" className="block text-sm font-medium text-gray-700">Billing Cycle</label>
          <select
            id="billing_cycle"
            {...register('billing_cycle')}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="Weekly (Net 7)">Weekly (Net 7)</option>
            <option value="Biweekly (Net 14)">Biweekly (Net 14)</option>
            <option value="Monthly (Net 30)">Monthly (Net 30)</option>
          </select>
          {errors.billing_cycle && <p className="mt-1 text-sm text-red-600">{errors.billing_cycle.message}</p>}
        </div>
        <div>
          <label htmlFor="invoice_to" className="block text-sm font-medium text-gray-700">Invoice To (Email)</label>
          <input
            type="email"
            id="invoice_to"
            {...register('invoice_to')}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.invoice_to && <p className="mt-1 text-sm text-red-600">{errors.invoice_to.message}</p>}
        </div>
      </div>
    </FormSection>
  );
};

export default BillingStep;
