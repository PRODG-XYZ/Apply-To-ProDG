'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function LandingPage() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Set initial dimensions
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // Update dimensions on resize
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
                {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12"
        >
          <div className="flex justify-center">
            <svg
              width="80"
              height="90"
              viewBox="0 0 222 252"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-gray-900"
            >
              <path
                d="M115 123.5V237.164C115 240.223 111.707 242.15 109.041 240.651L12.0405 186.147C10.7801 185.438 10 184.105 10 182.659V66.5M115 123.5L10 66.5M115 123.5L211.5 66.5M10 66.5L107.536 10.625C108.755 9.92701 110.25 9.91905 111.476 10.6041L211.5 66.5M211.5 66.5V182.82C211.5 184.179 210.81 185.445 209.669 186.182L165 215"
                stroke="currentColor"
                strokeWidth="20"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <h1 className="text-6xl md:text-7xl font-thin text-gray-900 mb-6 tracking-tight">
            We&apos;d love to get to know you{' '}
            <span className="font-light text-gray-700">better.</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <p className="text-xl md:text-2xl text-gray-600 mb-12 font-light">
            This won&apos;t take long, we promise.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/apply">
            <button className="bg-gray-900 hover:bg-gray-800 text-white text-lg font-medium px-12 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl">
              Start Application
            </button>
          </Link>
        </motion.div>

        {/* Floating particles background */}
        {dimensions.width > 0 && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(40)].map((_, i) => {
              // Generate random values for each particle
              const initialX = Math.random() * dimensions.width;
              const initialY = Math.random() * dimensions.height;
              const moveRangeX = 50 + Math.random() * 100; // 50-150px movement
              const moveRangeY = 30 + Math.random() * 80;  // 30-110px movement
              const duration = 15 + Math.random() * 20;    // 15-35 seconds
              const delay = Math.random() * 10;            // 0-10 second delay
              const size = 1 + Math.random() * 3;          // 1-4px size
              const opacity = 0.2 + Math.random() * 0.25;  // 0.2-0.45 opacity
              
              return (
                <motion.div
                  key={i}
                  className="absolute bg-gray-600 rounded-full"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    opacity: opacity,
                  }}
                  initial={{
                    x: initialX,
                    y: initialY,
                  }}
                  animate={{
                    x: [
                      initialX,
                      initialX - moveRangeX/2,
                      initialX + moveRangeX/2,
                      initialX - moveRangeX/3,
                      initialX
                    ],
                    y: [
                      initialY,
                      initialY - moveRangeY/2,
                      initialY + moveRangeY/3,
                      initialY - moveRangeY/4,
                      initialY
                    ],
                  }}
                  transition={{
                    duration: duration,
                    delay: delay,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                  }}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}