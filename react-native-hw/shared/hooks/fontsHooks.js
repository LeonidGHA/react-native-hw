import { useCallback, useState, useEffect } from "react";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const FontsHooks = () => {
  const [fontsLoaded, setfontsLoaded] = useState(false);
  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          "Roboto-Regular": require("../fonts/Roboto-Regular.ttf"),
          "Roboto-Medium": require("../fonts/Roboto-Medium.ttf"),
          "Roboto-Bold": require("../fonts/Roboto-Bold.ttf"),
          "SFPro-Light": require("../fonts/SFProDisplay-Light.ttf"),
          "SFPro-Regular": require("../fonts/SFProDisplay-Regular.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setfontsLoaded(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return { fontsLoaded, onLayoutRootView };
};

export default FontsHooks;
