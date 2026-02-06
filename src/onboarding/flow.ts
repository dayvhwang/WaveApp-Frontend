/**
 * Hardcoded onboarding flow — questions, suggested answers, personality outcome.
 * Aligned with GroupSync backend structure for future API connection.
 */

import type { OnboardingStep } from '../types';

export const onboardingSteps: OnboardingStep[] = [
  {
    id: 'reassurance',
    guideMessage:
      "Hey! I'm your Wave guide. I'll help you discover people and groups you'll actually vibe with. Don't worry — you can update your answers anytime from your profile after onboarding.",
    isReassurance: true,
  },
  {
    id: 'name',
    guideMessage: "First things first... What do I call you?",
    suggestedAnswers: [],
  },
  {
    id: 'age',
    guideMessage: "Nice to meet you! How old are you?",
    suggestedAnswers: ['18-24', '25-34', '35-44', '45+'],
  },
  {
    id: 'location',
    guideMessage: "Sweet. And where in the world are you located right now?",
    suggestedAnswers: ['San Francisco', 'New York', 'Austin', 'Los Angeles', 'Other'],
  },
  {
    id: 'hobbies',
    guideMessage: "What do you like to do in your free time? Pick a few or describe your own.",
    suggestedAnswers: ['Cafe hopping', 'Yoga', 'Live music', 'Hiking', 'Reading', 'Museums'],
  },
  {
    id: 'goals',
    guideMessage: "What are you hoping to get out of Wave?",
    suggestedAnswers: [
      "I'm hoping to network!",
      'I want to attend more fun events.',
      "I'm looking for deeper connections.",
      'Just exploring.',
    ],
  },
  // Deeper personality questions (OCEAN-aligned)
  {
    id: 'deep-1',
    guideMessage:
      "When you're deep into a big goal and hit a wall... what's your immediate plan of attack?",
    suggestedAnswers: [
      'I pivot and try the weirdest new approach first.',
      'I research thoroughly, then follow a clear plan.',
      "I ask friends for advice and brainstorm together.",
    ],
  },
  {
    id: 'deep-2',
    guideMessage:
      "When learning something new... do you need a clear step-by-step roadmap, or do you just grab the tools and start exploring?",
    suggestedAnswers: [
      'I find the best curriculum and follow it perfectly.',
      'I grab the tools and figure it out as I go.',
      "I like a mix — some structure, lots of experimentation.",
    ],
  },
  {
    id: 'deep-3',
    guideMessage:
      "When you need to totally switch off and recharge... do you prefer quiet alone time, or is hanging out with friends the real relief?",
    suggestedAnswers: [
      'Quiet alone time, for sure.',
      'Hanging out with friends recharges me.',
      "A bit of both — depends on the day.",
    ],
  },
  {
    id: 'outcome',
    guideMessage:
      "Based on your answers, you're The Steady Current — thoughtful, adaptable, and great at balancing structure with spontaneity. You tend to weigh options before acting but stay open to new experiences.",
    isOutcome: true,
  },
];
