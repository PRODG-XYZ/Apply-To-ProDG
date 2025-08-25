'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { ApplicationFormData } from '@/types/application';

interface TechnologiesStepProps {
  setValue: UseFormSetValue<ApplicationFormData>;
  watch: UseFormWatch<ApplicationFormData>;
}

export default function TechnologiesStep({ setValue, watch }: TechnologiesStepProps) {
  const selectedTechnologies = watch('technologies') || [];

  const technologies = [
    // Frontend
    { name: 'React', category: 'Frontend' },
    { name: 'Vue.js', category: 'Frontend' },
    { name: 'Angular', category: 'Frontend' },
    { name: 'Next.js', category: 'Frontend' },
    { name: 'Svelte', category: 'Frontend' },
    { name: 'TypeScript', category: 'Frontend' },
    { name: 'JavaScript', category: 'Frontend' },
    
    // Backend
    { name: 'Node.js', category: 'Backend' },
    { name: 'Python', category: 'Backend' },
    { name: 'Java', category: 'Backend' },
    { name: 'Go', category: 'Backend' },
    { name: 'PHP', category: 'Backend' },
    { name: 'C#', category: 'Backend' },
    { name: 'Ruby', category: 'Backend' },
    { name: 'Rust', category: 'Backend' },
    
    // Mobile
    { name: 'React Native', category: 'Mobile' },
    { name: 'Flutter', category: 'Mobile' },
    { name: 'Swift', category: 'Mobile' },
    { name: 'Kotlin', category: 'Mobile' },
    
    // Database
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'MySQL', category: 'Database' },
    { name: 'MongoDB', category: 'Database' },
    { name: 'Redis', category: 'Database' },
    { name: 'SQLite', category: 'Database' },
    
    // Cloud & DevOps
    { name: 'AWS', category: 'Cloud & DevOps' },
    { name: 'Google Cloud', category: 'Cloud & DevOps' },
    { name: 'Azure', category: 'Cloud & DevOps' },
    { name: 'Docker', category: 'Cloud & DevOps' },
    { name: 'Kubernetes', category: 'Cloud & DevOps' },
    { name: 'CI/CD', category: 'Cloud & DevOps' },
    
    // Other
    { name: 'GraphQL', category: 'Other' },
    { name: 'REST APIs', category: 'Other' },
    { name: 'Git', category: 'Other' },
    { name: 'Machine Learning', category: 'Other' },
    { name: 'Blockchain', category: 'Other' },
  ];

  const categories = [...new Set(technologies.map(tech => tech.category))];

  const toggleTechnology = (techName: string) => {
    const current = selectedTechnologies || [];
    const updated = current.includes(techName)
      ? current.filter(t => t !== techName)
      : [...current, techName];
    setValue('technologies', updated);
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-thin text-gray-900 mb-6">
          What technologies do you work with?
        </h2>
        <p className="text-lg text-gray-600 font-light">
          Select the technologies you're familiar with (optional, but helpful)
        </p>
      </motion.div>

      <div className="space-y-8">
        {categories.map((category, categoryIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-medium text-gray-800 border-b border-gray-200 pb-2">
              {category}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {technologies
                .filter(tech => tech.category === category)
                .map((tech, index) => {
                  const isSelected = selectedTechnologies.includes(tech.name);
                  return (
                    <motion.button
                      key={tech.name}
                      type="button"
                      onClick={() => toggleTechnology(tech.name)}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: (categoryIndex * 0.1) + (index * 0.05) }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 border-2 ${
                        isSelected
                          ? 'bg-gray-900 text-white border-gray-900 shadow-md'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {tech.name}
                    </motion.button>
                  );
                })}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="text-center pt-8"
      >
        <p className="text-sm text-gray-500">
          Selected: {selectedTechnologies.length} technologies
        </p>
        {selectedTechnologies.length > 0 && (
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {selectedTechnologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-gray-200 text-gray-800 text-sm rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
