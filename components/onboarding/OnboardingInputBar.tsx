import { Ionicons } from '@expo/vector-icons';
import { TextInput, View } from 'react-native';

import { colors, radius, spacing } from '@/src/theme/tokens';

interface OnboardingInputBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
}

export function OnboardingInputBar({
  value,
  onChangeText,
  onSubmit,
  placeholder = 'Type a message',
}: OnboardingInputBarProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surface,
        borderRadius: radius.lg,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderWidth: 1,
        borderColor: colors.border,
        gap: spacing.sm,
      }}>
      <View
        style={{
          width: 36,
          height: 36,
          borderRadius: 18,
          backgroundColor: colors.surfaceElevated,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Ionicons name="add" size={22} color={colors.mutedText} />
      </View>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        placeholder={placeholder}
        placeholderTextColor={colors.mutedText}
        style={{
          flex: 1,
          fontSize: 16,
          paddingVertical: spacing.sm,
          color: colors.text,
          fontFamily: 'Inter_400Regular',
        }}
      />
      <View
        style={{
          width: 36,
          height: 36,
          borderRadius: 18,
          backgroundColor: colors.surfaceElevated,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Ionicons name="mic-outline" size={20} color={colors.mutedText} />
      </View>
    </View>
  );
}
