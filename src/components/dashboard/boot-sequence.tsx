"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Brain, Database, Search, Zap } from "lucide-react";

interface BootSequenceProps {
  isLoading: boolean;
  keyword: string;
}

export function AIBootSequence({ isLoading, keyword }: BootSequenceProps) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { label: "Initializing OS...", icon: Activity },
    { label: "Scanning Suggest Stream...", icon: Search },
    { label: "Deep Emotion Profiling...", icon: Brain },
    { label: "Generating MVP Architecture...", icon: Zap },
    { label: "Storing to Neural DB...", icon: Database },
  ];

  useEffect(() => {
    if (isLoading) {
      setProgress(0);
      setCurrentStep(0);
      
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 98) return 98;
          return prev + Math.random() * 5;
        });
      }, 100);

      const stepInterval = setInterval(() => {
        setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
      }, 800);

      return () => {
        clearInterval(interval);
        clearInterval(stepInterval);
      };
    } else {
      setProgress(100);
      setTimeout(() => setProgress(0), 500);
    }
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm"
        >
          {/* 青いグロー・波紋 */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div 
              animate={{ 
                scale: [1, 2, 2.5],
                opacity: [0.3, 0.1, 0]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-blue-500/30 bg-blue-500/10"
            />
            <motion.div 
              animate={{ 
                scale: [1, 1.5, 2],
                opacity: [0.5, 0.2, 0]
              }}
              transition={{ duration: 2, delay: 0.5, repeat: Infinity, ease: "easeOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-indigo-500/40 bg-indigo-500/20"
            />
          </div>

          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* スキャンライン */}
            <motion.div
              animate={{ y: ["-10%", "110%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 w-full h-8 bg-gradient-to-b from-transparent via-blue-400/20 to-transparent pointer-events-none"
            />

            <div className="flex flex-col gap-6 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-bold text-lg tracking-tight">AI OS Booting</h3>
                  <p className="text-blue-200/80 text-xs mt-1">Target: {keyword || "システム初期化中"}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-blue-400 animate-pulse" />
                </div>
              </div>

              {/* Steps */}
              <div className="space-y-3">
                {steps.map((step, idx) => {
                  const isActive = idx === currentStep;
                  const isPast = idx < currentStep;
                  const StepIcon = step.icon;
                  
                  return (
                    <div key={idx} className={`flex items-center gap-3 text-sm transition-colors duration-300 ${isActive ? 'text-white' : isPast ? 'text-blue-300/60' : 'text-slate-500'}`}>
                      <StepIcon className={`w-4 h-4 ${isActive ? 'animate-pulse text-blue-400' : ''}`} />
                      <span>{step.label}</span>
                      {isPast && <span className="ml-auto text-xs text-blue-400">Done</span>}
                      {isActive && <span className="ml-auto text-xs text-white animate-pulse">{Math.floor(progress)}%</span>}
                    </div>
                  );
                })}
              </div>

              {/* Progress Bar */}
              <div className="h-1.5 w-full bg-slate-800/50 rounded-full overflow-hidden mt-2">
                <motion.div 
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear" }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
