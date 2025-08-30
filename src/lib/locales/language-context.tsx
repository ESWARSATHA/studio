
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import en from './en.json';
import hi from './hi.json';
import bn from './bn.json';
import te from './te.json';
import mr from './mr.json';
import ta from './ta.json';
import ur from './ur.json';

export const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'bn', name: 'বাংলা' },
  { code: 'te', name: 'తెలుగు' },
  { code: 'mr', name: 'मराठी' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'ur', name: 'اردو' },
];

const translations: Record<string, any> = {
  en,
  hi,
  bn,
  te,
  mr,
  ta,
  ur,
};

interface LanguageContextType {
  language: string;
  setLanguage: (language: string) => void;
  translations: any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState('en');
  const [currentTranslations, setCurrentTranslations] = useState(translations.en);

  useEffect(() => {
    setCurrentTranslations(translations[language] || translations.en);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations: currentTranslations }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
