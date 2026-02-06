import { Pressable, Text } from 'react-native';

import { colors, radius, spacing } from '@/src/theme/tokens';
import { typography } from '@/src/theme/typography';

interface SuggestedAnswerButtonProps {
  label: string;
  onPress: () => void;
}

export function SuggestedAnswerButton({ label, onPress }: SuggestedAnswerButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        backgroundColor: pressed ? colors.surfaceElevated : colors.surface,
        borderRadius: radius.full,
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.md,
        borderWidth: 1,
        borderColor: colors.border,
        opacity: pressed ? 0.9 : 1,
      })}>
      <Text style={[typography.body, { color: colors.text }]}>{label}</Text>
    </Pressable>
  );
}
