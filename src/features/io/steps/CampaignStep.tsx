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
        <div>
          <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            id="start_date"
            {...register('start_date')}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">End Date</label>
          <input
            type="date"
            id="end_date"
            {...register('end_date')}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">Timezone</label>
          <select
            id="timezone"
            {...register('timezone')}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="America/New_York">America/New_York</option>
            <option value="America/Chicago">America/Chicago</option>
            <option value="America/Denver">America/Denver</option>
            <option value="America/Los_Angeles">America/Los_Angeles</option>
          </select>
        </div>
        <div>
          <label htmlFor="dest_numbers" className="block text-sm font-medium text-gray-700">Destination Numbers (comma-separated)</label>
          <input
            type="text"
            id="dest_numbers"
            {...register('dest_numbers')}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="space-y-2">
          <span className="text-sm font-medium text-gray-700">Call Types</span>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" {...register('call_type_inbound')} className="h-4 w-4" /> Inbound
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" {...register('call_type_live')} className="h-4 w-4" /> Live Transfer
          </label>
        </div>
        <div className="space-y-2">
          <span className="text-sm font-medium text-gray-700">Sources</span>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" {...register('src_search')} className="h-4 w-4" /> Search</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" {...register('src_social')} className="h-4 w-4" /> Social</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" {...register('src_display')} className="h-4 w-4" /> Display</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" {...register('src_email')} className="h-4 w-4" /> Email</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" {...register('src_sms')} className="h-4 w-4" /> SMS</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" {...register('src_outbound')} className="h-4 w-4" /> Outbound</label>
        </div>
        <div className="space-y-4">
          <div>
            <label htmlFor="prohibited_sources" className="block text-sm font-medium text-gray-700">Prohibited Sources</label>
            <input id="prohibited_sources" type="text" {...register('prohibited_sources')} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          </div>
          <div>
            <label htmlFor="geo_allowed" className="block text-sm font-medium text-gray-700">Allowed Geo</label>
            <input id="geo_allowed" type="text" {...register('geo_allowed')} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          </div>
          <div>
            <label htmlFor="geo_excluded" className="block text-sm font-medium text-gray-700">Excluded Geo</label>
            <input id="geo_excluded" type="text" {...register('geo_excluded')} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          </div>
          <div>
            <label htmlFor="daypart" className="block text-sm font-medium text-gray-700">Daypart</label>
            <input id="daypart" type="text" {...register('daypart')} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          </div>
        </div>
      </div>
    </FormSection>
  );
};

export default CampaignStep;
