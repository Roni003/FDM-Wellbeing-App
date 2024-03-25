import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { Link } from "expo-router";

import BackButton from "@/components/BackButton";

export default function SleepScreen() {
  return (
    <View style={styles.container}>
      <BackButton destination="/user/(tabs)/" />
      <Text>sleep tracker screen</Text>
      <Link href="/user/(tabs)">
        <Text>Link back to user tabs -for convenience in development</Text>
      </Link>
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
