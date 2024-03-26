import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableHighlight } from "react-native";

import { Text, View } from "@/components/Themed";
import BackButton from "@/components/BackButton";

export default function SleepScreen() {
  const [sleepDuration, setSleepDuration] = useState("");
  const [trackedSleep, setTrackedSleep] = useState<number | null>(null);

  const handleTrackSleep = () => {
    const duration = parseFloat(sleepDuration);
    if (!isNaN(duration)) {
      setTrackedSleep(duration);
      setSleepDuration("");
    } else {
      console.log("Invalid input. Please enter a valid number.");
    }
  };

  const handleSleepDurationChange = (text: string) => {
    const numericInput = text.replace(/[^0-9]/g, "");
    setSleepDuration(numericInput);
  };

  return (
    <View style={styles.container}>
      <BackButton destination="/user/(tabs)/" />
      <Text style={styles.title}>Sleep Tracker</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter sleep duration"
          style={styles.input}
          onChangeText={handleSleepDurationChange}
          value={sleepDuration}
          keyboardType="numeric"
        />
      </View>
      <TouchableHighlight style={styles.button} onPress={handleTrackSleep}>
        <Text style={styles.buttonText}>Track Sleep</Text>
      </TouchableHighlight>
      {trackedSleep !== null && (
        <Text style={styles.trackedSleep}>
          Tracked Sleep Duration: {trackedSleep} hours
        </Text>
      )}
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
  inputContainer: {
    backgroundColor: "white",
    width: "100%",
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginVertical: 5,
  },
  input: {},
  button: {
    backgroundColor: "#3ec6ff",
    width: "50%",
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
    padding: 13,
    marginVertical: 5,
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
  },
  trackedSleep: {
    marginTop: 10,
  },
});
