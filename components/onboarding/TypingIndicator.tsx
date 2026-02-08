import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  Easing,
  FadeOutUp,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { colors } from '@/src/theme/tokens';

const TYPING_EXIT = FadeOutUp.duration(380).easing(Easing.out(Easing.cubic));

const DOT_SIZE = 5;
const DOT_GAP = 4;

export function TypingIndicator() {
  const dot1 = useSharedValue(0);
  const dot2 = useSharedValue(0);
  const dot3 = useSharedValue(0);

  useEffect(() => {
    const easing = Easing.bezier(0.4, 0, 0.2, 1);
    const bounce = withRepeat(
      withTiming(1, { duration: 400, easing }),
      -1,
      true
    );
    dot1.value = withDelay(0, bounce);
    dot2.value = withDelay(120, bounce);
    dot3.value = withDelay(240, bounce);
  }, [dot1, dot2, dot3]);

  const animatedDot1 = useAnimatedStyle(() => ({
    transform: [{ translateY: dot1.value * -4 }],
    opacity: 0.5 + dot1.value * 0.5,
  }));

  const animatedDot2 = useAnimatedStyle(() => ({
    transform: [{ translateY: dot2.value * -4 }],
    opacity: 0.5 + dot2.value * 0.5,
  }));

  const animatedDot3 = useAnimatedStyle(() => ({
    transform: [{ translateY: dot3.value * -4 }],
    opacity: 0.5 + dot3.value * 0.5,
  }));

  return (
    <Animated.View
      exiting={TYPING_EXIT}
      style={{ alignSelf: 'flex-start', maxWidth: '85%' }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: DOT_GAP,
          paddingVertical: 2,
        }}>
        <Animated.View
          style={[
            {
              width: DOT_SIZE,
              height: DOT_SIZE,
              borderRadius: DOT_SIZE / 2,
              backgroundColor: colors.mutedText,
            },
            animatedDot1,
          ]}
        />
        <Animated.View
          style={[
            {
              width: DOT_SIZE,
              height: DOT_SIZE,
              borderRadius: DOT_SIZE / 2,
              backgroundColor: colors.mutedText,
            },
            animatedDot2,
          ]}
        />
        <Animated.View
          style={[
            {
              width: DOT_SIZE,
              height: DOT_SIZE,
              borderRadius: DOT_SIZE / 2,
              backgroundColor: colors.mutedText,
            },
            animatedDot3,
          ]}
        />
      </View>
    </Animated.View>
  );
}
