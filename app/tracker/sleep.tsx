import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  useColorScheme,
} from "react-native";
import { Text, View } from "@/components/Themed";
import BackButton from "@/components/BackButton";
import Goal from "@/components/GoalComponent";
import PastGoals from "@/components/pastGoalComponentSleep";
import Colors from "@/lib/Colors";
import { supabase } from "@/lib/Supabase";
import { globalStyles } from "@/lib/Styles";

export default function SleepScreen() {
  const colorScheme = useColorScheme();
  const themeColors = colorScheme === "light" ? Colors.light : Colors.dark;

  const data = [
    20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160,
  ];
  const [goalField, setGoalField] = useState("");
  const [goal, setGoal] = useState(-1);
  const [showSetGoal, setShowSetGoal] = useState(false);
  const [editButtonText, setEditButtonText] = useState("Edit");

  const [sleepId, setSleepId] = useState(-1);
  const [sleepTime, setSleepTime] = useState(0);
  const [userId, setUserId] = useState("");
  const [sleepHours, setSleepHours] = useState("");
  const [totalSleepHours, setTotalSleepHours] = useState(0);
  const [pastData, setPastData] = useState<string[]>([]);

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
          setGoal(fitness_goals[0].daily_sleep_goal);
        }
      } catch (error) {}
    };
    fetchDailyGoal();
  }, [userId, totalSleepHours, sleepId]);

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];

    const fetchFitnessId = async () => {
      try {
        const { data } = await supabase
          .from("sleep_details")
          .select("*")
          .eq("user_id", userId)
          .gte("created_at", `${currentDate} 00:00:00`)
          .lt("created_at", `${currentDate} 23:59:59`);

        if (data !== null && data.length > 0) {
          const parsedSleepTime = parseInt(data[0].sleep_time, 10);
          const parsedSleepId = parseInt(data[0].sleep_id, 10);
          setSleepId(parsedSleepId);
          setSleepTime(parsedSleepTime);
          setTotalSleepHours(parsedSleepTime);
          console.log(data);
          console.log("sleepID : ", sleepId);
          console.log("sleepTime : ", sleepTime);
        } else {
          console.log("no fitness data .");
        }
      } catch (err) {
        console.error("error fetching fitness data:", err);
      }
    };

    fetchFitnessId();
  }, [userId, totalSleepHours, sleepId]);

  const toggleSetGoal = () => {
    setShowSetGoal(!showSetGoal);
    setEditButtonText(showSetGoal ? "Edit" : "Close");
  };

  const handleAddSleepHours = async () => {
    const inputHours = parseFloat(sleepHours);
    const newTotalHours = totalSleepHours + inputHours;
    const currentDate = new Date().toISOString().split("T")[0];

    // Check if the new total is within the range of 0 to 24 hours
    if (
      newTotalHours >= 0 &&
      newTotalHours <= 1440 &&
      Number.isInteger(inputHours)
    ) {
      setTotalSleepHours(newTotalHours);
      setSleepHours("");

      console.log("sleep ID:", sleepId);

      if (sleepId == -1) {
        // if needs inserting
        console.log("needs inserting...");
        try {
          console.log(sleepHours);
          const { data, error } = await supabase

            .from("sleep_details")
            .insert([{ user_id: userId, sleep_time: newTotalHours }])
            .select();

          if (data) {
            console.log(data);
            setSleepId(data[0].sleep_id);
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
            .from("sleep_details")
            .update({ sleep_time: newTotalHours })
            .eq("sleep_id", sleepId);

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
        // update data if goal > -1
        console.log("updating goal data...");
        try {
          const { data, error } = await supabase
            .from("personal_goals")
            .update({ daily_sleep_goal: inputHours })
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
        // insert data if goal = -1
        try {
          console.log("inserting goal data..", inputHours);
          const { data, error } = await supabase
            .from("personal_goals")
            .insert([{ daily_sleep_goal: inputHours, user_id: userId }])
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

        .from("sleep_details")
        .select("*")
        .eq("user_id", userId)
        .lt("created_at", `${currentDate} 00:00:00`);

      if (data) {
        setPastData(data);
        console.log(pastData);
      }
    };
    fetchPastData();
  }, [userId, totalSleepHours, sleepId]);

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
        </View>
        <View style={styles.sleepPage}>
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
                Daily Goal: {goal}
              </Text>
              <Goal radius={50} progress={totalSleepHours} goal={goal} />
              <TouchableOpacity onPress={toggleSetGoal}>
              <Text
                  style={[
                    styles.buttonText,
                    { color: themeColors.text },
                  ]}
                >
                  {showSetGoal ? 'Cancel' : 'Edit Goal'}
                </Text>
              </TouchableOpacity>
            </View>
            {showSetGoal && (
              <View
                style={[
                  styles.sleepContainer,
                  { backgroundColor: themeColors.innerBackground },
                ]}
              >
                <Text style={[styles.title, { color: themeColors.text }]}>
                  Set Goal
                </Text>
                <View style={styles.sleepInput}>
                  <TextInput
                    style={styles.input}
                    placeholder="Set sleep goal (hours)"
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
            <View
              style={[
                styles.sleepContainer,
                { backgroundColor: themeColors.innerBackground },
              ]}
            >
              <Text style={[styles.title, { color: themeColors.text }]}>
                Sleep Tracker
              </Text>
              <View style={styles.sleepInput}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter sleep duration (hours)"
                  placeholderTextColor={themeColors.textSecondary}
                  keyboardType="numeric"
                  value={sleepHours}
                  onChangeText={(text) => setSleepHours(text)}
                />
              </View>
              <Text
                style={[styles.totalSleepHours, { color: themeColors.text }]}
              >
                Tracked Sleep Duration: {totalSleepHours || "0"} Hours
              </Text>
              <TouchableOpacity
                style={[
                  styles.button,
                  { backgroundColor: themeColors.lowOpacityTint },
                ]}
                onPress={handleAddSleepHours}
              >
                <Text style={[styles.buttonText, { color: themeColors.text }]}>
                  Track Sleep
                </Text>
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
    ...globalStyles.container,
  },
  backButton: {},
  past: {
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
    marginTop: "4%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  dailyGoal: {
    marginRight: 5,
    marginBottom: 10,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  sleepPage: {
    paddingTop: "3%",
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "5%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  sleepContainer: {
    padding: 10,
    borderRadius: 12,
    marginLeft: 5,
    marginBottom: "10%",
    alignItems: "center",
  },
  sleepInput: {
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
  totalSleepHours: {
    fontSize: 12,
    marginTop: "10%",
  },
});
