/**
 * Wave design tokens — semantic names for colors, spacing, radius.
 * Notion-like hierarchy, minimal chrome, Jony Ive–inspired.
 */

export const colors = {
  brandBlack: '#111111',
  primary: '#111111',
  surface: '#ffffff',
  surfaceElevated: '#F9FAFB',
  mutedText: '#6B7280',
  text: '#111111',
  border: '#E5E7EB',
  chatBubbleGuide: '#E5E7EB',
  chatBubbleUser: '#ffffff',
  chatBubbleUserBorder: '#E5E7EB',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  full: 9999,
} as const;
