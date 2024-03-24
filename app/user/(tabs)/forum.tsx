import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { Link } from "expo-router";

export default function TabThreeScreen() {
  return (
    <View style={styles.container}>
      <Text>User forum page</Text>
      <Link
        href={{
          pathname: "/forumpost/[postid]",
          params: { postid: "555" },
        }}
      >
        To view individual post
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
