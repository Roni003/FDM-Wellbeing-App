import { Dimensions, ScrollView, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { Link } from "expo-router";
import Tracker from "@/components/Tracker";

export default function TabOneScreen() {
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <View style={{ marginTop: "10%", flex: 1 }}>
        <Text style={{ fontSize: 25, marginLeft: "1%", paddingBottom: 5 }}>
          Trackers
        </Text>

        <View style={styles.tracker_grid}>
          <View style={styles.tracker_row}>
            <Tracker
              head="Todays steps"
              counter="0 steps"
              link="/tracker/step"
            />
            <Tracker
              head="Calories today"
              counter="0 kcal"
              link="/tracker/fitness"
            />
          </View>

          <View style={styles.tracker_row}>
            <Tracker
              head="Meditation time"
              counter="0 minutes"
              link="/tracker/meditation"
            />
            <Tracker
              head="Last night's sleep"
              counter="0 hours 0 minutes"
              link="/tracker/sleep"
            />
          </View>
        </View>
      </View>

      <View style={styles.forum}>
        <Text style={{ fontSize: 25, marginLeft: "1%" }}>
          Recent Forum Posts
        </Text>
        <ScrollView
          style={{
            maxHeight: 140,
            borderRadius: 10,
            borderWidth: 0,
            borderColor: "white",
          }}
        >
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
        <Link href="/user/(tabs)/forum" style={styles.link}>
          <Text>Go to forum</Text>
        </Link>
      </View>

      <Link href="/" style={{ marginTop: 10 }}>
        <Text>Return to login</Text>
      </Link>
    </View>
  );
}

const screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(200, 200, 200, 0.1)",
  },

  forum: {
    flex: 1,
    maxHeight: screenHeight * 0.3,
  },

  tracker_grid: {
    flex: 1,
    flexDirection: "column",
    height: screenHeight * 0.5,
  },

  tracker_row: {
    flex: 1,
    flexDirection: "row",
  },

  link: {
    backgroundColor: "rgba(100, 160, 255, 0.5)",
    padding: 5,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "rgba(250, 250, 250, 0.2)",
    overflow: "hidden",
    maxWidth: "30%",
    margin: "2%",
    textAlign: "center",
  },

  notif_container: {
    margin: 7,
    borderRadius: 10,
    borderColor: "rgba(250, 250, 250, 0.2)",
    borderWidth: 0.5,
    padding: 7,
    backgroundColor: "rgba(100, 160, 255, 0.5)",
  },
});
