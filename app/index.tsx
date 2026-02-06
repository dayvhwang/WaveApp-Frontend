import { Redirect } from 'expo-router';

import { useApp } from '@/src/context/AppContext';

export default function Index() {
  const { screen } = useApp();

  if (screen === 'onboarding') {
    return <Redirect href="/onboarding" />;
  }
  if (screen === 'login') {
    return <Redirect href="/login" />;
  }
  if (screen === 'signup') {
    return <Redirect href="/signup" />;
  }

  return <Redirect href="/(tabs)" />;
}
