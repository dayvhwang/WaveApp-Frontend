import React, { createContext, useContext, useState, useCallback } from 'react';

type AppScreen = 'onboarding' | 'signup' | 'login' | 'app';

interface AppContextType {
  screen: AppScreen;
  setScreen: (screen: AppScreen) => void;
  completeOnboarding: () => void;
  completeSignUp: () => void;
  goToLogin: () => void;
  goToSignUp: () => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [screen, setScreen] = useState<AppScreen>('onboarding');

  const completeOnboarding = useCallback(() => {
    setScreen('signup');
  }, []);

  const completeSignUp = useCallback(() => {
    setScreen('app');
  }, []);

  const goToLogin = useCallback(() => {
    setScreen('login');
  }, []);

  const goToSignUp = useCallback(() => {
    setScreen('signup');
  }, []);

  const logout = useCallback(() => {
    setScreen('onboarding');
  }, []);

  return (
    <AppContext.Provider
      value={{
        screen,
        setScreen,
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
