
import { GoogleGenAI, Type } from "@google/genai";
import { Location, PlanStep } from '../types';

// Fix: Initialize GoogleGenAI with API_KEY from environment variables directly, as per coding guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Function to shuffle an array
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export async function generateTreasureHuntPlan(locations: Location[], language: 'en' | 'ar'): Promise<PlanStep[]> {
  const shuffledLocations = shuffleArray(locations);
  const locationNames = shuffledLocations.map(loc => language === 'en' ? loc.name.en : loc.name.ar);
  const specialCafeteriaName = language === 'en' ? 'The Special Cafeteria' : 'الكافتريا الخاصة';

  const systemInstruction = `You are a creative game designer specializing in fun treasure hunts. Your task is to generate a 7-step treasure hunt plan based on a list of locations. The output must be a valid JSON array only.`;
  
  const prompt = `
    Please generate a 7-step treasure hunt plan in ${language}.
    The locations, in order, are: ${locationNames.join(', ')}.

    For each step, create:
    1. A clever but simple riddle that points to the *next* location in the sequence. The riddle for the last step should lead back to a hypothetical starting point or a final prize area.
    2. A fun task to complete at the current location.
    3. The task for the location "${specialCafeteriaName}" must be to "Scan the QR code to get the next clue."

    The response must be a valid JSON array of objects. Each object should have keys: "location", "clue", and "task".
    Do not include any text before or after the JSON array.
  `;

  const responseSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        location: {
          type: Type.STRING,
          description: 'The name of the current location.',
        },
        clue: {
          type: Type.STRING,
          description: 'A riddle pointing to the NEXT location.',
        },
        task: {
          type: Type.STRING,
          description: 'The task to be completed at the current location.',
        },
      },
      required: ["location", "clue", "task"],
    },
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.8,
      },
    });

    const jsonText = response.text.trim();
    const plan = JSON.parse(jsonText) as PlanStep[];

    // Ensure the plan has exactly 7 steps, if not, something went wrong.
    if (!Array.isArray(plan) || plan.length !== 7) {
        throw new Error('Invalid plan format received from API.');
    }
    
    return plan;
  } catch (error) {
    console.error("Error generating plan with Gemini:", error);
    throw new Error("Failed to communicate with the AI model.");
  }
}