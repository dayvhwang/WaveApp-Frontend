import { Text, View } from 'react-native';

import { colors, radius, spacing } from '@/src/theme/tokens';
import { typography } from '@/src/theme/typography';

interface ChatBubbleProps {
  text: string;
  isGuide: boolean;
}

const USER_BUBBLE_BG = '#eeeeee';

export function ChatBubble({ text, isGuide }: ChatBubbleProps) {
  if (isGuide) {
    // Guide: plain text, no bubble (ChatGPT-style)
    return (
      <View style={{ alignSelf: 'flex-start', maxWidth: '85%' }}>
        <Text style={[typography.body, { color: colors.text }]}>{text}</Text>
      </View>
    );
  }

  // User: light grey bubble
  return (
    <View style={{ alignSelf: 'flex-end', maxWidth: '80%' }}>
      <View
        style={{
          backgroundColor: USER_BUBBLE_BG,
          borderRadius: radius.lg,
          paddingHorizontal: spacing.lg,
          paddingVertical: spacing.md,
        }}>
        <Text style={[typography.body, { color: colors.text }]}>{text}</Text>
      </View>
    </View>
  );
}
