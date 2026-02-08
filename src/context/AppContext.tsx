import React, { createContext, useContext, useState, useCallback } from 'react';

type AppScreen = 'onboarding' | 'signup' | 'login' | 'app';

/** Where to return when user goes back from login/signup */
export type AuthReturnPath = '/onboarding' | '/login' | '/signup' | '/(tabs)';

/** Persisted onboarding progress — survives navigation to login/signup and back */
export interface OnboardingProgress {
  messages: { id: string; type: 'guide' | 'user'; text: string; animateWords?: boolean }[];
  currentStepIndex: number;
  showContinue: boolean;
  showSuggestedAnswers: boolean;
}

const initialOnboardingProgress: OnboardingProgress = {
  messages: [],
  currentStepIndex: 0,
  showContinue: false,
  showSuggestedAnswers: true,
};

interface AppContextType {
  screen: AppScreen;
  setScreen: (screen: AppScreen) => void;
  authReturnPath: AuthReturnPath | null;
  setAuthReturnPath: (path: AuthReturnPath | null) => void;
  onboardingProgress: OnboardingProgress;
  saveOnboardingProgress: (progress: Partial<OnboardingProgress> | ((prev: OnboardingProgress) => OnboardingProgress)) => void;
  clearOnboardingProgress: () => void;
  completeOnboarding: () => void;
  completeSignUp: () => void;
  goToLogin: (from?: AuthReturnPath) => void;
  goToSignUp: (from?: AuthReturnPath) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [screen, setScreen] = useState<AppScreen>('onboarding');
  const [authReturnPath, setAuthReturnPath] = useState<AuthReturnPath | null>(null);
  const [onboardingProgress, setOnboardingProgress] = useState<OnboardingProgress>(initialOnboardingProgress);

  const saveOnboardingProgress = useCallback((update: Partial<OnboardingProgress> | ((prev: OnboardingProgress) => OnboardingProgress)) => {
    setOnboardingProgress((prev) =>
      typeof update === 'function' ? update(prev) : { ...prev, ...update }
    );
  }, []);

  const clearOnboardingProgress = useCallback(() => {
    setOnboardingProgress(initialOnboardingProgress);
  }, []);

  const completeOnboarding = useCallback(() => {
    setAuthReturnPath('/onboarding');
    setScreen('signup');
  }, []);

  const completeSignUp = useCallback(() => {
    setScreen('app');
  }, []);

  const goToLogin = useCallback((from: AuthReturnPath = '/onboarding') => {
    setAuthReturnPath(from);
    setScreen('login');
  }, []);

  const goToSignUp = useCallback((from: AuthReturnPath = '/login') => {
    setAuthReturnPath(from);
    setScreen('signup');
  }, []);

  const logout = useCallback(() => {
    clearOnboardingProgress();
    setScreen('onboarding');
  }, [clearOnboardingProgress]);

  return (
    <AppContext.Provider
      value={{
        screen,
        setScreen,
        authReturnPath,
        setAuthReturnPath,
        onboardingProgress,
        saveOnboardingProgress,
        clearOnboardingProgress,
        completeOnboarding,
        completeSignUp,
        goToLogin,
        goToSignUp,
        logout,
      }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
