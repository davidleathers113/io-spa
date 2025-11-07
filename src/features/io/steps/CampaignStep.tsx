import type { Control, UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { useFieldArray, Controller, useWatch } from 'react-hook-form';
import type { IoPayload } from '../schema';
import FormSection from '../../../components/FormSection';
import TagInput, { defaultPhoneSanitizer } from '../../../components/TagInput';
/* eslint-disable @typescript-eslint/no-explicit-any */

interface StepProps {
  register: UseFormRegister<IoPayload>;
  errors: FieldErrors<IoPayload>;
  control: Control<IoPayload>;
  setValue: UseFormSetValue<IoPayload>;
  watch: UseFormWatch<IoPayload>;
}

type CampaignCardProps = {
  index: number;
  fieldId: string;
  control: Control<IoPayload>;
  register: UseFormRegister<IoPayload>;
  errors: FieldErrors<IoPayload>;
  onRemove: () => void;
  canRemove: boolean;
  setValue: UseFormSetValue<IoPayload>;
  watch: UseFormWatch<IoPayload>;
};

const CampaignCard: React.FC<CampaignCardProps> = ({ index, fieldId, control, register, errors, onRemove, canRemove, setValue }) => {
  const model = useWatch({ control, name: `campaigns.${index}.payout_model` as const });
  const capDailyVal = useWatch({ control, name: `campaigns.${index}.cap_daily` as const });
  const capConcVal = useWatch({ control, name: `campaigns.${index}.cap_concurrency` as const });
  const isInbound = useWatch({ control, name: `campaigns.${index}.call_type_inbound` as const });
  const isLive = useWatch({ control, name: `campaigns.${index}.call_type_live` as const });
  const callTypeValue = isInbound ? 'inbound' : isLive ? 'live' : '';

  return (
    <div key={fieldId} className="rounded-lg border border-slate-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Campaign {index + 1}</h3>
        {canRemove && (
          <button type="button" className="text-sm text-red-600" onClick={onRemove}>
            Remove
          </button>
        )}
      </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Offer Name</label>
                <input
                  type="text"
                  {...register(`campaigns.${index}.offer_name` as const)}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {(errors as any)?.campaigns?.[index]?.offer_name && <p className="mt-1 text-sm text-red-600">{(errors as any).campaigns[index].offer_name.message}</p>}
              </div>
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700">Call Type</label>
                <Controller
                  control={control}
                  name={`campaigns.${index}.call_type_ui` as any}
                  render={({ field }) => (
                    <div className="mt-1 flex items-center gap-6">
                      <label className="inline-flex items-center gap-2 text-sm">
                        <input
                          type="radio"
                          name={`campaigns-${index}-calltype`}
                          checked={callTypeValue === 'inbound'}
                          onChange={() => {
                            field.onChange('inbound');
                            setValue(`campaigns.${index}.call_type_inbound` as any, true);
                            setValue(`campaigns.${index}.call_type_live` as any, false);
                          }}
                        />
                        Inbound
                      </label>
                      <label className="inline-flex items-center gap-2 text-sm">
                        <input
                          type="radio"
                          name={`campaigns-${index}-calltype`}
                          checked={callTypeValue === 'live'}
                          onChange={() => {
                            field.onChange('live');
                            setValue(`campaigns.${index}.call_type_inbound` as any, false);
                            setValue(`campaigns.${index}.call_type_live` as any, true);
                          }}
                        />
                        Live Transfer
                      </label>
                    </div>
                  )}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Vertical</label>
                <select
                  {...register(`campaigns.${index}.vertical` as const)}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">Select vertical…</option>
                  <option value="Medicare">Medicare</option>
                  <option value="ACA">ACA</option>
                  <option value="Final Expense">Final Expense</option>
                  <option value="Auto Insurance">Auto Insurance</option>
                  <option value="U65 Health Insurance">U65 Health Insurance</option>
                  <option value="Debt Consolidation">Debt Consolidation</option>
                  <option value="SSDI">SSDI</option>
                  <option value="Mass Tort">Mass Tort</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input type="date" {...register(`campaigns.${index}.start_date` as const)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">End Date</label>
                <input type="date" {...register(`campaigns.${index}.end_date` as const)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Timezone</label>
                <select {...register(`campaigns.${index}.timezone` as const)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                  <option value="America/New_York">America/New_York</option>
                  <option value="America/Chicago">America/Chicago</option>
                  <option value="America/Denver">America/Denver</option>
                  <option value="America/Los_Angeles">America/Los_Angeles</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Destination Numbers</label>
                <TagInput
                  control={control}
                  name={`campaigns.${index}.dest_numbers`}
                  placeholder="Type a number, press Enter"
                  helperText="Add one number at a time; press Enter to add. Backspace removes the last tag."
                  sanitize={defaultPhoneSanitizer}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tracking Numbers / DNI</label>
                <TagInput
                  control={control}
                  name={`campaigns.${index}.tracking_numbers`}
                  placeholder="Type a number or range note, press Enter"
                  helperText="Use unique numbers per source. Enter to add."
                  sanitize={defaultPhoneSanitizer}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Sources (required)</label>
                <textarea
                  rows={3}
                  placeholder="Describe traffic sources (e.g., Google Search, Facebook Lead Ads, Email newsletters, etc.)"
                  {...register(`campaigns.${index}.sources_text` as const)}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {(errors as any)?.campaigns?.[index]?.sources_text && (
                  <p className="mt-1 text-sm text-red-600">{(errors as any).campaigns[index].sources_text.message}</p>
                )}
              </div>
              <div className="space-y-4">
                {/* Prohibited Sources removed by request */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Allowed Geo</label>
                  <TagInput
                    control={control}
                    name={`campaigns.${index}.geo_allowed`}
                    placeholder="Add state/region codes, press Enter"
                    helperText="Ex: CA, TX, FL"
                  />
                </div>
                {/* Daypart removed by request */}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Payout Model</label>
                <select {...register(`campaigns.${index}.payout_model` as const)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm">
                  <option value="Per Qualified Call">Per Qualified Call</option>
                  <option value="Raw Call">Raw Call</option>
                  <option value="CPA">CPA</option>
                  <option value="RevShare">RevShare</option>
                  <option value="Flat Retainer">Flat Retainer</option>
                </select>
              </div>
              {/* Pricing fields are conditionally relevant; show/hide for clarity */}
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700">Price Per Call</label>
                <input type="number" step="0.01" {...register(`campaigns.${index}.price_per_call` as const)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm" />
              </div>
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700">Buffer (seconds)</label>
                <input type="number" {...register(`campaigns.${index}.qual_seconds` as const)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm" />
              </div>
              {model === 'CPA' && (
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700">CPA Amount</label>
                  <input type="number" step="0.01" {...register(`campaigns.${index}.cpa_amount` as const)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm" />
                </div>
              )}
              {model === 'RevShare' && (
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700">RevShare %</label>
                  <input type="number" step="0.01" {...register(`campaigns.${index}.revenue_share_pct` as const)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm" />
                </div>
              )}
              {model === 'Flat Retainer' && (
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700">Retainer Amount</label>
                  <input type="number" step="0.01" {...register(`campaigns.${index}.retainer_amount` as const)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm" />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700">Daily Cap: <span className="font-semibold">{capDailyVal ?? 0}</span></label>
                <input type="range" min={0} max={500} step={1} {...register(`campaigns.${index}.cap_daily` as const)} className="mt-2 w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Concurrency Cap: <span className="font-semibold">{capConcVal ?? 0}</span></label>
                <input type="range" min={0} max={50} step={1} {...register(`campaigns.${index}.cap_concurrency` as const)} className="mt-2 w-full" />
              </div>
            </div>
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700">Notes</label>
              <textarea rows={3} {...register(`campaigns.${index}.line_notes` as const)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm" />
            </div>
          </div>
  );
};

const CampaignStep: React.FC<StepProps> = ({ register, errors, control, setValue, watch }) => {
  const { fields, append, remove } = useFieldArray({ control, name: 'campaigns' });

  return (
    <FormSection title="Campaigns">
      <div className="space-y-8">
        {fields.map((field, index) => (
          <CampaignCard
            key={field.id}
            index={index}
            fieldId={field.id}
            control={control}
            register={register}
            errors={errors}
            onRemove={() => remove(index)}
            canRemove={fields.length > 1}
            setValue={setValue}
            watch={watch}
          />
        ))}
        <div>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() =>
              append({
                offer_name: '',
                vertical: '',
                start_date: '',
                payout_model: 'Per Qualified Call',
              } as any)
            }
          >
            Add Campaign
          </button>
        </div>
      </div>
    </FormSection>
  );
};

export default CampaignStep;
