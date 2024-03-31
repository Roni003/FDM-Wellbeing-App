import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import { Link } from "expo-router";
import React, { useState } from 'react';
import BackButton from "@/components/BackButton";
import Timer from "@/components/TimerComponent";
import Goal from "@/components/GoalComponent";


export default function FitnessPage() {
  const [fitnessHours, setFitnessHours] = useState('');
  const [totalFitnessHours, setTotalFitnessHours] = useState(0);


  const handleAddFitnessHours = () => {
    const inputHours = parseFloat(fitnessHours);
    const newTotalHours = totalFitnessHours + inputHours;
   
    // Check if the new total is within the range of 0 to 24 hours
    if (newTotalHours >= 0 && newTotalHours <= 24) {
      if (Number.isInteger(inputHours * 4)) {
      setTotalFitnessHours(newTotalHours);
      setFitnessHours('');
      }
      else {
        alert('Your input must be in multiples of 15 minutes (0.25 hours)');
      }
    } else {
      alert('The total fitness hours must be between 0 and 24 hours.');
    }
  };


  return (
    <View style={styles.fitnessPage}>
      <BackButton destination={"/user/(tabs)/"} name={"Dashboard"} />
      <View style={styles.goal}>
        <Text style={styles.goalHeader}>Daily Goal</Text>
        <Goal radius={60} progress={totalFitnessHours} goal={10} />
      </View>
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.timer}>
            <Timer />
          </View>
          <View style={styles.fitnessContainer}>
            <Text style={styles.title}>Fitness Tracker</Text>
            <View style={styles.fitnessInput}>
              <TextInput
                style={styles.input}
                placeholder="Enter fitness duration (hrs)"
                placeholderTextColor="gray"
                keyboardType="numeric"
                value={fitnessHours}
                onChangeText={text => setFitnessHours(text)}
              />
            </View>


            <TouchableOpacity style={styles.addButton} onPress={handleAddFitnessHours}>
              <Text style={styles.buttonText}>Track Fitness</Text>
            </TouchableOpacity>


            <Text style={styles.totalFitnessHours}>Tracked Fitness Hours: {totalFitnessHours || '0'}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 2,
  },
  goalHeader: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  goal: {
    marginTop: 20,
  },
  fitnessPage: {
    flex: 1,
    paddingTop: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'black',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
    textAlign: 'center',
  },
  fitnessContainer: {
    marginTop: '20%',
    backgroundColor: '#333333',
    padding: 12,
    paddingVertical: 12,
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
    marginBottom: '5%',
  }
});
