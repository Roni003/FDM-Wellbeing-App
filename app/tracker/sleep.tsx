import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, useColorScheme } from "react-native";
import { Text, View } from "@/components/Themed";
import BackButton from "@/components/BackButton";
import Goal from "@/components/GoalComponent";
import PastGoals from "@/components/pastGoalComponent";
import Colors from "@/lib/Colors";

export default function SleepScreen() {
  const colorScheme = useColorScheme();
  const themeColors = colorScheme === "light" ? Colors.light : Colors.dark;

  const [sleepHours, setSleepHours] = useState('');
  const [totalSleepHours, setTotalSleepHours] = useState(0);
  const data = [20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160];
  const [goalField, setGoalField] = useState('');
  const [goal, setGoal] = useState(0);
  const [showSetGoal, setShowSetGoal] = useState(false);
  const [editButtonText, setEditButtonText] = useState("Edit");

  const toggleSetGoal = () => {
    setShowSetGoal(!showSetGoal);
    setEditButtonText(showSetGoal ? "Edit" : "Close");
  };

  const handleAddSleepHours = () => {
    const inputHours = parseFloat(sleepHours);
    const newTotalHours = totalSleepHours + inputHours;

    if (newTotalHours >= 0 && newTotalHours <= 1440 && Number.isInteger(inputHours)) {
      setTotalSleepHours(newTotalHours);
      setSleepHours('');
    } else {
      alert('Your input must be an integer, and the total amount of sleep must be between 0 and 1,440 minutes (24 hours).');
    }
  };

  const handleGoalHours = () => {
    const inputHours = parseFloat(goalField);
  
    if (inputHours >= 0 && inputHours <= 1440 && Number.isInteger(inputHours)) {
      setGoal(inputHours);
      setGoalField('');
      setShowSetGoal(false);
      setEditButtonText("Edit");
    } else {
      alert('Your goal must be an integer between 0 and 1440 minutes (24 hours).');
    }
  }
  
  return (
    <ScrollView contentContainerStyle={[styles.scrollViewContent, { backgroundColor: themeColors.background }]}>
      <KeyboardAvoidingView
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -500} // Adjust this value as needed
      >
        <View style={styles.sleepPage}>
          <BackButton destination={"/user/(tabs)/"} name={"Dashboard"} />
          <Text style={[styles.pastHeader, { color: themeColors.text }]}>Past progress</Text>
          <View style={styles.past}>
            <PastGoals data={data} goal={goal} />
          </View>
          <View style={styles.goal}>
            <View style={[styles.dailyGoal, { backgroundColor: themeColors.innerBackground }]}>
              <Text style={[styles.goalHeader, { color: themeColors.text }]}>Daily Goal: {goal}</Text>
              <Goal radius={50} progress={totalSleepHours} goal={goal} />
              <TouchableOpacity onPress={toggleSetGoal}>
                <TouchableOpacity style={[styles.button, { backgroundColor: themeColors.tint }]} onPress={toggleSetGoal}>
                  <Text style={[styles.buttonText, { color: themeColors.text }]}>{editButtonText}</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
            {showSetGoal && (
              <View style={[styles.sleepContainer, { backgroundColor: themeColors.innerBackground }]}>
                <Text style={[styles.title, { color: themeColors.text }]}>Set Goal</Text>
                <View style={styles.sleepInput}>
                  <TextInput
                    style={styles.input}
                    placeholder="Set sleep goal (hours)"
                    placeholderTextColor={themeColors.textSecondary}
                    keyboardType="numeric"
                    value={goalField}
                    onChangeText={text => setGoalField(text)}
                  />
                </View>
                <TouchableOpacity style={[styles.button, { backgroundColor: themeColors.tint }]} onPress={handleGoalHours}>
                  <Text style={[styles.buttonText, { color: themeColors.text }]}>Set Goal</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View style={styles.row}>
            <View style={[styles.sleepContainer, { backgroundColor: themeColors.innerBackground }]}>
              <Text style={[styles.title, { color: themeColors.text }]}>Sleep Tracker</Text>
              <View style={styles.sleepInput}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter sleep duration (hours)"
                  placeholderTextColor={themeColors.textSecondary}
                  keyboardType="numeric"
                  value={sleepHours}
                  onChangeText={text => setSleepHours(text)}
                />
              </View>
              <Text style={[styles.totalSleepHours, { color: themeColors.text }]}>Tracked Sleep Duration: {totalSleepHours || '0'} Hours</Text>
              <TouchableOpacity style={[styles.button, { backgroundColor: themeColors.tint }]} onPress={handleAddSleepHours}>
                <Text style={[styles.buttonText, { color: themeColors.text }]}>Track Sleep</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  past: {
    height: 100,
  },
  pastHeader: {
    marginVertical: 15,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    flex: 1,
  },
  goalHeader: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  goal: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dailyGoal: {
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  sleepPage: {
    paddingTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  sleepContainer: {
    padding: 10,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: '10%',
    alignItems: 'center',
  },
  sleepInput: {
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius:10,
  },
  input: {
    fontSize: 12,
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: 150,
    color: '#333',
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    margin: 10,
  },
  buttonText: {
    fontSize: 12,
  },
  totalSleepHours: {
    fontSize: 12,
    marginTop: '10%',
  },
});
