import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { Link } from "expo-router";
import { useState } from "react";

export default function TabOneScreen() {

  const [steps, setSteps] = useState(0); // this needs to be accessed from db? or will this be available in the code
  const [stepsGoal, setStepsGoal] = useState(0);

  return (
    <View>
      <Text style={{fontSize: 40}}>Dashboard</Text>

      <View style={{marginTop:10}}>
        <Text style={{fontSize:30}}>Notifications</Text>
        <View style={styles.notif_container}>
          <Text>Example Notification Title</Text>
          <Text>Example Notification Detail</Text>
        </View>
        <View style={styles.notif_container}>
          <Text>Example Notification Title</Text>
          <Text>Example Notification Detail</Text>        
        </View>
        <Link href="/"> 
            <Text>Go to forum</Text>
        </Link>
      </View>

      <View style ={{marginTop:10}}>
        <Text style={{fontSize:30}}>Trackers</Text>

        <View style={styles.tracker_container}>
          <Text style={styles.tracker_container_Text}>Todays steps: {steps}/{stepsGoal}</Text>
          <Link href="/tracker/step">
            <Text>Go to step tracker</Text>
          </Link>
        </View>

        <View style={styles.tracker_container}>
          <Text style={styles.tracker_container_Text}>Calorie goal: 0</Text>
          <Link href="/tracker/fitness">
            <Text>Go to fitness tracker</Text>
          </Link>
        </View>

        <View style={styles.tracker_container}>
          <Text style={styles.tracker_container_Text}>Meditation time today: 0 minutes</Text>
          <Link href="/tracker/meditation">
            <Text>Go to meditation tracker</Text>
          </Link>
        </View>

        <View style={styles.tracker_container}>
          <Text style={styles.tracker_container_Text}>Last night's sleep: 0</Text>
          <Link href="/tracker/sleep">
            <Text>Go to sleep tracker</Text>
          </Link>
        </View>
      </View>
      <Link href="/" style={{marginTop:50}}>
            <Text>Return to login</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  tracker_container: {
    margin: 10,
  },

  tracker_container_Text: {
    fontSize: 20,
  },

  notif_container: {
    margin: 10,
  },
});
