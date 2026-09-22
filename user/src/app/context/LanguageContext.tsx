"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { translations } from "../translations";

type Language = "id" | "en";

type TranslationKey = string;

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext =
  createContext<LanguageContextType | undefined>(
    undefined
  );

export function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [language, setLanguageState] =
    useState<Language>("id");

  /* =========================
     AMBIL BAHASA YANG TERSIMPAN
  ========================= */

  useEffect(() => {
    const savedLanguage =
      localStorage.getItem("sisarpras-language");

    if (
      savedLanguage === "id" ||
      savedLanguage === "en"
    ) {
      setLanguageState(savedLanguage);
    }
  }, []);

  /* =========================
     GANTI BAHASA
  ========================= */

  function setLanguage(newLanguage: Language) {
    setLanguageState(newLanguage);

    localStorage.setItem(
      "sisarpras-language",
      newLanguage
    );
  }

  /* =========================
     AMBIL TRANSLATION
  ========================= */

  function t(key: TranslationKey): string {
    const keys = key.split(".");

    let value: unknown = translations[language];

    for (const currentKey of keys) {
      if (
        typeof value === "object" &&
        value !== null &&
        currentKey in value
      ) {
        value = (
          value as Record<string, unknown>
        )[currentKey];
      } else {
        return key;
      }
    }

    return typeof value === "string"
      ? value
      : key;
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

/* =========================
   HOOK
========================= */

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage harus digunakan di dalam LanguageProvider"
    );
  }

  return context;
}