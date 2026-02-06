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

export default function SignUpScreen() {
  const router = useRouter();
  const { completeSignUp, setScreen } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    completeSignUp();
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
            <Text style={[typography.caption, { marginBottom: spacing.sm }]}>Name</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Your name"
              placeholderTextColor={colors.mutedText}
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
            <Text style={[typography.bodyBold, { color: colors.surface }]}>Create account</Text>
          </Pressable>
        </View>

        <Pressable
          onPress={() => {
            setScreen('login');
            router.replace('/login');
          }}
          style={{ marginTop: spacing.xl, alignItems: 'center' }}>
          <Text style={[typography.body, { color: colors.mutedText }]}>
            Already have an account? <Text style={{ color: colors.primary, fontWeight: '600' }}>Log in</Text>
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
