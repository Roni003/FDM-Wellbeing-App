import { Dimensions, ScrollView, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { Link } from "expo-router";

export default function TabOneScreen() {

  return (
    <View style ={{flex:1}}>

      <View style ={{marginTop:'15%', flex:1}}>

        <Text style={{fontSize:25, marginLeft:'1%'}}>Trackers</Text>

        <View style={styles.tracker_collective}>

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

      </View>

      
      <View style={styles.forum}>
        <Text style={{fontSize:25, marginLeft:'1%'}}>Recent Forum Posts</Text>
        <ScrollView style={{maxHeight:140, borderRadius: 10, borderWidth: 0, borderColor: 'white'}}>
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
        <Link href="/" style={styles.link_other}> 
            <Text>Go to forum</Text>
        </Link>
      </View>
    
      <Link href="/" style={{marginTop:10}}>
            <Text>Return to login</Text>
      </Link>
    </View>
  );
}

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(200, 200, 200, 0.1)',
  },

  forum : {
    flex: 1,
    maxHeight: screenHeight * 0.3,
  },

  tracker_collective: {
    flex: 1,
    flexDirection: 'column',
    height: screenHeight,
  },

  tracker_group: {
    flex: 1,
    flexDirection: 'row',
    height: screenHeight * 0.5,
  },

  tracker_container: {
    flex: 1,
    height: screenHeight * 0.2,
    padding: 10,
    backgroundColor: 'rgba(100, 160, 255, 0.5)',
    margin: 5,
    borderRadius: 10,
    borderColor: 'rgba(250, 250, 250, 0.2)',
    borderWidth: 0.5,
    //minWidth: '46%',
    //minHeight: '23%',
  },

  tracker_container_inner: {
    padding: 0,
  },

  tracker_container_Text: {
    fontSize: 20,
  },

  link: {
    marginTop: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: 3,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'rgba(250, 250, 250, 0.2)',
    overflow: 'hidden',
  },

  link_other: {
    backgroundColor: 'rgba(100, 160, 255, 0.5)',
    padding: 2,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'rgba(250, 250, 250, 0.2)',
    overflow: 'hidden',
    maxWidth: '25%',
    margin: '2%',
    textAlign: 'center'
  },

  notif_container: {
    margin: 7,
    borderRadius: 10,
    borderColor: 'rgba(250, 250, 250, 0.2)',
    borderWidth: 0.5,
    padding: 7,
    backgroundColor: 'rgba(100, 160, 255, 0.5)',
  },
});
