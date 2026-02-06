import { Text, View } from 'react-native';

import { Card } from './Card';
import { colors, spacing } from '@/src/theme/tokens';
import { typography } from '@/src/theme/typography';
import type { Group } from '@/src/types';

interface GroupCardProps {
  group: Group;
}

export function GroupCard({ group }: GroupCardProps) {
  return (
    <Card>
      <View style={{ gap: spacing.sm }}>
        <Text style={[typography.title, { color: colors.text }]}>{group.title}</Text>
        {group.subtitle && (
          <Text style={[typography.caption, { color: colors.mutedText }]}>{group.subtitle}</Text>
        )}
        {group.description && (
          <Text style={[typography.body, { color: colors.text, marginTop: spacing.xs }]}>
            {group.description}
          </Text>
        )}
        {group.memberCount != null && (
          <Text style={[typography.caption, { color: colors.mutedText, marginTop: spacing.xs }]}>
            {group.memberCount} members
          </Text>
        )}
      </View>
    </Card>
  );
}
