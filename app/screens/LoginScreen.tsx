import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { WaveLogoIcon } from '@/components/WaveLogoIcon';
import { useApp } from '@/src/context/AppContext';
import { colors, radius, spacing } from '@/src/theme/tokens';
import { typography } from '@/src/theme/typography';

export default function LoginScreen() {
  const router = useRouter();
  const { setScreen } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    setScreen('app');
    router.replace('/(tabs)');
  };

  const handleBack = () => {
    setScreen('onboarding');
    router.replace({ pathname: '/onboarding', params: { direction: 'back' } });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.surface }} edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, paddingHorizontal: spacing.xl, paddingTop: 24 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.lg }}>
          <Pressable
            onPress={handleBack}
            style={({ pressed }) => ({
              width: 40,
              height: 40,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: pressed ? colors.surfaceElevated : 'transparent',
            })}
            accessibilityLabel="Go back"
            accessibilityRole="button">
            <Ionicons name="chevron-back" size={28} color={colors.text} />
          </Pressable>
        </View>
        <View style={{ alignItems: 'center', marginBottom: spacing.xxl }}>
          <WaveLogoIcon width={40 * (387 / 231)} height={40} color="#111111" />
        </View>

        <View style={{ gap: spacing.lg }}>
          <View>
            <Text style={[typography.caption, { marginBottom: spacing.sm }]}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              placeholderTextColor={colors.mutedText}
              keyboardType="email-address"
              autoCapitalize="none"
              style={{
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: radius.sm,
                padding: spacing.lg,
                fontSize: 16,
                fontFamily: 'Hubballi_400Regular',
                letterSpacing: -0.4,
                color: colors.text,
              }}
            />
          </View>
          <View>
            <Text style={[typography.caption, { marginBottom: spacing.sm }]}>Password</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              placeholderTextColor={colors.mutedText}
              secureTextEntry
              style={{
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: radius.sm,
                padding: spacing.lg,
                fontSize: 16,
                fontFamily: 'Hubballi_400Regular',
                letterSpacing: -0.4,
                color: colors.text,
              }}
            />
          </View>
          <Pressable
            onPress={handleSubmit}
            style={{
              backgroundColor: colors.brandBlack,
              paddingVertical: spacing.lg,
              borderRadius: radius.sm,
              alignItems: 'center',
              marginTop: spacing.md,
            }}>
            <Text style={[typography.bodyBold, { color: colors.surface }]}>Log in</Text>
          </Pressable>
        </View>

        <View style={{ marginTop: spacing.xl, alignItems: 'center' }}>
          <Text style={[typography.body, { color: colors.mutedText, textAlign: 'center' }]}>
            To create an account, go back and finish onboarding first.
          </Text>
          <Pressable onPress={handleBack} style={{ marginTop: spacing.sm }}>
            <Text style={[typography.bodyBold, { color: colors.primary }]}>Go back to onboarding</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
