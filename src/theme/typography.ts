/**
 * Wave typography — Hubballi for all text.
 * Display-style kerning: tighter letter spacing for a polished, UX-friendly look.
 */

import { TextStyle } from 'react-native';

export const typography = {
  overline: {
    fontFamily: 'Hubballi_400Regular',
    fontSize: 10,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  } as TextStyle,
  caption: {
    fontFamily: 'Hubballi_400Regular',
    fontSize: 12,
    letterSpacing: -0.2,
    color: '#6B7280',
  } as TextStyle,
  body: {
    fontFamily: 'Hubballi_400Regular',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.4,
  } as TextStyle,
  bodyBold: {
    fontFamily: 'Hubballi_400Regular',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    letterSpacing: -0.4,
  } as TextStyle,
  title: {
    fontFamily: 'Hubballi_400Regular',
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600',
    letterSpacing: -0.5,
  } as TextStyle,
  titleLarge: {
    fontFamily: 'Hubballi_400Regular',
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '600',
    letterSpacing: -0.6,
  } as TextStyle,
  nav: {
    fontFamily: 'Hubballi_400Regular',
    fontSize: 10,
    letterSpacing: -0.3,
  } as TextStyle,
} as const;
