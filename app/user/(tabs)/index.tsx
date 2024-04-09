import { Dimensions, ScrollView, StyleSheet, Pressable } from "react-native";

import { Text, View } from "@/components/Themed";
import { supabase } from "@/lib/Supabase";
import Tracker from "@/components/Tracker";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Post } from "@/lib/Post";
import MiniForumPost from "@/components/MiniForumPost";
import { globalStyles } from "@/lib/Styles";

type TrackerData = {
  sleepTime: number;
  fitnessTime: number;
  meditationTime: number;
};

export default function TabOneScreen() {
  const [posts, setPosts] = useState<Array<Post>>([]);
  const [trackerData, setTrackerData] = useState<TrackerData>({
    sleepTime: 0,
    fitnessTime: 0,
    meditationTime: 0,
  });

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchPosts = async () => {
        try {
          const { data } = await supabase
            .from("forum_posts")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(5);
          if (isActive) {
            setPosts(data || []);
          }
        } catch (err) {
          console.log(err);
        }
      };

      const fetchTrackerData = async () => {
        const fetchsleepTime = async (userId: string, currentDate: string) => {
          const { data } = await supabase
            .from("sleep_details")
            .select("*")
            .eq("user_id", userId)
            .gte("created_at", `${currentDate} 00:00:00`)
            .lt("created_at", `${currentDate} 23:59:59`);
          console.log("sleep:", data);
          if (!data || data.length == 0) return;
          setTrackerData((oldVal) => {
            return {
              // Update only sleep time
              sleepTime: parseInt(data[0].sleep_time),
              fitnessTime: oldVal.fitnessTime,
              meditationTime: oldVal.meditationTime,
            };
          });
        };

        const fetchSessionsCompleted = async (
          userId: string,
          currentDate: string
        ) => {
          const { data } = await supabase
            .from("meditation_details")
            .select("*")
            .eq("user_id", userId)
            .gte("created_at", `${currentDate} 00:00:00`)
            .lt("created_at", `${currentDate} 23:59:59`);
          console.log("meditation details:", data);
          if (!data || data.length == 0) return;
          setTrackerData((oldVal) => {
            return {
              // Update only fitness time
              sleepTime: oldVal.sleepTime,
              fitnessTime: oldVal.fitnessTime,
              meditationTime: parseInt(data[0].sessions_completed),
            };
          });
        };


        const fetchfitnessTime = async (
          userId: string,
          currentDate: string
        ) => {
          const { data } = await supabase
            .from("fitness_details")
            .select("*")
            .eq("user_id", userId)
            .gte("created_at", `${currentDate} 00:00:00`)
            .lt("created_at", `${currentDate} 23:59:59`);
          console.log("fitness:", data);
          if (!data || data.length == 0) return;
          setTrackerData((oldVal) => {
            return {
              // Update only fitness time
              sleepTime: oldVal.sleepTime,
              fitnessTime: parseInt(data[0].fitness_time),
              meditationTime: oldVal.meditationTime,
            };
          });
        };

        const userData = await supabase.auth.getUser();
        const userId = userData.data.user.id;
        if (userId == null) return;

        const currentDate = new Date().toISOString().split("T")[0];
        fetchsleepTime(userId, currentDate);
        fetchfitnessTime(userId, currentDate);
        fetchSessionsCompleted(userId,currentDate);


      };

      fetchPosts();
      fetchTrackerData();

      return () => {
        isActive = false;
      };
    }, [])
  );

  return (
    <View style={globalStyles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.header}>Trackers</Text>

        <View style={styles.tracker_grid}>
          <View style={styles.tracker_row}>
            <Tracker
              head="Last night's sleep"
              counter={`${Math.floor(trackerData.sleepTime / 60)} hours ${
                trackerData.sleepTime -
                Math.floor(trackerData.sleepTime / 60) * 60
              } minutes`}
              link="/tracker/sleep"
            />
            <Tracker
              head="Exercise today"
              counter={`${trackerData.fitnessTime} minutes`}
              link="/tracker/fitness"
            />
          </View>
        </View>
        <Text style={styles.header}>Mental Wellbeing</Text>
        <View style={styles.tracker_row}>
          <Tracker
            head="Meditation & Mental Health"
            counter={`${trackerData.meditationTime} sessions today`}
            link="/tracker/meditation"
          />
        </View>
      </View>

      <View style={styles.forum}>
        <Text style={styles.header}>Recent Forum Posts</Text>
        <ScrollView
          style={{
            maxHeight: 160,
            borderRadius: 10,
            borderWidth: 0,
            borderColor: "white",
          }}
        >
          {!posts || posts.length == 0 ? (
            <Text style={styles.noPostsText}>No recent posts</Text>
          ) : (
            posts.map((post, index) => {
              return (
                <MiniForumPost key={post.post_id} post={post}></MiniForumPost>
              );
            })
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(200, 200, 200, 0.1)",
  },
  header: {
    ...globalStyles.header2,
    marginLeft: "1.5%",
    marginBottom: 4,
  },
  forum: {
    flex: 1,
    maxHeight: screenHeight * 0.27,
  },

  tracker_grid: {
    flex: 1,
    flexDirection: "column",
    height: screenHeight * 0.5,
    marginBottom: 6,
  },

  tracker_row: {
    flex: 1,
    flexDirection: "row",
  },

  noPostsText: {
    alignSelf: "center",
    marginTop: 12,
    fontSize: 24,
  },
});


