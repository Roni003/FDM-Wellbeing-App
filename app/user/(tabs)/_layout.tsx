import React, { useEffect, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { FontAwesome5 } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/lib/Colors";
import { color } from "react-native-elements/dist/helpers";

export default function TabLayout() {
  const [render, setRender] = useState(0);
  const colorScheme = useColorScheme();

  useEffect(() => {
    setRender((val) => val);
  }, [colorScheme]);
  //
  return (
    // Tab bar color does not refresh when changing color modes. (bug?, probably bcs it doesnt re-render)
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
          title: "Dashboard",
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name="space-dashboard"
              style={{ marginBottom: -3 }}
              size={28}
              color={color}
            />
          ),
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
      <Tabs.Screen
        name="forum" // Name of the file that exports the screen
        options={{
          title: "Forum", // The name of the buton in the navbar
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name="forum"
              style={{ marginBottom: -3 }}
              size={28}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="health" // Name of the file that exports the screen
        options={{
          title: "Health", // The name of the buton in the navbar
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name="favorite"
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
