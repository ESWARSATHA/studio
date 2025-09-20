
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import en from './en.json';

export const languages = [
  { code: 'en', name: 'English' },
  { code: 'as', name: 'অসমীয়া' },
  { code: 'bn', name: 'বাংলা' },
  { code: 'brx', name: 'बोड़ो' },
  { code: 'doi', name: 'डोगरी' },
  { code: 'gu', name: 'ગુજરાતી' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'kn', name: 'ಕನ್ನಡ' },
  { code: 'ks', name: 'کٲشُر' },
  { code: 'kok', name: 'कोंकणी' },
  { code: 'mai', name: 'मैथिली' },
  { code: 'ml', name: 'മലയാളം' },
  { code: 'mni', name: 'মৈতৈলোন্' },
  { code: 'mr', name: 'मराठी' },
  { code: 'ne', name: 'नेपाली' },
  { code: 'or', name: 'ଓଡ଼ିଆ' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ' },
  { code: 'sa', name: 'संस्कृतम्' },
  { code: 'sat', name: 'ᱥᱟᱱᱛᱟᱲᱤ' },
  { code: 'sd', name: 'सिंधी' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'te', name: 'తెలుగు' },
  { code: 'ur', name: 'اردو' },
];

const availableLanguages = languages.map(l => l.code);

interface LanguageContextType {
  language: string;
  setLanguage: (language: string) => void;
  translations: any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState('en');
  const [translations, setTranslations] = useState(en);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && availableLanguages.includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    const loadTranslations = async () => {
      if (language === 'en') {
        setTranslations(en);
        return;
      }
      try {
        const newTranslations = await import(`./${language}.json`);
        setTranslations(newTranslations.default);
      } catch (error) {
        console.error(`Could not load translations for ${language}, falling back to English.`, error);
        setTranslations(en);
      }
    };
    loadTranslations();
  }, [language]);

  const handleSetLanguage = (lang: string) => {
    if (availableLanguages.includes(lang)) {
      setLanguage(lang);
      localStorage.setItem('language', lang);
    } else {
        setLanguage('en');
        localStorage.setItem('language', 'en');
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, translations }}>
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
