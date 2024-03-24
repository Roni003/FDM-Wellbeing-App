import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { Link, useLocalSearchParams } from "expo-router";

export default function FitnessScreen() {
  const { postid } = useLocalSearchParams();
  console.log(postid);

  return (
    <View style={styles.container}>
      <Text>View forum post, ID: {postid}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 50,
    alignItems: "center",
  },
});
