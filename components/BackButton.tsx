import {
  Text,
  View,
  StyleSheet,
  Pressable,
  useColorScheme,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import Colors from "@/lib/Colors";
import { supabase } from "@/lib/Supabase";
import { getClientRoleId } from "@/lib/auth";
import { redirectUser } from "@/lib/redirect";

type BackButtonProps = {
  destination: string;
  name: string;
};

const BackButton = ({ destination, name }: BackButtonProps) => {
  const colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
    },
    pressable: {
      flexDirection: "row",
      alignItems: "center",
    },
    text: {
      fontSize: 16,
      color: colorScheme === "light" ? "rgb(10,132,255)" : Colors.dark.tint,
    },
  });

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => redirectUser(destination)}
        style={styles.pressable}
      >
        <Ionicons
          name="chevron-back"
          size={24}
          color={colorScheme === "light" ? "rgb(10,132,255)" : Colors.dark.tint}
        />
        <Text style={styles.text}>{name}</Text>
      </Pressable>
    </View>
  );
};

export default BackButton;
