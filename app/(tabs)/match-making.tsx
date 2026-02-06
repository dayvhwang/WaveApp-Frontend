import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { GroupCard } from '@/components/GroupCard';
import { IntroCard } from '@/components/IntroCard';
import { WaveLogo } from '@/components/WaveLogo';
import { mockGroups, mockIntros } from '@/src/data/mock';
import { colors, spacing } from '@/src/theme/tokens';
import { typography } from '@/src/theme/typography';

type Mode = '1:1' | 'Group';

export default function MatchMakingScreen() {
  const [mode, setMode] = useState<Mode>('1:1');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F9FAFB' }} edges={['top']}>
      <View style={{ paddingHorizontal: spacing.lg, paddingVertical: spacing.lg }}>
        <WaveLogo size="sm" showIcon={false} />
      </View>

      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: spacing.lg,
          marginBottom: spacing.lg,
          gap: spacing.sm,
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            backgroundColor: colors.surfaceElevated,
            borderRadius: 999,
            padding: 4,
          }}>
          {(['1:1', 'Group'] as const).map((m) => (
            <Pressable
              key={m}
              onPress={() => setMode(m)}
              style={{
                flex: 1,
                paddingVertical: spacing.sm,
                borderRadius: 999,
                backgroundColor: mode === m ? colors.brandBlack : 'transparent',
                alignItems: 'center',
              }}>
              <Text
                style={[
                  typography.bodyBold,
                  { color: mode === m ? colors.surface : colors.mutedText },
                ]}>
                {m}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xxxl }}
        style={{ flex: 1 }}>
        {mode === '1:1' ? (
          <View style={{ gap: spacing.lg }}>
            {mockIntros.map((intro) => (
              <IntroCard key={intro.id} intro={intro} />
            ))}
          </View>
        ) : (
          <View style={{ gap: spacing.lg }}>
            {mockGroups.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
