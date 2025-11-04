
import React, { useState, useEffect, useCallback } from 'react';
import { PlanStep } from './types';
import { generateTreasureHuntPlan } from './services/geminiService';
// Fix: The `Location` type is not exported from `constants.ts` and is not used in this file.
import { LOCATIONS } from './constants';
import { LanguageToggle } from './components/LanguageToggle';
import { PlanStepCard } from './components/PlanStepCard';
import { CompassLoader } from './components/CompassLoader';
import { GemIcon } from './components/icons';

type Language = 'en' | 'ar';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('ar');
  const [plan, setPlan] = useState<PlanStep[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const t = (en: string, ar: string) => (language === 'en' ? en : ar);

  const handleGeneratePlan = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setPlan(null);
    try {
      const generatedPlan = await generateTreasureHuntPlan(LOCATIONS, language);
      setPlan(generatedPlan);
    } catch (err) {
      console.error(err);
      setError(t('Failed to generate the plan. Please try again.', 'فشل في إنشاء الخطة. يرجى المحاولة مرة أخرى.'));
    } finally {
      setIsLoading(false);
    }
  }, [language]);

  const renderContent = () => {
    if (isLoading) {
      return <CompassLoader text={t('Generating Your Adventure...', 'جاري تحضير مغامرتك...')} />;
    }
    if (error) {
      return <p className="text-center text-red-500 text-lg mt-8">{error}</p>;
    }
    if (plan) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 animate-fade-in">
          {plan.map((step, index) => {
            const locationDetails = LOCATIONS.find(loc => loc.name.en === step.location || loc.name.ar === step.location);
            return (
              <PlanStepCard
                key={index}
                stepNumber={index + 1}
                step={step}
                icon={locationDetails?.icon}
                language={language}
              />
            );
          })}
        </div>
      );
    }
    return (
      <div className="text-center mt-12 flex flex-col items-center">
        <GemIcon className="w-24 h-24 text-cyan-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">{t('Ready for an Adventure?', 'هل أنت مستعد لمغامرة؟')}</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-md">{t('Click the button above to generate a unique 7-step treasure hunt plan for your group!', 'انقر على الزر أعلاه لإنشاء خطة بحث عن الكنز فريدة من 7 خطوات لمجموعتك!')}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <header className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center gap-2">
          <GemIcon className="w-8 h-8"/>
          {t('Gemini Treasure Hunt Planner', 'مخطط البحث عن الكنز')}
        </h1>
        <LanguageToggle language={language} setLanguage={setLanguage} />
      </header>

      <main className="container mx-auto p-4 md:p-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">{t('Create Your Electronic Treasure Hunt', 'أنشئ لعبة الكنز الإلكترونية الخاصة بك')}</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{t('Let Gemini craft a unique adventure! Get 7 exciting steps with riddles and tasks for your chosen locations.', 'دع Gemini يصنع مغامرة فريدة! احصل على 7 خطوات مثيرة مع ألغاز ومهام لمواقعك المختارة.')}</p>
          <button
            onClick={handleGeneratePlan}
            disabled={isLoading}
            className="mt-6 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
          >
            {isLoading ? t('Generating...', 'جاري الإنشاء...') : t('Generate New Plan', 'إنشاء خطة جديدة')}
          </button>
        </div>

        {renderContent()}
      </main>
    </div>
  );
};

export default App;