/**
 * Wave wordmark SVG — "wave" as path-based vector from Figma (Logo / Word mark).
 * Bold geometric sans-serif, tight kerning. No font dependency.
 *
 * To use Figma-exported paths: Outline the text in Figma (Right-click → Outline stroke),
 * then Copy as SVG and paste the path d values below.
 */

import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

const VIEWBOX_WIDTH = 90;
const VIEWBOX_HEIGHT = 28;

interface WaveWordmarkProps {
  width: number;
  height?: number;
  color?: string;
  accessibilityLabel?: string;
}

/**
 * Path data for "wave" — Inter Bold–style letterforms, tight kerning.
 * Matches Figma Logo / Word mark (node 413:2092).
 * Replace with Figma export (Outline stroke → Copy as SVG) for exact match.
 */
const LETTER_PATHS = [
  // w — two v shapes
  { d: 'M 0 28 L 5 0 L 10 28 L 15 0 L 20 28 Z', key: 'w' },
  // a — bowl + stem
  {
    d: 'M 24 20 C 20 20 20 8 24 8 C 28 8 32 8 32 14 C 32 20 28 20 24 20 Z M 26 16 C 26 12 28 10 30 10 C 32 10 34 12 34 16 C 34 18 32 18 30 18 C 28 18 26 16 26 16 Z',
    key: 'a',
    fillRule: 'evenodd' as const,
  },
  // v
  { d: 'M 36 0 L 42 28 L 48 0 Z', key: 'v' },
  // e — rounded with crossbar
  {
    d: 'M 52 20 C 48 20 48 14 48 8 C 48 6 50 6 52 8 C 54 10 54 14 54 18 L 50 18 C 50 16 50 12 52 12 C 56 12 56 16 56 20 C 56 22 54 22 52 20 Z',
    key: 'e',
    fillRule: 'evenodd' as const,
  },
];

export function WaveWordmark({
  width,
  height = width * (VIEWBOX_HEIGHT / VIEWBOX_WIDTH),
  color = '#0A0A0A',
  accessibilityLabel = 'Wave',
}: WaveWordmarkProps) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
      fill="none"
      accessible
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="image">
      <G fill={color}>
        {LETTER_PATHS.map((letter) =>
          letter.fillRule ? (
            <Path
              key={letter.key}
              d={letter.d}
              fillRule={letter.fillRule}
              fill={color}
            />
          ) : (
            <Path key={letter.key} d={letter.d} fill={color} />
          )
        )}
      </G>
    </Svg>
  );
}
