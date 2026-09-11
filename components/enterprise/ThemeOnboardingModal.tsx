"use client";

import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

type ThemeOnboardingModalProps = {
  onComplete: () => void;
};

export function ThemeOnboardingModal({ onComplete }: ThemeOnboardingModalProps) {
  const { setTheme } = useTheme();

  const selectTheme = (theme: 'light' | 'dark') => {
    setTheme(theme);
    localStorage.setItem('theme_onboarding_complete', 'true');
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 backdrop-blur-sm font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-[min(90vw,420px)] rounded-3xl border border-zinc-800 bg-zinc-950 p-6 text-white"
      >
        <h2 className="text-xl font-bold">Choose Your Theme</h2>
        <p className="mt-2 text-xs text-zinc-400">
          Select between clean Dark (Black) or Light (White) theme.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-4">
          <button
            onClick={() => selectTheme('dark')}
            className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-zinc-700 bg-black p-5 text-white transition hover:scale-[1.02] shadow-lg"
          >
            <Moon className="h-8 w-8" />
            <span className="font-bold text-sm">Dark (Black)</span>
          </button>
          <button
            onClick={() => selectTheme('light')}
            className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-zinc-300 bg-white p-5 text-black transition hover:scale-[1.02] shadow-lg"
          >
            <Sun className="h-8 w-8 text-amber-500" />
            <span className="font-bold text-sm">Light (White)</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
