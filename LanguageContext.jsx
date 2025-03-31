// LanguageContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios'; // or use fetch

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en'); // Default language is 'en'
  const [translations, setTranslations] = useState({}); // For storing fetched language data

  // Function to fetch translations from the API
  const fetchLanguageData = async (lang) => {
    try {
      const response = await axios.get(`/api/lang/${lang}`); // API endpoint for translations
      setTranslations(response.data);
    } catch (error) {
      console.error("Error fetching language data:", error);
      // Fallback: If there's an error fetching, you can revert to default translations
      setTranslations({});
    }
  };

  // Fetch language data when the language changes
  useEffect(() => {
    fetchLanguageData(language);
  }, [language]); // Dependency on `language` to refetch when it changes

  // Function to change language
  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, translations, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
