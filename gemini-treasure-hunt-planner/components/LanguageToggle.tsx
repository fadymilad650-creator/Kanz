
import React from 'react';

interface LanguageToggleProps {
  language: 'en' | 'ar';
  setLanguage: (lang: 'en' | 'ar') => void;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ language, setLanguage }) => {
  return (
    <div className="flex items-center bg-gray-200 dark:bg-gray-700 rounded-full p-1">
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors duration-300 ${
          language === 'en' ? 'bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 shadow' : 'text-gray-500'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('ar')}
        className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors duration-300 ${
          language === 'ar' ? 'bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 shadow' : 'text-gray-500'
        }`}
      >
        AR
      </button>
    </div>
  );
};
