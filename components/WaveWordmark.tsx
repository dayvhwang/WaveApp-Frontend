/**
 * Wave wordmark SVG — "wave" in bold type, scalable.
 * Uses SVG Text so it clearly reads "wave" (Figma Logo / Word mark style).
 */

import React from 'react';
import Svg, { Text } from 'react-native-svg';

const VIEWBOX_WIDTH = 100;
const VIEWBOX_HEIGHT = 32;

interface WaveWordmarkProps {
  width: number;
  height?: number;
  color?: string;
  accessibilityLabel?: string;
}

export function WaveWordmark({
  width,
  height = width * (VIEWBOX_HEIGHT / VIEWBOX_WIDTH),
  color = '#0A0A0A',
  accessibilityLabel = 'Wave',
}: WaveWordmarkProps) {
  // Font size in viewBox units so text scales with the SVG
  const fontSize = 28;
  const letterSpacing = -0.56; // Figma -2%

  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
      fill="none"
      accessible
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="image">
      <Text
        x={0}
        y={fontSize}
        fill={color}
        fontFamily="Inter_700Bold"
        fontSize={fontSize}
        letterSpacing={letterSpacing}
        fontWeight="700">
        wave
      </Text>
    </Svg>
  );
}
