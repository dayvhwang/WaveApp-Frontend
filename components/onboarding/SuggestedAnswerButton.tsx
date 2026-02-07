import { useEffect } from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import { colors, radius, spacing } from '@/src/theme/tokens';
import { typography } from '@/src/theme/typography';

interface SuggestedAnswerButtonProps {
  label: string;
  onPress: () => void;
  index?: number;
}

export function SuggestedAnswerButton({
  label,
  onPress,
  index = 0,
}: SuggestedAnswerButtonProps) {
  const translateY = useSharedValue(12);
  const opacity = useSharedValue(0);

  useEffect(() => {
    const delay = index * 60;
    translateY.value = withDelay(
      delay,
      withTiming(0, {
        duration: 280,
        easing: Easing.out(Easing.cubic),
      })
    );
    opacity.value = withDelay(
      delay,
      withTiming(1, {
        duration: 280,
        easing: Easing.out(Easing.cubic),
      })
    );
  }, [index, translateY, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={animatedStyle}>
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
    </Animated.View>
  );
}
