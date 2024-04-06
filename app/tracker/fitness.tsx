import { StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, SafeAreaView, StatusBar, useColorScheme } from "react-native";
import { Text, View } from "@/components/Themed";
import { Link } from "expo-router";
import React, { useEffect, useState } from 'react';
import BackButton from "@/components/BackButton";
import Timer from "@/components/TimerComponent";
import Goal from "@/components/GoalComponent";
import PastGoals from "@/components/pastGoalComponent"
import Colors from "@/lib/Colors";
import { supabase } from "@/lib/Supabase";

export default function FitnessPage() {
  const colorScheme = useColorScheme();
  const themeColors = colorScheme === "light" ? Colors.light : Colors.dark;

  const [userId, setUserId] =  useState('');
  const [fitnessHours, setFitnessHours] = useState('');
  const [totalFitnessHours, setTotalFitnessHours] = useState(0);
  const data = [20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160];
  const [goalField, setGoalField] = useState('');
  const [goal, setGoal] = useState(0);
  const [isTrackerVisible, setIsTrackerVisible] = useState(false);
  const [showSetGoal, setShowSetGoal] = useState(false);
  const [editButtonText, setEditButtonText] = useState("Edit");
  const [fitnessId,setFitnessId] = useState('')


  const toggleSetGoal = () => {
    setShowSetGoal(!showSetGoal);
    setEditButtonText(showSetGoal ? "Edit" : "Close");
  };

  const toggleTracker = () => {
    setIsTrackerVisible(!isTrackerVisible);
  };

  const handleAddFitnessHours = async () => {
    const inputHours = parseFloat(fitnessHours);
    const newTotalHours = totalFitnessHours + inputHours;
    const currentDate = new Date().toISOString().split('T')[0];
  
    // Check if the new total is within the range of 0 to 24 hours
    if (newTotalHours >= 0 && newTotalHours <= 1440 && Number.isInteger(inputHours)) {
      setTotalFitnessHours(newTotalHours);
      setFitnessHours('');

      try{
        // checks to see if currentDate exists
        console.log("checking to see if currentdate exists")
        const { data, error } = await supabase

        .from('fitness_details')
        .select('fitness_id')
        .eq('user_id', userId)
        .gte('created_at', `${currentDate} 00:00:00`)
        .lt('created_at', `${currentDate} 23:59:59`);

        if (data !== null && data.length > 0){
          setFitnessId(data[0].fitness_id)

        }

        if (data !== null && data.length > 0){

          //if needs updating
          console.log("needs updating")
  
          const { data, error } = await supabase
          .from('fitness_details')
          .update({ 'fitness_time': newTotalHours })
          .eq('fitness_id', fitnessId);
  
          if (error){
            console.log(error)
          }
          if (data){
            console.log(data)
          }
          console.log("done")
  
  
        }
  
        else{
          // if needs inserting
          console.log("needs inserting...")
          try {
            const { data, error } = await supabase
  
              .from('fitness_details')
              .insert([
                { user_id: userId, fitness_time: newTotalHours},
              ])
              .select();
      
            if (data) {
              console.log(data);
            }
            if (error) {
              console.log(error);
            }
          } catch (error) {
            console.error('Error saving fitness details:', error);
          }
  
        }

        

      }
      catch(error){
        console.log(error)
      }
      
      
    } else {
      alert('Your input must be an integer, and the total fitness hours must be between 0 and 1,440 minutes (24 hours).');
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

  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await supabase.auth.getSession();
  
      if (error) {
        console.error('Error fetching user:', error);
        return;
      }
  
      if (data && data.session && data.session.user) {
        const user = data.session.user;
        setUserId(user.id);
        console.log(user.id)
      } else {
        setUserId(null);
      }
    };
  
    fetchUserData();
  }, []);

  return (
    <ScrollView contentContainerStyle={[styles.scrollViewContent, { backgroundColor: themeColors.background }]}>
      <KeyboardAvoidingView
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -500} // Adjust this value as needed
      >
        <View style={styles.fitnessPage}>
          <BackButton destination={"/user/(tabs)/"} name={"Dashboard"} />
          <Text style={[styles.pastHeader, { color: themeColors.text }]}>Past progress</Text>
          <View style={styles.past}>
            <PastGoals data={data} goal={goal} />
          </View>
          <View style={styles.goal}>
            <View style={[styles.dailyGoal, { backgroundColor: themeColors.innerBackground }]}>
              <Text style={[styles.goalHeader, { color: themeColors.text }]}>Daily Goal: {goal}</Text>
              <Goal radius={50} progress={totalFitnessHours} goal={goal} />
              <TouchableOpacity onPress={toggleSetGoal}>
                <TouchableOpacity style={[styles.button, { backgroundColor: themeColors.tint }]} onPress={toggleSetGoal}>
                  <Text style={[styles.buttonText, { color: themeColors.text }]}>{editButtonText}</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
            {showSetGoal && (
              <View style={[styles.fitnessContainer, { backgroundColor: themeColors.innerBackground }]}>
                <Text style={[styles.title, { color: themeColors.text }]}>Set Goal</Text>
                <View style={styles.fitnessInput}>
                  <TextInput
                    style={styles.input}
                    placeholder="Set fitness goal (mins)"
                    placeholderTextColor={themeColors.textSecondary}
                    keyboardType="numeric"
                    value={goalField}
                    onChangeText={text => setGoalField(text)}
                  />
                </View>
                <TouchableOpacity style={styles.button} onPress={handleGoalHours}>
                  <Text style={styles.buttonText}>Set Goal</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View style={styles.row}>
            <View style={styles.timer}>
              {isTrackerVisible ? (
                <View style={[styles.fitnessContainer, { backgroundColor: themeColors.innerBackground }]}>
                  <Text style={[styles.title, { color: themeColors.text }]}>Timer</Text>
                  <Timer />
                  {/* Switch to Tracker button */}
                  <TouchableOpacity style={[styles.button, { backgroundColor: themeColors.tint }]} onPress={toggleTracker}>
                    <Text style={[styles.buttonText, { color: themeColors.text }]}>Tracker</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={[styles.fitnessContainer, { backgroundColor: themeColors.innerBackground }]}>
                  <Text style={[styles.title, { color: themeColors.text }]}>Fitness Tracker</Text>
                  <View style={styles.fitnessInput}>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter fitness duration (mins)"
                      placeholderTextColor={themeColors.textSecondary}
                      keyboardType="numeric"
                      value={fitnessHours}
                      onChangeText={text => setFitnessHours(text)}
                    />
                  </View>
                  <Text style={[styles.totalFitnessHours, { color: themeColors.text }]}>Tracked Fitness Duration: {totalFitnessHours || '0'} Mins</Text>
                  <TouchableOpacity style={[styles.button, { backgroundColor: themeColors.tint }]} onPress={handleAddFitnessHours}>
                    <Text style={[styles.buttonText, { color: themeColors.text }]}>Track Fitness</Text>
                  </TouchableOpacity>
                  
                  {/* Switch to Timer button */}
                  <TouchableOpacity style={[styles.button, { backgroundColor: themeColors.tint }]} onPress={toggleTracker}>
                    <Text style={[styles.buttonText, { color: themeColors.text }]}>Timer</Text>
                  </TouchableOpacity>
                </View>
              )}
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
  pastGoals: {
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
  fitnessPage: {
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
  fitnessContainer: {
    padding: 10,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: '10%',
    alignItems: 'center',
  },
  fitnessInput: {
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
  totalFitnessHours: {
    fontSize: 12,
    color: 'white',
  },
  timer: {
  },
});
