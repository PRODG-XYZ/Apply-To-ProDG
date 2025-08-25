'use client';

import { motion } from 'framer-motion';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { ApplicationFormData } from '@/types/application';

interface MotivationStepProps {
  register: UseFormRegister<ApplicationFormData>;
  errors: FieldErrors<ApplicationFormData>;
}

export default function MotivationStep({ register, errors }: MotivationStepProps) {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-thin text-gray-900 mb-6 leading-tight">
          What excites you most about building in{' '}
          <span className="text-gray-700">tech and startups?</span>
        </h2>
        <p className="text-lg text-gray-600 font-light italic">
          This is your chance to be cooler than you think you are.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <textarea
          {...register('motivation', { 
            required: 'Please share what motivates you',
            minLength: {
              value: 50,
              message: 'Please provide a more detailed response (at least 50 characters)'
            }
          })}
          placeholder="Tell us what drives your passion for technology and building amazing things..."
          className="w-full h-48 p-6 border-2 border-gray-200 focus:border-gray-900 outline-none transition-colors duration-300 text-lg bg-transparent rounded-xl resize-none placeholder-gray-400 text-gray-900"
        />
        {errors.motivation && (
          <p className="text-red-500 text-sm mt-2">{errors.motivation.message}</p>
        )}
      </motion.div>

      {/* Animated typing indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="flex items-center justify-center space-x-1"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0 }}
          className="w-2 h-2 bg-blue-400 rounded-full"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
          className="w-2 h-2 bg-blue-400 rounded-full"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
          className="w-2 h-2 bg-blue-400 rounded-full"
        />
      </motion.div>
    </div>
  );
}
