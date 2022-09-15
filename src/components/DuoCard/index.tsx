import { View, TouchableOpacity, Text } from "react-native";
import { THEME } from "../../theme";
import getFirstTwoDigits from "../../utils/getFirstTwoDigits";
import { DuoInfo } from "../DuoInfo";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";

export interface duoCardProps {
  id: string;
  hourEnd: string;
  hourStart: string;
  name: string;
  useVoiceChannel: boolean;
  weekDays: string[];
  yearPlaying: number;
}

interface Props {
  data: duoCardProps;
  onConnect: () => void;
}

export function DuoCard({ data, onConnect }: Props) {
  return (
    <View style={styles.container}>
      <DuoInfo label="nome" value={data.name} />
      <DuoInfo
        label="Tempo de jogo"
        value={`${data.yearPlaying} ano${data.yearPlaying > 1 ? "s" : ""}`}
      />
      <DuoInfo
        label="Disponibilidade"
        value={`${data.weekDays.length} dia${
          data.weekDays.length > 1 ? "s" : ""
        } • ${getFirstTwoDigits(data.hourStart)}h - ${getFirstTwoDigits(
          data.hourEnd
        )}h`}
      />
      <DuoInfo
        label="Chamada de áudio?"
        value={data.useVoiceChannel ? "Sim" : "Não"}
        colorValue={
          data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT
        }
      />

      <TouchableOpacity onPress={onConnect} style={styles.button}>
        <Ionicons
          name="game-controller-outline"
          size={20}
          color={THEME.COLORS.TEXT}
        />
        <Text style={styles.buttonTitle}>Conectar</Text>
      </TouchableOpacity>
    </View>
  );
}
