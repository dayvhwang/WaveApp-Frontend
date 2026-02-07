import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { ChatBubble } from '@/components/onboarding/ChatBubble';
import { OnboardingInputBar } from '@/components/onboarding/OnboardingInputBar';
import { SuggestedAnswerButton } from '@/components/onboarding/SuggestedAnswerButton';
import { WaveLogo } from '@/components/WaveLogo';
import { useApp } from '@/src/context/AppContext';
import { onboardingSteps } from '@/src/onboarding/flow';
import { spacing } from '@/src/theme/tokens';
import { typography } from '@/src/theme/typography';

interface Message {
  id: string;
  type: 'guide' | 'user';
  text: string;
}

const HEADER_HEIGHT = 56;

export default function OnboardingChatScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { completeOnboarding, goToLogin } = useApp();
  const inputRef = useRef<TextInput>(null);
  const scrollRef = useRef<ScrollView>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [showContinue, setShowContinue] = useState(false);

  const currentStep = onboardingSteps[currentStepIndex];
  const isOutcome = currentStep?.isOutcome ?? false;
  const suggestedAnswers = currentStep?.suggestedAnswers ?? [];

  const addMessage = (type: 'guide' | 'user', text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`, type, text },
    ]);
  };

  const advanceStep = (userResponse?: string) => {
    if (userResponse) {
      addMessage('user', userResponse);
    }

    if (currentStep?.isOutcome) {
      setShowContinue(true);
      return;
    }

    const nextIndex = currentStepIndex + 1;
    if (nextIndex >= onboardingSteps.length) {
      setShowContinue(true);
      return;
    }

    const nextStep = onboardingSteps[nextIndex];
    setCurrentStepIndex(nextIndex);
    addMessage('guide', nextStep.guideMessage);
    setInputValue('');

    if (nextStep.isOutcome) {
      setShowContinue(true);
    }
  };

  const handleSuggestedPress = (answer: string) => {
    advanceStep(answer);
  };

  const handleSubmit = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    advanceStep(trimmed);
    // Keep input focused so user can immediately type the next response
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleContinue = () => {
    completeOnboarding();
    router.replace('/signup');
  };

  useEffect(() => {
    if (messages.length === 0 && currentStep) {
      setMessages([{ id: '0', type: 'guide', text: currentStep.guideMessage }]);
    }
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }} edges={['top']}>
      <View style={{ flex: 1 }}>
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: spacing.lg,
            paddingVertical: spacing.md,
            borderBottomWidth: 1,
            borderBottomColor: '#E5E7EB',
          }}>
          <WaveLogo size="md" showIcon={false} />
          <Pressable
            onPress={() => {
              goToLogin();
              router.replace('/login');
            }}>
            <Text style={[typography.bodyBold, { color: '#111827' }]}>Log in</Text>
          </Pressable>
        </View>

        {/* Chat area */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === 'ios' ? insets.top + HEADER_HEIGHT : 0}>
          <ScrollView
            ref={scrollRef}
            contentContainerStyle={{
              padding: spacing.lg,
              paddingBottom: spacing.xxl,
              gap: spacing.md,
            }}
            onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="none">
            {messages.map((msg) => (
              <ChatBubble key={msg.id} text={msg.text} isGuide={msg.type === 'guide'} />
            ))}
          </ScrollView>

          {/* Suggested answers or input bar */}
          <View
            style={{
              paddingHorizontal: spacing.lg,
              paddingBottom: Math.max(insets.bottom, spacing.sm),
              gap: spacing.md,
              borderTopWidth: 1,
              borderTopColor: '#E5E7EB',
              paddingTop: spacing.md,
              backgroundColor: '#FFF',
            }}>
            {showContinue ? (
              <Pressable
                onPress={handleContinue}
                style={{
                  backgroundColor: '#111827',
                  paddingVertical: spacing.lg,
                  borderRadius: 12,
                  alignItems: 'center',
                }}>
                <Text style={[typography.bodyBold, { color: '#FFF' }]}>Continue</Text>
              </Pressable>
            ) : (
              <>
                {suggestedAnswers.length > 0 && (
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                      flexDirection: 'row',
                      gap: spacing.sm,
                      paddingHorizontal: spacing.lg,
                    }}
                    style={{ marginHorizontal: -spacing.lg }}>
                    {suggestedAnswers.map((ans) => (
                      <View key={ans} style={{ flexShrink: 0 }}>
                        <SuggestedAnswerButton
                          label={ans}
                          onPress={() => handleSuggestedPress(ans)}
                        />
                      </View>
                    ))}
                  </ScrollView>
                )}
                <OnboardingInputBar
                  inputRef={inputRef}
                  value={inputValue}
                  onChangeText={setInputValue}
                  onSubmit={handleSubmit}
                  placeholder="Type a message"
                />
              </>
            )}
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}
