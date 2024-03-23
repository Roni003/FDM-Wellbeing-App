import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { Link } from "expo-router";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text>Dashboard page</Text>
      <Link href="/">
        <Text>Link back to login page</Text>
      </Link>
      <Link href="/tracker/step">
        <Text>Link to step tracker page</Text>
      </Link>
      <Link href="/tracker/fitness">
        <Text>Link to fitness tracker page</Text>
      </Link>
      <Link href="/tracker/meditation">
        <Text>Link to meditiation tracker page</Text>
      </Link>
      <Link href="/tracker/sleep">
        <Text>Link to sleep tracker page</Text>
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
});
