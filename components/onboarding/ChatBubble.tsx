import { Text, View } from 'react-native';

import { colors, radius, spacing } from '@/src/theme/tokens';
import { typography } from '@/src/theme/typography';

interface ChatBubbleProps {
  text: string;
  isGuide: boolean;
}

export function ChatBubble({ text, isGuide }: ChatBubbleProps) {
  return (
    <View
      style={{
        alignSelf: isGuide ? 'flex-start' : 'flex-end',
        maxWidth: '80%',
      }}>
      <View
        style={{
          backgroundColor: isGuide ? colors.chatBubbleGuide : colors.chatBubbleUser,
          borderWidth: isGuide ? 0 : 1,
          borderColor: colors.chatBubbleUserBorder,
          borderRadius: radius.lg,
          paddingHorizontal: spacing.lg,
          paddingVertical: spacing.md,
          borderTopLeftRadius: isGuide ? 4 : radius.lg,
          borderTopRightRadius: isGuide ? radius.lg : 4,
        }}>
        <Text
          style={[
            typography.body,
            {
              color: colors.text,
            },
          ]}>
          {text}
        </Text>
      </View>
    </View>
  );
}
