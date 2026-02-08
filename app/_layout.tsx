import { Hubballi_400Regular } from '@expo-google-fonts/hubballi';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { AppProvider } from '@/src/context/AppContext';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Hubballi_400Regular,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    onLayoutRootView();
  }, [onLayoutRootView]);

  if (!fontsLoaded && !fontError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#111111" />
      </View>
    );
  }

  return (
    <AppProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}>
        <Stack.Screen name="index" />
        <Stack.Screen
          name="onboarding"
          options={({ route }) => ({
            animation: (route.params as { direction?: string })?.direction === 'back' ? 'slide_from_left' : 'slide_from_right',
          })}
        />
        <Stack.Screen
          name="login"
          options={({ route }) => ({
            animation: (route.params as { direction?: string })?.direction === 'back' ? 'slide_from_left' : 'slide_from_right',
          })}
        />
        <Stack.Screen
          name="signup"
          options={({ route }) => ({
            animation: (route.params as { direction?: string })?.direction === 'back' ? 'slide_from_left' : 'slide_from_right',
          })}
        />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
      <StatusBar style="dark" />
    </AppProvider>
  );
}
