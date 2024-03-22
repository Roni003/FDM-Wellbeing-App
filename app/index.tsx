import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { Link, router } from "expo-router";

export default function Entry() {
  // When user loads in, if authentiacted, get role from db

  // If role == fdm
  // router.replace(/(tabs)/)

  // If role == ambassador
  // router.replace(*path to ambassador home page)

  // this will be login page, user stays here if theyre not authed,
  // then gets redirected to home page after login

  return (
    <View style={styles.container}>
      <Text>INDEX page</Text>
      <Link replace href="/(tabs)/">
        <Text>Link</Text>
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
