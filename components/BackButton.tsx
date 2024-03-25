import { Text, View, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";

type BackButtonProps = {
  destination: string;
};

const BackButton = ({ destination }: BackButtonProps) => {
  return (
    <View style={styles.container}>
      <Ionicons
        style={styles.icon}
        onPress={() => router.navigate(destination)}
        name="arrow-back-outline"
        size={20}
        color="rgb(10,132,255)"
      >
        {/* Need to figure out how to center this text vertically */}
        <Text style={styles.text}>Dashboard</Text>
      </Ionicons>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  icon: {},
  text: {
    fontSize: 14,
  },
});

export default BackButton;
