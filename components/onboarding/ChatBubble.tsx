import { useEffect } from 'react';
import { Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import { colors, radius, spacing } from '@/src/theme/tokens';
import { typography } from '@/src/theme/typography';

const USER_BUBBLE_BG = '#eeeeee';
const WORD_DELAY_MS = 35;
const WORD_DURATION_MS = 180;
const ENTRANCE_DURATION_MS = 300;

/** Returns ms until the full word-by-word reveal animation completes for the given text */
export function getWordRevealDuration(text: string): number {
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  return Math.max(0, (wordCount - 1) * WORD_DELAY_MS + WORD_DURATION_MS);
}

function AnimatedTextReveal({
  text,
  style,
}: {
  text: string;
  style: object;
}) {
  const words = text.split(/(\s+)/).filter(Boolean);

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {words.map((word, index) => (
        <AnimatedWord key={index} word={word} index={index} style={style} />
      ))}
    </View>
  );
}

function AnimatedWord({
  word,
  index,
  style,
}: {
  word: string;
  index: number;
  style: object;
}) {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(
      index * WORD_DELAY_MS,
      withTiming(1, {
        duration: WORD_DURATION_MS,
        easing: Easing.out(Easing.cubic),
      })
    );
  }, [index, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[animatedStyle, { flexDirection: 'row' }]}>
      <Text style={style}>{word}</Text>
    </Animated.View>
  );
}

interface ChatBubbleProps {
  text: string;
  isGuide: boolean;
  animateWords?: boolean;
  entrance?: 'slideIn';
}

export function ChatBubble({
  text,
  isGuide,
  animateWords = false,
  entrance,
}: ChatBubbleProps) {
  const translateX = useSharedValue(entrance ? (isGuide ? 20 : -20) : 0);
  const translateY = useSharedValue(entrance ? 10 : 0);
  const opacity = useSharedValue(entrance ? 0 : 1);

  useEffect(() => {
    if (entrance) {
      translateX.value = withTiming(0, {
        duration: ENTRANCE_DURATION_MS,
        easing: Easing.out(Easing.cubic),
      });
      translateY.value = withTiming(0, {
        duration: ENTRANCE_DURATION_MS,
        easing: Easing.out(Easing.cubic),
      });
      opacity.value = withTiming(1, {
        duration: ENTRANCE_DURATION_MS,
        easing: Easing.out(Easing.cubic),
      });
    }
  }, [entrance, isGuide, translateX, translateY, opacity]);

  const entranceStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
    opacity: opacity.value,
  }));

  const textStyle = [typography.body, { color: colors.text }];

  if (isGuide) {
    return (
      <Animated.View
        style={[
          { alignSelf: 'flex-start', maxWidth: '85%' },
          entrance && entranceStyle,
        ]}>
        {animateWords ? (
          <AnimatedTextReveal text={text} style={textStyle} />
        ) : (
          <Text style={textStyle}>{text}</Text>
        )}
      </Animated.View>
    );
  }

  return (
    <Animated.View
      style={[
        { alignSelf: 'flex-end', maxWidth: '80%' },
        entrance && entranceStyle,
      ]}>
      <View
        style={{
          backgroundColor: USER_BUBBLE_BG,
          borderRadius: radius.lg,
          paddingHorizontal: spacing.lg,
          paddingVertical: spacing.md,
        }}>
        <Text style={textStyle}>{text}</Text>
      </View>
    </Animated.View>
  );
}
