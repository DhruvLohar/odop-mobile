import { useFonts } from 'expo-font';
import { SplashScreen, Stack, useRouter, useSegments } from 'expo-router';
import React, { ReactNode, useEffect } from 'react';
import { TamaguiProvider } from 'tamagui';

import config from '../tamagui.config';
import { SessionProvider, useSession } from '~/lib/auth';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { CartProvider } from './context/CartContext';

SplashScreen.preventAutoHideAsync();

function StackLayout() {
  const { session } = useSession();

  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const accessingProtectedRoutes = segments[0] === '(protected)';

    if (!session && accessingProtectedRoutes) {
      router.replace('/auth/onboarding');
    }

    if (session && !accessingProtectedRoutes) {
      router.replace('/(protected)/(tabs)/');
    }
  }, [segments, session]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="(protected)" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <TamaguiProvider config={config}>
      <ThemeProvider value={DarkTheme}>
        <SessionProvider>
          <CartProvider>
            <StackLayout />
          </CartProvider>
        </SessionProvider>
      </ThemeProvider>
    </TamaguiProvider>
  );
}
