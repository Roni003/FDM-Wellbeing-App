import { ScrollView, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { Link } from "expo-router";

export default function TabOneScreen() {

  return (
    <View>
      <View style={{marginTop:10}}>
        <Text style={{fontSize:25}}>Recent Forum Posts</Text>
        <ScrollView style={{maxHeight:140, borderRadius: 10, borderWidth: 2, borderColor: 'white'}}>
        <View style={styles.notif_container}>
          <Text>Forum Post Title </Text>
          <Text>By: user1 @ 00:00</Text>
        </View>
        <View style={styles.notif_container}>
            <Text>Forum Post Title </Text>
            <Text>By: user1 @ 00:00</Text>
        </View>
        <View style={styles.notif_container}>
            <Text>Forum Post Title </Text>
            <Text>By: user1 @ 00:00</Text>
        </View>
        <View style={styles.notif_container}>
            <Text>Forum Post Title </Text>
            <Text>By: user1 @ 00:00</Text>
        </View>
        </ScrollView>
        <Link href="/"> 
            <Text>Go to forum</Text>
        </Link>
      </View>

      <View style ={{marginTop:10}}>
      <Text style={{fontSize:25}}>Trackers</Text>

        <View style={styles.tracker_group}>
            <View style={styles.tracker_container}>
              <Text style={styles.tracker_container_Text}>Todays steps</Text>
              <Text>0 steps</Text>
              <Link href="/tracker/step" style={styles.link}>
                <Text>Go to steps</Text>
              </Link>
            </View>


          <View style={styles.tracker_container}>
            <Text style={styles.tracker_container_Text}>Calories today</Text>
            <Text>0 kcal</Text>
            <Link href="/tracker/fitness" style={styles.link}>
              <Text>Go to fitness tracker</Text>
            </Link>
          </View>
        </View>

        <View style={styles.tracker_group}>
        <View style={styles.tracker_container}>
            <Text style={styles.tracker_container_Text}>Meditation time</Text>
            <Text>0 minutes</Text>
            <Link href="/tracker/meditation" style={styles.link}>
              <Text>Go to meditation</Text>
            </Link>
        </View>

        <View style={styles.tracker_container}>
          <Text style={styles.tracker_container_Text}>Last night's sleep</Text>
          <Text>0 hours 0 minutes</Text>
          <Link href="/tracker/sleep" style={styles.link}>
            <Text>Go to sleep tracker</Text>
          </Link>
        </View>
        </View>
      </View>
      <Link href="/" style={{marginTop:20}}>
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

  tracker_group: {
    flexDirection: 'row',
    margin: 5,
    
  },

  tracker_container: {
    padding: 10,
    backgroundColor: 'rgba(0, 0, 250, 0.2)',
    margin: 5,
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 2,
    minWidth: 180,
    minHeight: 180,
  },

  tracker_container_inner: {
    padding: 0,
  },

  tracker_container_Text: {
    fontSize: 20,
  },

  link: {
    marginTop:90,
    backgroundColor: 'rgba(250, 250, 250, 0.2)',
    padding: 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(250, 250, 250, 0.2)',
    overflow: 'hidden',
  },

  notif_container: {
    margin: 7,
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 2,
    padding: 5,
  },
});
