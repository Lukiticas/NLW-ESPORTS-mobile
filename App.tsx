import { Background } from "./src/components/Background";
import { StatusBar } from "react-native";
import { useFonts } from "expo-font";
import { Loading } from "./src/components/Loading";
import { Routes } from "./src/routes";
import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from "@expo-google-fonts/inter";

export default function App() {
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
