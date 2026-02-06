import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Card } from './Card';
import { colors, spacing } from '@/src/theme/tokens';
import { typography } from '@/src/theme/typography';
import type { Personality } from '@/src/types';

interface PersonalityBadgeProps {
  personality: Personality;
}

export function PersonalityBadge({ personality }: PersonalityBadgeProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card>
      <View style={{ gap: spacing.md }}>
        <Text style={[typography.title, { color: colors.text }]}>{personality.archetypeName}</Text>
        <Text style={[typography.body, { color: colors.mutedText }]}>{personality.reasoning}</Text>
        <Pressable
          onPress={() => setExpanded(!expanded)}
          style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
          <Text style={[typography.bodyBold, { color: colors.primary }]}>
            {expanded ? 'Hide full identity' : 'View full identity'}
          </Text>
          <Ionicons
            name={expanded ? 'chevron-up' : 'chevron-down'}
            size={18}
            color={colors.primary}
          />
        </Pressable>
        {expanded && (
          <View style={{ marginTop: spacing.md, gap: spacing.sm }}>
            {personality.traits.map((trait) => (
              <View
                key={trait.name}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={[typography.body, { color: colors.text }]}>{trait.name}</Text>
                <View
                  style={{
                    flex: 1,
                    height: 8,
                    backgroundColor: colors.surfaceElevated,
                    borderRadius: 4,
                    marginHorizontal: spacing.md,
                    overflow: 'hidden',
                  }}>
                  <View
                    style={{
                      width: `${trait.score}%`,
                      height: '100%',
                      backgroundColor: colors.brandBlack,
                      borderRadius: 4,
                    }}
                  />
                </View>
                <Text style={[typography.caption, { color: colors.mutedText, minWidth: 32 }]}>
                  {trait.score}%
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </Card>
  );
}
