
import React from 'react';
import { PlanStep } from '../types';

interface PlanStepCardProps {
  stepNumber: number;
  step: PlanStep;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  language: 'en' | 'ar';
}

export const PlanStepCard: React.FC<PlanStepCardProps> = ({ stepNumber, step, icon: Icon, language }) => {
  const t = (en: string, ar: string) => (language === 'en' ? en : ar);
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col">
      <div className="p-5 flex-grow">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 uppercase tracking-wide">
              {t('Step', 'الخطوة')} {stepNumber}
            </p>
            <h3 className="mt-1 text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              {Icon && <Icon className="w-6 h-6 text-gray-500 dark:text-gray-400" />}
              {step.location}
            </h3>
          </div>
          <div className="bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300 font-bold rounded-full w-10 h-10 flex items-center justify-center text-lg">
            {stepNumber}
          </div>
        </div>

        <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="mb-4">
            <h4 className="font-semibold text-gray-700 dark:text-gray-300">{t('Your Task', 'المهمة')}</h4>
            <p className="mt-1 text-gray-600 dark:text-gray-400">{step.task}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 dark:text-gray-300">{t('Next Clue', 'اللغز التالي')}</h4>
            <p className="mt-1 text-gray-600 dark:text-gray-400 italic">"{step.clue}"</p>
          </div>
        </div>
      </div>
    </div>
  );
};
