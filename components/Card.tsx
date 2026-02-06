import { View, ViewProps } from 'react-native';

import { colors, radius, spacing } from '@/src/theme/tokens';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  elevated?: boolean;
}

export function Card({ children, elevated, style, ...props }: CardProps) {
  return (
    <View
      style={[
        {
          backgroundColor: elevated ? colors.surfaceElevated : colors.surface,
          borderRadius: radius.md,
          padding: spacing.lg,
          borderWidth: 1,
          borderColor: colors.border,
        },
        style,
      ]}
      {...props}>
      {children}
    </View>
  );
}
