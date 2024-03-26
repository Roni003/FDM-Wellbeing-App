import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { StyleSheet } from "react-native";

import Colors from "@/lib/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const tabStyle = colorScheme === "light" ? styles.lightTab : styles.darkTab;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: tabStyle,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Forum",
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name="forum"
              style={{ marginBottom: -3 }}
              size={28}
              color={color}
            />
          ),
          // Generates a clickable icon on the top right of the page
          /* headerRight: () => (
            <Link href="/abc" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ), */
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome5
              name="user-circle"
              style={{ marginBottom: -3 }}
              size={28}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  lightTab: {},
  darkTab: {
    backgroundColor: Colors.tabColors.dark,
  },
});
