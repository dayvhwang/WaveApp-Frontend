import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { IntroCard } from '@/components/IntroCard';
import { WaveLogo } from '@/components/WaveLogo';
import { mockIntros } from '@/src/data/mock';
import { spacing } from '@/src/theme/tokens';
import { typography } from '@/src/theme/typography';

export default function DashboardScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F9FAFB' }} edges={['top']}>
      <View style={{ paddingHorizontal: spacing.lg, paddingVertical: spacing.lg }}>
        <WaveLogo size="sm" showIcon={false} />
      </View>
      <ScrollView
        contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xxxl }}
        style={{ flex: 1 }}>
        <Text style={[typography.overline, { marginBottom: spacing.md }]}>
          Today's intros
        </Text>
        <View style={{ gap: spacing.lg }}>
          {mockIntros.map((intro) => (
            <IntroCard key={intro.id} intro={intro} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
