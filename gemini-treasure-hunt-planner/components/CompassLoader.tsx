
import React from 'react';

interface CompassLoaderProps {
  text: string;
}

export const CompassLoader: React.FC<CompassLoaderProps> = ({ text }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 mt-8 text-center">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-4 border-gray-300 dark:border-gray-600 rounded-full"></div>
        <div className="absolute inset-2 border-2 border-gray-200 dark:border-gray-700 rounded-full"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1 h-1 bg-cyan-500 rounded-full"></div>
        </div>
        <div className="absolute inset-0 animate-spin">
          <div
            className="absolute top-1/2 left-1/2 w-1 h-10 bg-red-500 rounded-full origin-bottom"
            style={{ transform: 'translate(-50%, -100%) rotate(0deg)' }}
          >
             <div className="absolute -top-1 left-1/2 w-3 h-3 border-t-2 border-l-2 border-red-500 transform -translate-x-1/2 rotate-45"></div>
          </div>
          <div
            className="absolute top-1/2 left-1/2 w-1 h-10 bg-gray-400 dark:bg-gray-500 rounded-full origin-bottom"
            style={{ transform: 'translate(-50%, -100%) rotate(180deg)' }}
          ></div>
        </div>
      </div>
      <p className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300 tracking-wider">{text}</p>
    </div>
  );
};
