import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";

import '../globals.css';



export default function RootLayout() {
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
}
