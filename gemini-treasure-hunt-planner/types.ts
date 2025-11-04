
import React from 'react';

export interface Location {
  id: string;
  name: {
    en: string;
    ar: string;
  };
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface PlanStep {
  location: string;
  clue: string;
  task: string;
}
