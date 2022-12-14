import { Background } from "./src/components/Background";
import { StatusBar } from "react-native";
import { useFonts } from "expo-font";
import { Loading } from "./src/components/Loading";
import { Routes } from "./src/routes";
import { Subscription } from "expo-modules-core";
import { useRef, useEffect } from "react";
import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from "@expo-google-fonts/inter";

import "./src/services/notificationConfig";
import getPushNotificationToken from "./src/services/getPushNotificationToken";
import * as Notifications from "expo-notifications";

export default function App() {
  const getNotificationListener = useRef<Subscription>();
  const responseNotificationListener = useRef<Subscription>();

  useEffect(() => {
    getPushNotificationToken();
  }, []);

  useEffect(() => {
    getNotificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log(notification);
      }
    );
    getNotificationListener.current = Notifications.addNotificationResponseReceivedListener(
      (notification) => {
        console.log(notification);
      }
    );

    return () => {
      if (
        getNotificationListener.current &&
        responseNotificationListener.current
      ) {
        Notifications.removeNotificationSubscription(
          getNotificationListener.current
        );
        Notifications.removeNotificationSubscription(
          responseNotificationListener.current
        );
      }
    };
  }, []);

  const [isFontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  });
  return (
    <Background>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {isFontsLoaded ? <Routes /> : <Loading />}
    </Background>
  );
}
