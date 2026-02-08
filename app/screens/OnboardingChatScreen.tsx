import { Ionicons } from '@expo/vector-icons';
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
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { ChatBubble, getWordRevealDuration } from '@/components/onboarding/ChatBubble';
import { OnboardingInputBar } from '@/components/onboarding/OnboardingInputBar';
import { SuggestedAnswerButton } from '@/components/onboarding/SuggestedAnswerButton';
import { TypingIndicator } from '@/components/onboarding/TypingIndicator';
import { WaveLogo } from '@/components/WaveLogo';
import { useApp } from '@/src/context/AppContext';
import { onboardingSteps } from '@/src/onboarding/flow';
import { colors, spacing } from '@/src/theme/tokens';
import { typography } from '@/src/theme/typography';

interface Message {
  id: string;
  type: 'guide' | 'user';
  text: string;
  animateWords?: boolean;
}

const TYPING_DELAY_MS = 1300;

const HEADER_HEIGHT = 56;
const SUGGESTIONS_ANIM_DURATION = 260;

function SuggestionsSection({
  suggestedAnswers,
  collapsed,
  onToggleCollapsed,
  onSuggestedPress,
}: {
  suggestedAnswers: string[];
  collapsed: boolean;
  onToggleCollapsed: () => void;
  onSuggestedPress: (ans: string) => void;
}) {
  const collapseProgress = useSharedValue(collapsed ? 1 : 0);

  useEffect(() => {
    collapseProgress.value = withTiming(collapsed ? 1 : 0, {
      duration: SUGGESTIONS_ANIM_DURATION,
      easing: Easing.out(Easing.cubic),
    });
  }, [collapsed, collapseProgress]);

  const animatedListStyle = useAnimatedStyle(() => ({
    opacity: interpolate(collapseProgress.value, [0, 1], [1, 0]),
    maxHeight: interpolate(collapseProgress.value, [0, 1], [120, 0]),
    overflow: 'hidden' as const,
  }));

  return (
    <View>
      <Pressable
        onPress={onToggleCollapsed}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: spacing.sm,
          marginHorizontal: -spacing.lg,
          paddingHorizontal: spacing.lg,
        }}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
        <Text style={[typography.caption, { color: colors.mutedText, fontSize: 11 }]}>
          Suggestions
        </Text>
        <View
          style={{
            width: 28,
            height: 28,
            borderRadius: 14,
            backgroundColor: colors.surfaceElevated,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Ionicons
            name={collapsed ? 'chevron-down' : 'chevron-up'}
            size={18}
            color={colors.mutedText}
          />
        </View>
      </Pressable>
      <Animated.View style={animatedListStyle}>
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
                onPress={() => onSuggestedPress(ans)}
                index={idx}
              />
            </View>
          ))}
        </ScrollView>
      </Animated.View>
    </View>
  );
}

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
  const { completeOnboarding, goToLogin, onboardingProgress, saveOnboardingProgress } = useApp();
  const inputRef = useRef<TextInput>(null);
  const scrollRef = useRef<ScrollView>(null);
  const [messages, setMessages] = useState<Message[]>(() => onboardingProgress.messages);
  const [currentStepIndex, setCurrentStepIndex] = useState(() => onboardingProgress.currentStepIndex);
  const [inputValue, setInputValue] = useState('');
  const [showContinue, setShowContinue] = useState(() => onboardingProgress.showContinue);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuggestedAnswers, setShowSuggestedAnswers] = useState(() => onboardingProgress.showSuggestedAnswers);
  const [suggestedAnswersCollapsed, setSuggestedAnswersCollapsed] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [initialMessageCount] = useState(() => onboardingProgress.messages.length);
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
    setSuggestedAnswersCollapsed(false);

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    if (suggestedAnswersTimeoutRef.current) clearTimeout(suggestedAnswersTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      setIsGenerating(false);
      addMessage('guide', nextStep.guideMessage, true);
      setShowContinue(nextStep.isOutcome ?? false);
      typingTimeoutRef.current = null;

      if ((nextStep.suggestedAnswers?.length ?? 0) > 0) {
        const revealDuration = getWordRevealDuration(nextStep.guideMessage);
        suggestedAnswersTimeoutRef.current = setTimeout(() => {
          setShowSuggestedAnswers(true);
          suggestedAnswersTimeoutRef.current = null;
        }, revealDuration);
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

  // Persist progress when user navigates to login/signup and back (skip during typing)
  useEffect(() => {
    if (!isGenerating) {
      saveOnboardingProgress({
        messages,
        currentStepIndex,
        showContinue,
        showSuggestedAnswers,
      });
    }
  }, [messages, currentStepIndex, showContinue, showSuggestedAnswers, isGenerating, saveOnboardingProgress]);

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
                spacing.lg +
                (suggestedAnswers.length > 0 && !isGenerating && showSuggestedAnswers
                  ? 4
                  : 0),
              gap: spacing.lg,
            }}
            onContentSizeChange={scrollToEndDebounced}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="none">
            {messages.map((msg, index) => (
              <ChatBubble
                key={msg.id}
                text={msg.text}
                isGuide={msg.type === 'guide'}
                animateWords={msg.animateWords}
                entrance={index >= initialMessageCount ? 'slideIn' : undefined}
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
              paddingTop: spacing.sm,
              backgroundColor: '#ffffff',
            }}>
            {showContinue ? (
              <AnimatedContinueButton onPress={handleContinue} />
            ) : (
              <>
                {suggestedAnswers.length > 0 && !isGenerating && showSuggestedAnswers && (
                  <SuggestionsSection
                  suggestedAnswers={suggestedAnswers}
                  collapsed={suggestedAnswersCollapsed}
                  onToggleCollapsed={() => setSuggestedAnswersCollapsed((c) => !c)}
                  onSuggestedPress={handleSuggestedPress}
                  />
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
