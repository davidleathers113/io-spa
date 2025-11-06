import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IoSchema, type IoPayload } from './schema';

import Stepper from '../../components/Stepper';
import PartiesStep from './steps/PartiesStep';
import CampaignStep from './steps/CampaignStep';
import PricingStep from './steps/PricingStep';
import ComplianceStep from './steps/ComplianceStep';
import BillingStep from './steps/BillingStep';
import TermsStep from './steps/TermsStep';
import SignaturesStep from './steps/SignaturesStep';

const steps = [
  'Parties',
  'Campaign',
  'Pricing',
  'Compliance',
  'Billing',
  'Terms',
  'Signatures',
  'Review & Submit',
];

const IoForm = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const { register, handleSubmit, formState: { errors } } = useForm<IoPayload>({
    // Manually asserted to sidestep resolver/RHF typing friction on defaulted fields
    resolver: zodResolver(IoSchema) as any,
    mode: 'all', // Validate on blur and change
  });

  const renderStep = () => {
    const props = { register, errors };
    switch (currentStep) {
      case 0: return <PartiesStep {...props} />;
      case 1: return <CampaignStep {...props} />;
      case 2: return <PricingStep {...props} />;
      case 3: return <ComplianceStep {...props} />;
      case 4: return <BillingStep {...props} />;
      case 5: return <TermsStep {...props} />;
      case 6: return <SignaturesStep {...props} />;
      // case 7 will be the review step
      default: return <PartiesStep {...props} />;
    }
  };

  const handleNext = () => {
    // Here we would trigger validation for the current step
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const onSubmit: SubmitHandler<IoPayload> = (data) => {
    console.log('Form Submitted', data);
    // Here we will handle the Netlify form submission
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl max-w-4xl mx-auto">
      <Stepper steps={steps} currentStep={currentStep} />
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
        {renderStep()}
        <div className="flex justify-between mt-8 border-t pt-6">
          {
            currentStep > 0 &&
            <button type="button" onClick={handlePrev} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
              Previous
            </button>
          }
          {
            currentStep < steps.length - 1 ? (
              <button type="button" onClick={handleNext} className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ml-auto">
                Next
              </button>
            ) : (
              <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 ml-auto">
                Submit Insertion Order
              </button>
            )
          }
        </div>
      </form>
    </div>
  );
};

export default IoForm;