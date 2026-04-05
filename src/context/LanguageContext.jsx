import React, { createContext, useContext, useState, useCallback } from 'react';
import es from '../i18n/es';
import en from '../i18n/en';

const translations = { es, en };

export const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    return localStorage.getItem('mhur_lang') || 'es';
  });

  const setLang = (newLang) => {
    localStorage.setItem('mhur_lang', newLang);
    setLangState(newLang);
  };

  // t(key) - returns a string or calls a function with given args
  const t = useCallback((key, ...args) => {
    const dict = translations[lang] || translations['es'];
    const val = dict[key];
    if (val === undefined) {
      console.warn(`[i18n] Missing key: "${key}" for lang "${lang}"`);
      return key;
    }
    if (typeof val === 'function') {
      return val(...args);
    }
    return val;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Convenience hook
export function useT() {
  return useContext(LanguageContext);
}
