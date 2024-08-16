import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { TamaguiProvider } from 'tamagui';

import config from '../tamagui.config';
import { SessionProvider } from '~/lib/auth';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from 'react-native';

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
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
          <Stack
            screenOptions={{
              headerShown: false,
            }}>
            {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
            {/* <Stack.Screen name="artisan/workshop/all" options={{ headerShown: true, title: 'Workshop All' }}/> */}
            <Stack.Screen name="artisan/events/all" options={{ headerShown: true, title: 'Workshop Detail' }} />
            {/* <Stack.Screen name="modal" options={{ presentation: 'modal' }} /> */}
            {/* <Stack.Screen name="order/[id]" options={{ headerShown: true, title: 'Individual order' }}/> */}
            {/* <Stack.Screen name="order/index" options={{ headerShown: true, title: 'Individual order' }}/> */}
            <Stack.Screen name="artisan/profile/connectionRequests" options={{ headerShown: true, title: 'Connection' }} />
          </Stack>
        </SessionProvider>
      </ThemeProvider>
    </TamaguiProvider>
  );
}
