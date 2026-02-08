/**
 * Wave logo + wordmark from Figma (Logo / Icon Only + Logo / Word mark).
 * Icon and wordmark are both path-based SVGs — no font dependency.
 */

import { View } from 'react-native';

import { colors } from '@/src/theme/tokens';

import { WaveLogoIcon } from './WaveLogoIcon';
import { WaveWordmark } from './WaveWordmark';

interface WaveLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showWordmark?: boolean;
  /** When false, only the "wave" wordmark is shown (no icon). Logo icon appears only on login/signup. */
  showIcon?: boolean;
}

const SIZE_CONFIG = {
  sm: { iconSize: 20, wordmarkWidth: 80 },
  md: { iconSize: 28, wordmarkWidth: 110 },
  lg: { iconSize: 36, wordmarkWidth: 140 },
} as const;

export function WaveLogo({ size = 'md', showWordmark = true, showIcon = true }: WaveLogoProps) {
  const { iconSize, wordmarkWidth } = SIZE_CONFIG[size];

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      {showIcon && <WaveLogoIcon width={iconSize} color="#0B5CFF" />}
      {showWordmark && (
        <WaveWordmark width={wordmarkWidth} color={colors.brandBlack} />
      )}
    </View>
  );
}
