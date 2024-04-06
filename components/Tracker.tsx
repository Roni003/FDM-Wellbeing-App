import {
  Dimensions,
  Pressable,
  StyleSheet,
  useColorScheme,
} from "react-native";
import React, { useState } from "react";
import { Text, View } from "@/components/Themed";
import { router } from "expo-router";
import Colors from "@/lib/Colors";

type TrackerProps = {
  head: string;
  counter: string;
  link: any;
};

const Tracker = ({ head, counter, link }: TrackerProps) => {
  const colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    tracker_container: {
      flex: 1,
      height: screenHeight * 0.2,
      padding: 0,
      margin: 5,
      borderRadius: 10,
      backgroundColor:
        colorScheme === "light"
          ? Colors.light.cardBackground
          : Colors.dark.cardBackground,
      borderColor:
        colorScheme === "light"
          ? Colors.light.borderColor
          : Colors.dark.borderColor,
      borderWidth: 0.5,
    },

    tracker_container_Head: {
      fontSize: 21,
    },

    tracker_container_Counter: {
      marginTop: "5%",
      fontSize: 16,
      fontWeight: "700",
    },

    pressable: {
      padding: 10,
      borderRadius: 10,
      flex: 1,
      overflow: "hidden",
    },
  });

  return (
    <View style={styles.tracker_container}>
      <Pressable
        onPress={() => router.navigate(link)}
        style={({ pressed }) => [
          {
            backgroundColor: pressed
              ? "rgba(100, 160, 255, 0.5)"
              : "rgba(100, 160, 255, 0.1)",
          },
          styles.pressable,
        ]}
      >
        <Text style={styles.tracker_container_Head}>{head}</Text>
        <Text style={styles.tracker_container_Counter}>{counter}</Text>
      </Pressable>
    </View>
  );
};

const screenHeight = Dimensions.get("window").height;

export default Tracker;
