import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PersonalityBadge } from '@/components/PersonalityBadge';
import { WaveLogo } from '@/components/WaveLogo';
import { mockPersonality } from '@/src/data/mock';
import { colors, spacing } from '@/src/theme/tokens';
import { typography } from '@/src/theme/typography';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }} edges={['top']}>
      <View style={{ paddingHorizontal: spacing.lg, paddingVertical: spacing.lg }}>
        <WaveLogo size="md" showIcon={false} />
      </View>

      <ScrollView
        contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xxxl }}
        style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: spacing.xl,
            gap: spacing.lg,
          }}>
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: colors.surfaceElevated,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: colors.border,
            }}>
            <Text style={[typography.titleLarge, { color: colors.mutedText }]}>JD</Text>
          </View>
          <View>
            <Text style={[typography.title, { color: colors.text }]}>John Doe</Text>
            <Text style={[typography.caption, { color: colors.mutedText }]}>
              john@example.com
            </Text>
          </View>
        </View>

        <PersonalityBadge personality={mockPersonality} />
      </ScrollView>
    </SafeAreaView>
  );
}
