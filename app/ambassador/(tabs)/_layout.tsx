import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { StyleSheet } from "react-native";

import Colors from "@/lib/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopColor: "transparent",
          backgroundColor:
            colorScheme === "light"
              ? Colors.light.tabBarBackground
              : Colors.dark.tabBarBackground,
        },
        tabBarActiveTintColor:
          colorScheme === "light"
            ? Colors.light.tabIconSelected
            : Colors.dark.tabIconSelected,
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
