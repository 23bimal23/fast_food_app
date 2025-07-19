import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";

import * as Sentry from '@sentry/react-native';
import '../globals.css';

Sentry.init({
  dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,

  sendDefaultPii: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

  // spotlight: __DEV__,
});



export default Sentry.wrap(function RootLayout() {
  const [fontsLoaded,error]  = useFonts({
    "OuickSand-Bold": require("../assets/fonts/Quicksand-Bold.ttf"),
    "OuickSand-Medium": require("../assets/fonts/Quicksand-Medium.ttf"),
    "OuickSand-Regular": require("../assets/fonts/Quicksand-Regular.ttf"),
    "OuickSand-SemiBold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
    "QuickSand-Light": require("../assets/fonts/Quicksand-Light.ttf"),

  });
  useEffect(() => {
    if (error) {
      console.warn("Error loading fonts:", error);
    }
    if(fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded,error]);


  return <Stack screenOptions={{headerShown:false}} />;
});