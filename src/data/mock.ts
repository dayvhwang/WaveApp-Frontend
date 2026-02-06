/**
 * Mock data for Wave — hardcoded for frontend-only development.
 * Structure aligned with backend API for later connection.
 */

import type { Intro, Group, Personality } from '../types';

export const mockIntros: Intro[] = [
  {
    id: '1',
    name: 'Alex',
    age: 28,
    location: 'San Francisco',
    bio: 'Loves hiking and coffee shops. Always down for a spontaneous adventure.',
    tags: ['Hiking', 'Coffee', 'Travel'],
    label: "Today's intro",
  },
  {
    id: '2',
    name: 'Jordan',
    age: 32,
    location: 'Brooklyn',
    bio: 'Designer by day, jazz enthusiast by night. Looking for creative souls.',
    tags: ['Design', 'Music', 'Art'],
  },
  {
    id: '3',
    name: 'Sam',
    age: 25,
    location: 'Austin',
    bio: 'Startup founder. Into yoga and tacos. Let\'s build something cool.',
    tags: ['Startups', 'Yoga', 'Food'],
    label: "Today's intro",
  },
];

export const mockGroups: Group[] = [
  {
    id: '1',
    title: 'Bay Area Hikers',
    subtitle: 'Weekend trail adventures',
    description: 'We hit the trails every Saturday. All levels welcome.',
    memberCount: 24,
  },
  {
    id: '2',
    title: 'Design & Coffee',
    subtitle: 'Creative catch-ups',
    description: 'Casual meetups for designers, writers, and creatives.',
    memberCount: 18,
  },
  {
    id: '3',
    title: 'Late Night Jazz',
    subtitle: 'Live music lovers',
    description: 'Monthly jazz club outings. New venues, new friends.',
    memberCount: 12,
  },
];

export const mockPersonality: Personality = {
  archetypeName: 'The Steady Current',
  reasoning:
    'Thoughtful, adaptable, and great at balancing structure with spontaneity. You tend to weigh options before acting but stay open to new experiences.',
  traits: [
    { name: 'Openness', score: 78 },
    { name: 'Conscientiousness', score: 65 },
    { name: 'Extraversion', score: 52 },
    { name: 'Agreeableness', score: 72 },
    { name: 'Neuroticism', score: 35 },
  ],
};

export const mockChats = [
  { id: '1', name: 'Alex', preview: 'Hey! Want to grab coffee this week?', time: '2m ago' },
  { id: '2', name: 'Jordan', preview: "That concert was amazing! Let's do it again.", time: '1h ago' },
  { id: '3', name: 'Sam', preview: 'Thanks for the intro — great conversation!', time: 'Yesterday' },
];
