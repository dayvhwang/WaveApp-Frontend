import { Text, View } from 'react-native';

import { Card } from './Card';
import { colors, spacing } from '@/src/theme/tokens';
import { typography } from '@/src/theme/typography';
import type { Intro } from '@/src/types';

interface IntroCardProps {
  intro: Intro;
}

export function IntroCard({ intro }: IntroCardProps) {
  return (
    <Card>
      <View style={{ gap: spacing.sm }}>
        {intro.label && (
          <Text style={[typography.caption, { textTransform: 'uppercase', letterSpacing: 1 }]}>
            {intro.label}
          </Text>
        )}
        <Text style={[typography.title, { color: colors.text }]}>{intro.name}</Text>
        {(intro.age || intro.location) && (
          <Text style={[typography.caption, { color: colors.mutedText }]}>
            {[intro.age && `${intro.age}`, intro.location].filter(Boolean).join(' · ')}
          </Text>
        )}
        {intro.bio && (
          <Text style={[typography.body, { color: colors.text, marginTop: spacing.xs }]}>
            {intro.bio}
          </Text>
        )}
        {intro.tags && intro.tags.length > 0 && (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs, marginTop: spacing.sm }}>
            {intro.tags.map((tag) => (
              <View
                key={tag}
                style={{
                  backgroundColor: colors.surfaceElevated,
                  paddingHorizontal: spacing.md,
                  paddingVertical: spacing.xs,
                  borderRadius: 999,
                }}>
                <Text style={[typography.caption, { color: colors.text }]}>{tag}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </Card>
  );
}
