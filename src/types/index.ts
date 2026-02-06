/**
 * Wave data types — aligned with backend for future API integration.
 */

export interface Intro {
  id: string;
  name: string;
  age?: number;
  location?: string;
  bio?: string;
  tags?: string[];
  imageUrl?: string;
  label?: string;
}

export interface Group {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  memberCount?: number;
  imageUrl?: string;
}

export interface PersonalityTrait {
  name: string;
  score: number;
}

export interface Personality {
  archetypeName: string;
  reasoning: string;
  traits: PersonalityTrait[];
}

export interface OnboardingMessage {
  id: string;
  type: 'guide' | 'user';
  text: string;
}

export interface OnboardingStep {
  id: string;
  guideMessage: string;
  suggestedAnswers?: string[];
  isOutcome?: boolean;
  isReassurance?: boolean;
}
