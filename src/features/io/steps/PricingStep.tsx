import FormSection from '../../../components/FormSection';

const PricingStep: React.FC = () => {
  return (
    <FormSection title="Pricing">
      <div className="rounded-md border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
        Pricing is configured per campaign line in the previous step. Use that step to add CPA, Raw Call, Per Qualified Call, RevShare, or Retainer lines, with caps and notes per line.
      </div>
    </FormSection>
  );
};

export default PricingStep;
