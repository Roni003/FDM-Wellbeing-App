import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from "react-native";
import { Text, View } from "@/components/Themed";
import { Link, useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import BackButton from "@/components/BackButton";
import Timer from "@/components/TimerComponent";
import Goal from "@/components/GoalComponent";
import PastGoals from "@/components/pastGoalComponentFitness";
import Colors from "@/lib/Colors";
import { supabase } from "@/lib/Supabase";
import { globalStyles } from "@/lib/Styles";
import { FontAwesome } from "@expo/vector-icons";

export default function FitnessPage() {
  const colorScheme = useColorScheme();
  const themeColors = colorScheme === "light" ? Colors.light : Colors.dark;

  const [userId, setUserId] = useState("");
  const [fitnessHours, setFitnessHours] = useState("");
  const [totalFitnessHours, setTotalFitnessHours] = useState(0);
  const data = [
    20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160,
  ];
  const [goalField, setGoalField] = useState("");
  const [goal, setGoal] = useState(-1);
  const [isTrackerVisible, setIsTrackerVisible] = useState(false);
  const [showSetGoal, setShowSetGoal] = useState(false);
  const [editButtonText, setEditButtonText] = useState("Edit");

  const [fitnessId, setFitnessId] = useState(-1);
  const [fitnessTime, setFitnessTime] = useState(0);
  const [pastData, setPastData] = useState<string[]>([]);
  const styles = StyleSheet.create({
    scrollViewContent: {
      flexGrow: 1,
      ...globalStyles.container,
    },
    backButton: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    past: {
      height: 100,
    },
    pastGoals: {
      height: 100,
    },
    pastHeader: {
      marginVertical: "5%",
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
    },
    container: {
      flex: 1,
    },
    goalHeader: {
      textAlign: "center",
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 15,
    },
    goal: {
      marginTop: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 15,
    },
    dailyGoal: {
      padding: 20,
      borderRadius: 10,
      marginRight: 5,
      alignItems: "center",
      marginBottom: 20,
    },
    fitnessPage: {
      paddingTop: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 20,
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 15,
      textAlign: "center",
    },
    fitnessContainer: {
      padding: 15,
      borderRadius: 10,
      marginLeft: 5,
      marginBottom: "10%",
      alignItems: "center",
    },
    fitnessInput: {
      flexDirection: "row",
      marginBottom: 10,
      backgroundColor: "white",
      borderRadius: 10,
    },
    input: {
      fontSize: 12,
      paddingVertical: 10,
      paddingHorizontal: 15,
      width: 150,
      color: "#333",
    },
    button: {
      paddingHorizontal: 30,
      paddingVertical: 10,
      borderRadius: 20,
      alignItems: "center",
      margin: 10,
    },
    buttonText: {
      fontSize: 12,
    },
    totalFitnessHours: {
      fontSize: 12,
      color: "white",
    },
    timerButton: {
      paddingHorizontal: 30,
      borderRadius: 20,
      alignItems: "center",
      color: isTrackerVisible ? themeColors.tint : themeColors.text,
    },
    timer: {},
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching user:", error);
        return;
      }

      if (data) {
        const user = data.session.user;
        setUserId(user.id);
      } else {
        console.log("cannot find user");
      }
    };

    fetchUserData();
  }, [userId]);

  useEffect(() => {
    const fetchDailyGoal = async () => {
      try {
        const { data: fitness_goals, error } = await supabase
          .from("personal_goals")
          .select("*")
          .eq("user_id", userId);
        if (fitness_goals != null) {
          setGoal(fitness_goals[0].daily_fitness_goal);
        }
      } catch (error) {}
    };
    fetchDailyGoal();
  }, [userId, totalFitnessHours, fitnessId]);

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];

    const fetchFitnessId = async () => {
      try {
        const { data } = await supabase
          .from("fitness_details")
          .select("*")
          .eq("user_id", userId)
          .gte("created_at", `${currentDate} 00:00:00`)
          .lt("created_at", `${currentDate} 23:59:59`);

        if (data !== null && data.length > 0) {
          const parsedFitnessTime = parseInt(data[0].fitness_time, 10);
          const parsedFitnessId = parseInt(data[0].fitness_id, 10);
          setFitnessId(parsedFitnessId);
          setFitnessTime(parsedFitnessTime);
          setTotalFitnessHours(parsedFitnessTime);
          console.log(data);
          console.log("fitnessID : ", fitnessId);
          console.log("fitnessTime : ", fitnessTime);
        } else {
          console.log("no fitness data .");
        }
      } catch (err) {
        console.error("error fetching fitness data:", err);
      }
    };

    fetchFitnessId();
  }, [userId, totalFitnessHours, fitnessId]);

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
    const currentDate = new Date().toISOString().split("T")[0];

    // Check if the new total is within the range of 0 to 24 hours
    if (
      newTotalHours >= 0 &&
      newTotalHours <= 1440 &&
      Number.isInteger(inputHours)
    ) {
      setTotalFitnessHours(newTotalHours);
      setFitnessHours("");

      console.log("fitnessID:", fitnessId);

      if (fitnessId == -1) {
        // if needs inserting
        console.log("needs inserting...");
        try {
          console.log(totalFitnessHours);
          const { data, error } = await supabase

            .from("fitness_details")
            .insert([{ user_id: userId, fitness_time: newTotalHours }])
            .select();

          if (data) {
            console.log(data);
            setFitnessId(data[0].fitness_id);
          }
          if (error) {
            console.log(error);
          }
        } catch (error) {
          console.error("Error saving fitness details:", error);
        }
      } else {
        //if needs updating
        console.log("needs updating");
        console.log("totalFitnessHours : ", newTotalHours);
        try {
          const { data, error } = await supabase
            .from("fitness_details")
            .update({ fitness_time: newTotalHours })
            .eq("fitness_id", fitnessId);

          if (error) {
            console.log(error);
          }
          if (data) {
            console.log(data);
          }
        } catch (error) {
          console.log(error);
        }

        console.log("done");
      }
    } else {
      alert(
        "Your input must be an integer, and the total fitness hours must be between 0 and 1,440 minutes (24 hours)."
      );
    }
  };

  const handleGoalHours = async () => {
    const inputHours = parseFloat(goalField);

    if (inputHours >= 0 && inputHours <= 1440 && Number.isInteger(inputHours)) {
      setGoal(inputHours);
      setGoalField("");
      setShowSetGoal(false);
      setEditButtonText("Edit");

      if (goal > -1) {
        // update data if goal > 0
        console.log("updating goal data...");
        try {
          const { data, error } = await supabase
            .from("personal_goals")
            .update({ daily_fitness_goal: inputHours })
            .eq("user_id", userId)
            .select();
          if (data) {
            console.log(data);
          }
          if (error) {
            console.log(error);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        // insert data if goal = 0
        try {
          console.log("inserting goal data..", inputHours);
          const { data, error } = await supabase
            .from("personal_goals")
            .insert([{ daily_fitness_goal: inputHours, user_id: userId }])
            .select();
        } catch (error) {
          console.log("error", error);
        }
      }
    } else {
      alert(
        "Your goal must be an integer between 0 and 1440 minutes (24 hours)."
      );
    }
  };

  useEffect(() => {
    const fetchPastData = async () => {
      const currentDate = new Date().toISOString().split("T")[0];

      const { data, error } = await supabase
        .from("fitness_details")
        .select("*")
        .eq("user_id", userId)
        .lt("created_at", `${currentDate} 00:00:00`);
      if (data) {
        setPastData(data);
        console.log(pastData);
      }
    };
    fetchPastData();
  }, [userId, totalFitnessHours, fitnessId]);

  return (
    <ScrollView
      contentContainerStyle={[
        styles.scrollViewContent,
        { backgroundColor: themeColors.background },
      ]}
    >
      <KeyboardAvoidingView
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -500} // Adjust this value as needed
      >
        <View style={styles.backButton}>
          <BackButton destination={"/"} name={"Dashboard"} />
          {/* Switch to Timer button */}
          <FontAwesome
            name="hourglass"
            size={24}
            style={styles.timerButton}
            onPress={toggleTracker}
          />
        </View>
        <View style={styles.fitnessPage}>
          <Text style={[styles.pastHeader, { color: themeColors.text }]}>
            Past progress
          </Text>
          <View style={styles.past}>
            {pastData.length > 0 ? (
              <PastGoals data={pastData} goal={goal} />
            ) : (
              <Text style={{ fontWeight: "500", fontSize: 16, paddingTop: 16 }}>
                No past data available
              </Text>
            )}
          </View>
          <View style={styles.goal}>
            <View
              style={[
                styles.dailyGoal,
                { backgroundColor: themeColors.innerBackground },
              ]}
            >
              <Text style={[styles.goalHeader, { color: themeColors.text }]}>
                {goal === -1 ? "Daily Goal: 0 hours" : `Daily Goal: ${goal} mins`}
              </Text>
              <Goal radius={50} progress={totalFitnessHours} goal={goal} />
              <TouchableOpacity onPress={toggleSetGoal}>
                <Text style={[styles.buttonText, { color: themeColors.text }]}>
                  {showSetGoal ? "Cancel" : "Edit Goal"}
                </Text>
              </TouchableOpacity>
            </View>
            {showSetGoal && (
              <View
                style={[
                  styles.fitnessContainer,
                  { backgroundColor: themeColors.innerBackground },
                ]}
              >
                <Text style={[styles.title, { color: themeColors.text }]}>
                  Set Goal
                </Text>
                <View style={styles.fitnessInput}>
                  <TextInput
                    style={styles.input}
                    placeholder="Set fitness goal (mins)"
                    placeholderTextColor={themeColors.textSecondary}
                    keyboardType="numeric"
                    value={goalField}
                    onChangeText={(text) => setGoalField(text)}
                  />
                </View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleGoalHours}
                >
                  <Text style={styles.buttonText}>Set Goal</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View style={styles.row}>
            <View style={styles.timer}>
              {isTrackerVisible ? (
                <View
                  style={[
                    styles.fitnessContainer,
                    { backgroundColor: themeColors.innerBackground },
                  ]}
                >
                  <Text style={[styles.title, { color: themeColors.text }]}>
                    Timer
                  </Text>
                  <Timer />
                  {/* Switch to Tracker button */}
                  <TouchableOpacity
                    style={[
                      styles.button,
                      { backgroundColor: themeColors.lowOpacityTint },
                    ]}
                    onPress={toggleTracker}
                  >
                    <Text
                      style={[styles.buttonText, { color: themeColors.text }]}
                    >
                      Tracker
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View
                  style={[
                    styles.fitnessContainer,
                    { backgroundColor: themeColors.innerBackground },
                  ]}
                >
                  <Text style={[styles.title, { color: themeColors.text }]}>
                    Fitness Tracker
                  </Text>
                  <View style={styles.fitnessInput}>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter fitness duration (mins)"
                      placeholderTextColor={themeColors.textSecondary}
                      keyboardType="numeric"
                      value={fitnessHours}
                      onChangeText={(text) => setFitnessHours(text)}
                    />
                  </View>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      { backgroundColor: themeColors.lowOpacityTint },
                    ]}
                    onPress={handleAddFitnessHours}
                  >
                    <Text
                      style={[styles.buttonText, { color: themeColors.text }]}
                    >
                      Track Fitness
                    </Text>
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
