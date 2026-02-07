import { useRouter } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { ChatBubble } from '@/components/onboarding/ChatBubble';
import { OnboardingInputBar } from '@/components/onboarding/OnboardingInputBar';
import { SuggestedAnswerButton } from '@/components/onboarding/SuggestedAnswerButton';
import { TypingIndicator } from '@/components/onboarding/TypingIndicator';
import { WaveLogo } from '@/components/WaveLogo';
import { useApp } from '@/src/context/AppContext';
import { onboardingSteps } from '@/src/onboarding/flow';
import { spacing } from '@/src/theme/tokens';
import { typography } from '@/src/theme/typography';

interface Message {
  id: string;
  type: 'guide' | 'user';
  text: string;
  animateWords?: boolean;
}

const TYPING_DELAY_MS = 1300;
const SUGGESTED_ANSWERS_DELAY_MS = 500;

const HEADER_HEIGHT = 56;

function AnimatedContinueButton({ onPress }: { onPress: () => void }) {
  const scale = useSharedValue(0.96);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withTiming(1, {
      duration: 320,
      easing: Easing.out(Easing.cubic),
    });
    opacity.value = withTiming(1, {
      duration: 320,
      easing: Easing.out(Easing.cubic),
    });
  }, [scale, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPress={onPress}
        style={{
          backgroundColor: '#111111',
          paddingVertical: spacing.lg,
          borderRadius: 12,
          alignItems: 'center',
        }}>
        <Text style={[typography.bodyBold, { color: '#ffffff' }]}>Continue</Text>
      </Pressable>
    </Animated.View>
  );
}

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
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuggestedAnswers, setShowSuggestedAnswers] = useState(true);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const suggestedAnswersTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollToEndDebounced = useCallback(() => {
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
      scrollTimeoutRef.current = null;
    }, 150);
  }, []);

  const currentStep = onboardingSteps[currentStepIndex];
  const isOutcome = currentStep?.isOutcome ?? false;
  const suggestedAnswers = currentStep?.suggestedAnswers ?? [];

  const addMessage = (
    type: 'guide' | 'user',
    text: string,
    animateWords?: boolean
  ) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        type,
        text,
        animateWords,
      },
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
    setInputValue('');

    setIsGenerating(true);
    setShowSuggestedAnswers(false);

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    if (suggestedAnswersTimeoutRef.current) clearTimeout(suggestedAnswersTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      setIsGenerating(false);
      addMessage('guide', nextStep.guideMessage, true);
      setShowContinue(nextStep.isOutcome ?? false);
      typingTimeoutRef.current = null;

      if ((nextStep.suggestedAnswers?.length ?? 0) > 0) {
        suggestedAnswersTimeoutRef.current = setTimeout(() => {
          setShowSuggestedAnswers(true);
          suggestedAnswersTimeoutRef.current = null;
        }, SUGGESTED_ANSWERS_DELAY_MS);
      } else {
        setShowSuggestedAnswers(true);
      }
    }, TYPING_DELAY_MS);
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

  useEffect(() => {
    const showSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => setKeyboardVisible(true),
    );
    const hideSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => setKeyboardVisible(false),
    );
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      if (suggestedAnswersTimeoutRef.current) clearTimeout(suggestedAnswersTimeoutRef.current);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }} edges={['top']}>
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
            <Text style={[typography.bodyBold, { color: '#111111' }]}>Log in</Text>
          </Pressable>
        </View>

        {/* Chat area */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === 'ios' ? insets.top + HEADER_HEIGHT - 16 : 0}>
          <ScrollView
            ref={scrollRef}
            contentContainerStyle={{
              padding: spacing.lg,
              paddingBottom:
                spacing.xxl +
                (suggestedAnswers.length > 0 && !isGenerating && showSuggestedAnswers
                  ? 52
                  : 0),
              gap: spacing.md,
            }}
            onContentSizeChange={scrollToEndDebounced}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="none">
            {messages.map((msg) => (
              <ChatBubble
                key={msg.id}
                text={msg.text}
                isGuide={msg.type === 'guide'}
                animateWords={msg.animateWords}
                entrance="slideIn"
              />
            ))}
            {isGenerating && <TypingIndicator />}
          </ScrollView>

          {/* Suggested answers or input bar */}
          <View
            style={{
              paddingHorizontal: spacing.lg,
              paddingBottom: keyboardVisible ? 0 : Math.max(insets.bottom, spacing.sm),
              marginBottom: keyboardVisible ? -26 : 0,
              gap: spacing.md,
              borderTopWidth: 1,
              borderTopColor: '#E5E7EB',
              paddingTop: spacing.md,
              backgroundColor: '#ffffff',
            }}>
            {showContinue ? (
              <AnimatedContinueButton onPress={handleContinue} />
            ) : (
              <>
                {suggestedAnswers.length > 0 && !isGenerating && showSuggestedAnswers && (
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyboardShouldPersistTaps="always"
                    contentContainerStyle={{
                      flexDirection: 'row',
                      gap: spacing.sm,
                      paddingHorizontal: spacing.lg,
                    }}
                    style={{ marginHorizontal: -spacing.lg }}>
                    {suggestedAnswers.map((ans, idx) => (
                      <View key={ans} style={{ flexShrink: 0 }}>
                        <SuggestedAnswerButton
                          label={ans}
                          onPress={() => handleSuggestedPress(ans)}
                          index={idx}
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
