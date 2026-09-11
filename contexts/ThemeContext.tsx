"use client";

import { createContext, useContext, useEffect, useState } from 'react';

export type AppTheme = 'dark' | 'light';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: AppTheme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: AppTheme;
  setTheme: (theme: AppTheme) => void;
};

const initialState: ThemeProviderState = {
  theme: 'dark',
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = 'dark',
  storageKey = 'drishti_global_theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<AppTheme>(defaultTheme);

  useEffect(() => {
    const storedTheme = localStorage.getItem(storageKey) as AppTheme | null;
    if (storedTheme === 'light' || storedTheme === 'dark') {
      setTheme(storedTheme);
    } else {
      setTheme('dark');
    }
  }, [storageKey]);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    root.setAttribute('data-theme', theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: AppTheme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};
