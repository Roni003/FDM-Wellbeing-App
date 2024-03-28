import { Text, View, StyleSheet, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";

type BackButtonProps = {
  destination: string;
  name: string;
};

const BackButton = ({ destination, name }: BackButtonProps) => {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => router.push(destination)}
        style={styles.pressable}
      >
        <Ionicons name="chevron-back" size={22} color="rgb(10,132,255)" />
        <Text style={styles.text}>{name}</Text>
      </Pressable>
    </View>
  );
};

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
    fontSize: 14,
    color: "rgb(10, 132, 255)",
  },
});

export default BackButton;
