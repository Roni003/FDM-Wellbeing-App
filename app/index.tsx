import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { Link, router } from "expo-router";

export default function Entry() {
  // When user loads in, if authentiacted, get role from db

  // If role == fdm
  // router.replace(/user/(tabs))

  // If role == ambassador
  // router.replace(/ambassador/(tabs))

  // this will be login page, user stays here if theyre not authed,
  // then gets redirected to home page after login

  return (
    <View style={styles.container}>
      <Text>INDEX page</Text>
      <Link replace href="/user/(tabs)">
        <Text>Link to user home page</Text>
      </Link>
      <Link replace href="/ambassador/(tabs)">
        <Text>Link to ambassador home page</Text>
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
