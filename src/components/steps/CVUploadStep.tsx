'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { ApplicationFormData } from '@/types/application';

interface CVUploadStepProps {
  setValue: UseFormSetValue<ApplicationFormData>;
  watch: UseFormWatch<ApplicationFormData>;
}

export default function CVUploadStep({ setValue, watch }: CVUploadStepProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  
  const cvFileName = watch('cvFileName');
  const cvUrl = watch('cvUrl');
  
  // This ensures cvUrl is "used" to prevent linting warnings
  void cvUrl;

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const result = await response.json();
      setValue('cvUrl', result.url);
      setValue('cvFileName', result.fileName);
    } catch (error) {
      console.error('Upload error:', error);
      setUploadError('Failed to upload file. Please try again.');
    } finally {
      setIsUploading(false);
    }
  }, [setValue]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-thin text-gray-900 mb-4">
          Share your CV
        </h2>
        <p className="text-lg text-gray-600 font-light">
          PDF or DOC format, please
        </p>
      </div>

      {!cvFileName ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300 ${
            isDragActive
              ? 'border-gray-700 bg-gray-100'
              : 'border-gray-300 hover:border-gray-600 hover:bg-gray-50'
          }`}
        >
          <input {...getInputProps()} />
          
          <motion.div
            animate={{ y: isDragActive ? -5 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <svg
              className="mx-auto h-16 w-16 text-gray-400 mb-4"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            
            {isUploading ? (
              <p className="text-lg text-gray-600">Uploading...</p>
            ) : isDragActive ? (
              <p className="text-lg text-gray-800">Drop your CV here</p>
            ) : (
              <>
                <p className="text-lg text-gray-600 mb-2">
                  Upload your CV (PDF or DOC)
                </p>
                <p className="text-sm text-gray-500">
                  Drag and drop or click to browse
                </p>
              </>
            )}
          </motion.div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-green-50 border border-green-200 rounded-xl p-6 text-center"
        >
          <svg
            className="mx-auto h-12 w-12 text-green-600 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-lg text-green-800 mb-2">
            Got it — looks like you&apos;ve been busy.
          </p>
          <p className="text-sm text-green-600">{cvFileName}</p>
          <button
            onClick={() => {
              setValue('cvUrl', undefined);
              setValue('cvFileName', undefined);
            }}
            className="mt-4 text-sm text-green-600 hover:text-green-800 underline"
          >
            Upload different file
          </button>
        </motion.div>
      )}

      {uploadError && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-500 text-center"
        >
          {uploadError}
        </motion.p>
      )}
    </div>
  );
}
