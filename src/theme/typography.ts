/**
 * Wave typography — Inter Display for all text.
 * Semantic type scale: overline, caption, body, title, nav.
 */

import { TextStyle } from 'react-native';

export const typography = {
  overline: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 10,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  } as TextStyle,
  caption: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: '#6B7280',
  } as TextStyle,
  body: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    lineHeight: 24,
  } as TextStyle,
  bodyBold: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    lineHeight: 24,
  } as TextStyle,
  title: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 20,
    lineHeight: 28,
  } as TextStyle,
  titleLarge: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 26,
    lineHeight: 32,
  } as TextStyle,
  nav: {
    fontFamily: 'Inter_500Medium',
    fontSize: 10,
  } as TextStyle,
} as const;
