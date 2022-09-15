import { SafeAreaView } from "react-native-safe-area-context";
import { Background } from "../../components/Background";
import { useRoute, useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import { Entypo } from "@expo/vector-icons";
import { GameParams } from "../../@types/navigation";
import { View, TouchableOpacity, Image, FlatList, Text } from "react-native";
import { THEME } from "../../theme";
import logoImg from "../../assets/logo-nlw-esports.png";
import { Heading } from "../../components/Heading";
import { DuoCard, duoCardProps } from "../../components/DuoCard";
import { useEffect, useState } from "react";

export function Game() {
  const [duos, setDuos] = useState<duoCardProps[]>([]);

  const nav = useNavigation();
  const route = useRoute();
  const game = route.params as GameParams;

  const handleGoBack = () => {
    nav.goBack();
  };

  useEffect(() => {
    fetch(`http://192.168.100.2:3333/games/${game.id}/ads`)
      .then((res) => res.json())
      .then((data) => setDuos(data));
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image source={logoImg} style={styles.logo} />
          <View style={styles.right} />
        </View>
        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />
        <Heading title={game.title} subtitle="conecte-se e comece a jogar!" />
        <FlatList
          data={duos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DuoCard data={item} onConnect={() => {}} />
          )}
          horizontal
          contentContainerStyle={
            duos.length > 0 ? styles.contentList : styles.emptyListContent
          }
          showsHorizontalScrollIndicator={false}
          style={styles.containerList}
          ListEmptyComponent={() => {
            return (
              <Text style={styles.emptyComponent}>
                Infelizmente não há players por perto...
              </Text>
            );
          }}
        />
      </SafeAreaView>
    </Background>
  );
}
