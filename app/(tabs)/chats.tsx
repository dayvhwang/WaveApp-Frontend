import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { WaveLogo } from '@/components/WaveLogo';
import { mockChats } from '@/src/data/mock';
import { colors, spacing } from '@/src/theme/tokens';
import { typography } from '@/src/theme/typography';

export default function ChatsScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }} edges={['top']}>
      <View style={{ paddingHorizontal: spacing.lg, paddingVertical: spacing.lg }}>
        <WaveLogo size="sm" showIcon={false} />
      </View>
      <FlatList
        data={mockChats}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: spacing.xxxl }}
        ItemSeparatorComponent={() => (
          <View style={{ height: 1, backgroundColor: colors.border, marginLeft: spacing.xl }} />
        )}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: spacing.lg,
              gap: spacing.md,
            }}>
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: colors.surfaceElevated,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={[typography.title, { color: colors.mutedText }]}>
                {item.name[0]}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[typography.bodyBold, { color: colors.text }]}>{item.name}</Text>
              <Text style={[typography.caption, { color: colors.mutedText }]} numberOfLines={1}>
                {item.preview}
              </Text>
            </View>
            <Text style={[typography.caption, { color: colors.mutedText }]}>{item.time}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
