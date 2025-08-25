'use client';

import { motion } from 'framer-motion';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { ApplicationFormData } from '@/types/application';

interface InsightStepProps {
  register: UseFormRegister<ApplicationFormData>;
  errors: FieldErrors<ApplicationFormData>;
}

export default function InsightStep({ register, errors }: InsightStepProps) {
  const questions = [
    {
      field: 'proudProject' as keyof ApplicationFormData,
      title: "What's a project you're proud of?",
      hint: "Big or small, it counts if it mattered to you.",
      placeholder: "Describe a project that you're particularly proud of and why it was meaningful to you..."
    },
    {
      field: 'dreamProject' as keyof ApplicationFormData,
      title: "If you had no limits, what would you build?",
      hint: "Ambition is welcome here.",
      placeholder: "Dream big! What would you create if you had unlimited resources and time..."
    }
  ];

  return (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-thin text-gray-900 mb-6 leading-tight">
          Tell us about your work
        </h2>
        <p className="text-lg text-gray-600 font-light">
          Share your experiences and aspirations
        </p>
      </motion.div>

      <div className="space-y-12">
        {questions.map((question, index) => (
          <motion.div
            key={question.field}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="space-y-4"
          >
            <div>
              <h3 className="text-2xl font-light text-gray-900 mb-2">
                {question.title}
              </h3>
              <p className="text-gray-600 italic mb-4">
                {question.hint}
              </p>
            </div>
            
            <textarea
              {...register(question.field, { 
                required: 'Please provide an answer',
                minLength: {
                  value: 30,
                  message: 'Please provide a more detailed response (at least 30 characters)'
                }
              })}
              placeholder={question.placeholder}
              className="w-full h-40 p-6 border-2 border-gray-200 focus:border-gray-900 outline-none transition-colors duration-300 text-lg bg-transparent rounded-xl resize-none placeholder-gray-400 text-gray-900"
            />
            {errors[question.field] && (
              <p className="text-red-500 text-sm mt-2">
                {errors[question.field]?.message}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
