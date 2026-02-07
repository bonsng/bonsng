"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type Theme = "light" | "dark";
export type Language = "ko" | "en";

type SettingsContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  language: Language;
  setLanguage: (language: Language) => void;
};

const SettingsContext = createContext<SettingsContextValue | null>(null);

const THEME_KEY = "bonsng-theme";
const LANGUAGE_KEY = "bonsng-language";
type SettingsProviderProps = {
  children: React.ReactNode;
  initialTheme: Theme;
  initialLanguage: Language;
};

export function SettingsProvider({ children, initialTheme, initialLanguage }: SettingsProviderProps) {
  const [theme, setThemeState] = useState<Theme>(initialTheme);
  const [language, setLanguageState] = useState<Language>(initialLanguage);

  const setTheme = useCallback((nextTheme: Theme) => {
    document.documentElement.classList.add("theme-changing");
    setThemeState(nextTheme);
    window.setTimeout(() => {
      document.documentElement.classList.remove("theme-changing");
    }, 320);
  }, []);

  const setLanguage = useCallback((nextLanguage: Language) => {
    setLanguageState(nextLanguage);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem(THEME_KEY, theme);
    document.cookie = `${THEME_KEY}=${theme}; path=/; max-age=31536000; samesite=lax`;
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = language;
    localStorage.setItem(LANGUAGE_KEY, language);
    document.cookie = `${LANGUAGE_KEY}=${language}; path=/; max-age=31536000; samesite=lax`;
  }, [language]);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      language,
      setLanguage,
    }),
    [theme, language, setLanguage, setTheme],
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within SettingsProvider");
  }
  return context;
}
