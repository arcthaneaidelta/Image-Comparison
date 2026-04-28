"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen({ onFinished }: { onFinished: () => void }) {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setShow(false);
            setTimeout(onFinished, 500);
          }, 800);
          return 100;
        }
        // Random increment for a "realistic" feel
        const diff = Math.random() * 15;
        return Math.min(prev + diff, 100);
      });
    }, 200);

    return () => clearInterval(interval);
  }, [onFinished]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
        >
          <div className="relative flex flex-col items-center">
            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-8 flex items-center gap-3"
            >
              <div className="relative h-12 w-12 overflow-hidden rounded-xl bg-primary flex items-center justify-center shadow-lg">
                <motion.div 
                  animate={{ 
                    rotate: [0, 90, 180, 270, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="w-6 h-6 border-2 border-white rounded-sm opacity-50"
                />
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
                  O
                </div>
              </div>
              <span className="text-2xl font-bold tracking-tight text-slate-900">OpticSync</span>
            </motion.div>

            {/* Progress Section */}
            <div className="w-64 h-1 bg-slate-100 rounded-full overflow-hidden relative">
              <motion.div
                className="absolute inset-y-0 left-0 bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ type: "spring", stiffness: 50 }}
              />
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-4 flex flex-col items-center gap-1"
            >
              <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">
                {progress < 30 ? "Initializing engine..." : progress < 70 ? "Loading visual layers..." : "Finalizing workspace..."}
              </span>
              <span className="text-sm font-semibold text-primary">{Math.round(progress)}%</span>
            </motion.div>
          </div>

          {/* Background subtle motion */}
          <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
            <motion.div
              animate={{ 
                x: [0, 100, 0],
                y: [0, 50, 0],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-20 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
            />
            <motion.div
              animate={{ 
                x: [0, -100, 0],
                y: [0, -50, 0],
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-20 -right-20 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
