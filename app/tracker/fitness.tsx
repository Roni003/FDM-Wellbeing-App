import { StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, SafeAreaView, StatusBar } from "react-native";
import { Text, View } from "@/components/Themed";
import { Link } from "expo-router";
import React, { useState } from 'react';
import BackButton from "@/components/BackButton";
import Timer from "@/components/TimerComponent";
import Goal from "@/components/GoalComponent";
import PastGoals from "@/components/pastGoalComponent"

export default function FitnessPage() {
  const [fitnessHours, setFitnessHours] = useState('');
  const [totalFitnessHours, setTotalFitnessHours] = useState(0);
  const data = [20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160];
  const [goalField, setGoalField] = useState('');
  const [goal, setGoal] = useState(0);
  const [isTrackerVisible, setIsTrackerVisible] = useState(false);

  const toggleTracker = () => {
    setIsTrackerVisible(!isTrackerVisible);
  };

  const handleAddFitnessHours = () => {
    const inputHours = parseFloat(fitnessHours);
    const newTotalHours = totalFitnessHours + inputHours;
    

    // Check if the new total is within the range of 0 to 24 hours
    if (newTotalHours >= 0 && newTotalHours <= 1440 && Number.isInteger(inputHours)) {
      setTotalFitnessHours(newTotalHours);
      setFitnessHours('');
    } else {
      alert('Your input must be an integer, and the total fitness hours must be between 0 and 1,440 minutes (24 hours).');
    }
  };

  const handleGoalHours = () => {
    const inputHours = parseFloat(goalField);

    if (inputHours >= 0 && inputHours <= 1440 && Number.isInteger(inputHours)) {
      setGoal(inputHours);
      setGoalField('');
    } else {
      alert('Your goal must be an integer between 0 and 1440 minutes (24 hours).');
    }

  }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <KeyboardAvoidingView
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -500} // Adjust this value as needed
      >
        <View style={styles.fitnessPage}>
          <BackButton destination={"/user/(tabs)/"} name={"Dashboard"} />
          <Text style={styles.pastHeader}>Past progress</Text>
          <View style={styles.past}>
            <PastGoals data={data} goal={goal} />
          </View>
          <View style={styles.goal}>
            <View style={styles.dailyGoal}>
              <Text style={styles.goalHeader}>Daily Goal: {goal}</Text>
              <Goal radius={60} progress={totalFitnessHours} goal={600} />
            </View>
            <View style={styles.fitnessContainer}>
            <Text style={styles.title}>Set Goal</Text>
              <View style={styles.fitnessInput}>
                <TextInput
                  style={styles.input}
                  placeholder="Set fitness goal (mins)"
                  placeholderTextColor="gray"
                  keyboardType="numeric"
                  value={goalField}
                  onChangeText={text => setGoalField(text)}
                />
              </View>

              <TouchableOpacity style={styles.addButton} onPress={handleGoalHours}>
                <Text style={styles.buttonText}>Set Goal</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.timer}>
              {isTrackerVisible ? <Timer /> : (
                <View style={styles.fitnessContainer}>
                  <Text style={styles.title}>Fitness Tracker</Text>
                  <View style={styles.fitnessInput}>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter fitness duration (mins)"
                      placeholderTextColor="gray"
                      keyboardType="numeric"
                      value={fitnessHours}
                      onChangeText={text => setFitnessHours(text)}
                    />
                  </View>
                  <TouchableOpacity style={styles.addButton} onPress={handleAddFitnessHours}>
                    <Text style={styles.buttonText}>Track Fitness</Text>
                  </TouchableOpacity>
                  <Text style={styles.totalFitnessHours}>Tracked Fitness Duration: {totalFitnessHours || '0'} Mins</Text>
                </View>
              )}
            </View>

            {/* Button to toggle between timer and tracker */}
            
            <TouchableOpacity style={styles.switchButton} onPress={toggleTracker}>
              <Text style={styles.toggleButtonText}>
                {isTrackerVisible ? 'Switch to Tracker' : 'Switch to Timer'}
              </Text>
            </TouchableOpacity>
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
  slide: {
    flex: 1,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  goalHeader: {
    textAlign: 'center',
    fontSize: 20,
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
    marginRight: 20,
  },
  fitnessPage: {
    paddingTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: -20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
    textAlign: 'center',
  },
  fitnessContainer: {
    marginTop: '10%',
    backgroundColor: '#333333',
    padding: 10,
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: '10%',
    alignItems: 'center',
  },
  fitnessInput: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'white',
    color: 'white',
    fontSize: 12,
    padding: 10,
    width: 150,
  },
  addButton: {
    backgroundColor: '#00BBFF',
    padding: 10,
    paddingVertical: 10,
    borderRadius: 20,
    width: '70%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
  },
  totalFitnessHours: {
    fontSize: 12,
    color: 'white',
    marginTop: '10%',
  },
  timer: {
    marginRight: 20,
    marginTop: 30,
    marginBottom: 50,
  },
  switchButton: {
    width: '40%',
    backgroundColor: '#00BBFF',
    padding: 10,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
});
