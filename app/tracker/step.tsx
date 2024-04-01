import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import BackButton from "@/components/BackButton";

export default function StepScreen() {
  return (
    <View style={styles.container}>
      <BackButton name="Dashboard" destination="/user/(tabs)/"></BackButton>
      <Text>Step tracker screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
