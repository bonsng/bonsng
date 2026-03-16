"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type Theme = "light" | "dark";
export type Language = "ko" | "en";
export type CanvasBg = "sand" | "cool-gray" | "lavender" | "mint" | "pearl";

export const CANVAS_BG_OPTIONS: { value: CanvasBg; label: { ko: string; en: string }; light: string; dark: string }[] = [
  { value: "sand", label: { ko: "웜 샌드", en: "Warm Sand" }, light: "#f2ede4", dark: "#0a0e1a" },
  { value: "cool-gray", label: { ko: "쿨 그레이", en: "Cool Gray" }, light: "#edf0f5", dark: "#0b0f1c" },
  { value: "lavender", label: { ko: "라벤더", en: "Lavender" }, light: "#eee9f5", dark: "#0d0a1a" },
  { value: "mint", label: { ko: "민트", en: "Mint" }, light: "#e9f3f1", dark: "#0a1210" },
  { value: "pearl", label: { ko: "펄 화이트", en: "Pearl White" }, light: "#f0eff2", dark: "#0a0d14" },
];

type SettingsContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  language: Language;
  setLanguage: (language: Language) => void;
  canvasBg: CanvasBg;
  setCanvasBg: (bg: CanvasBg) => void;
  canvasBgColor: string;
};

const SettingsContext = createContext<SettingsContextValue | null>(null);

const THEME_KEY = "bonsng-theme";
const LANGUAGE_KEY = "bonsng-language";
const CANVAS_BG_KEY = "bonsng-canvas-bg";
type SettingsProviderProps = {
  children: React.ReactNode;
  initialTheme: Theme;
  initialLanguage: Language;
};

export function SettingsProvider({ children, initialTheme, initialLanguage }: SettingsProviderProps) {
  const [theme, setThemeState] = useState<Theme>(initialTheme);
  const [language, setLanguageState] = useState<Language>(initialLanguage);
  const [canvasBg, setCanvasBgState] = useState<CanvasBg>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem(CANVAS_BG_KEY) as CanvasBg) || "sand";
    }
    return "sand";
  });

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

  const setCanvasBg = useCallback((nextBg: CanvasBg) => {
    setCanvasBgState(nextBg);
    localStorage.setItem(CANVAS_BG_KEY, nextBg);
  }, []);

  const canvasBgColor = useMemo(() => {
    const option = CANVAS_BG_OPTIONS.find((o) => o.value === canvasBg) ?? CANVAS_BG_OPTIONS[0];
    return theme === "dark" ? option.dark : option.light;
  }, [canvasBg, theme]);

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
      canvasBg,
      setCanvasBg,
      canvasBgColor,
    }),
    [theme, language, setLanguage, setTheme, canvasBg, setCanvasBg, canvasBgColor],
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
