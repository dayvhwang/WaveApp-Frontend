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

import { WaveLogo } from '@/components/WaveLogo';
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.surface }} edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, paddingHorizontal: spacing.xl, paddingTop: spacing.xxxl }}>
        <View style={{ alignItems: 'center', marginBottom: spacing.xxl }}>
          <WaveLogo size="lg" showWordmark={false} />
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

        <Pressable
          onPress={() => {
            setScreen('signup');
            router.replace('/signup');
          }}
          style={{ marginTop: spacing.xl, alignItems: 'center' }}>
          <Text style={[typography.body, { color: colors.mutedText }]}>
            Don't have an account? <Text style={{ color: colors.primary, fontWeight: '600' }}>Sign up</Text>
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
