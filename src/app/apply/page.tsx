'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ApplicationFormData } from '@/types/application';
import ProgressBar from '@/components/ProgressBar';
import FormStep from '@/components/FormStep';
import BasicInfoStep from '@/components/steps/BasicInfoStep';
import CVUploadStep from '@/components/steps/CVUploadStep';
import MotivationStep from '@/components/steps/MotivationStep';
import InsightStep from '@/components/steps/InsightStep';
import TechnologiesStep from '@/components/steps/TechnologiesStep';
import LinksStep from '@/components/steps/LinksStep';

export default function ApplicationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger
  } = useForm<ApplicationFormData>({
    defaultValues: {
      technologies: []
    }
  });

  const totalSteps = 6;

  const nextStep = async () => {
    let fieldsToValidate: (keyof ApplicationFormData)[] = [];
    
    switch (currentStep) {
      case 1:
        fieldsToValidate = ['name', 'email', 'phone', 'country', 'heardAboutUs'];
        if (watch('heardAboutUs') === 'other') {
          fieldsToValidate.push('heardAboutUsOther');
        }
        break;
      case 2:
        // CV upload is optional, no validation needed
        break;
      case 3:
        fieldsToValidate = ['motivation'];
        break;
      case 4:
        fieldsToValidate = ['proudProject', 'dreamProject'];
        break;
      case 5:
        // Technologies are optional, no validation needed
        break;
      case 6:
        // Links are optional, no validation needed
        break;
    }

    if (fieldsToValidate.length > 0) {
      const isValid = await trigger(fieldsToValidate as (keyof ApplicationFormData)[]);
      if (!isValid) return;
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: ApplicationFormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push('/success');
      } else {
        throw new Error('Failed to submit application');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <BasicInfoStep register={register} errors={errors} watch={watch} />;
      case 2:
        return <CVUploadStep setValue={setValue} watch={watch} />;
      case 3:
        return <MotivationStep register={register} errors={errors} />;
      case 4:
        return <InsightStep register={register} errors={errors} />;
      case 5:
        return <TechnologiesStep setValue={setValue} watch={watch} />;
      case 6:
        return <LinksStep register={register} errors={errors} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <AnimatePresence mode="wait">
            <FormStep key={currentStep}>
              {renderStep()}
            </FormStep>
          </AnimatePresence>

          <div className="flex justify-between items-center mt-12 max-w-2xl mx-auto px-6">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                currentStep === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              ← Back
            </button>

            {currentStep === totalSteps ? (
              <motion.button
                type="button"
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </motion.button>
            ) : (
              <motion.button
                type="button"
                onClick={nextStep}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Next →
              </motion.button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
