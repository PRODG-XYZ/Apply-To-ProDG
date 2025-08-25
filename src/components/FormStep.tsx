'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FormStepProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export default function FormStep({ children, title, subtitle }: FormStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto px-6"
    >
      {title && (
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-thin text-gray-900 mb-4 text-center"
        >
          {title}
        </motion.h2>
      )}
      
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-gray-600 mb-8 text-center font-light"
        >
          {subtitle}
        </motion.p>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
