import { StyleSheet, Image, Button } from "react-native";

import { Text, View } from "@/components/Themed";
import { Stack } from "expo-router";
import { signOut } from "@/lib/auth";

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text>Ambassador Second page</Text>
      <Button title="sign out (for testing)" onPress={signOut} />

      {/* <Stack.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: "My home",
          // https://reactnavigation.org/docs/headers#adjusting-header-styles
          headerStyle: { backgroundColor: "cyan" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
        }}
      /> */}
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
