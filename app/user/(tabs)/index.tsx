import { Dimensions, ScrollView, StyleSheet, Pressable } from "react-native";

import { Text, View } from "@/components/Themed";
import { supabase } from "@/lib/Supabase";
import Tracker from "@/components/Tracker";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Post } from "@/lib/Post";
import MiniForumPost from "@/components/MiniForumPost";

export default function TabOneScreen() {
  const [posts, setPosts] = useState<Array<Post>>([]);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchPosts = async () => {
        try {
          const { data } = await supabase.from("forum_posts").select("*");
          if (isActive) {
            setPosts(data || []);
          }
        } catch (err) {
          console.log(err);
        }
      };

      fetchPosts();

      return () => {
        isActive = false;
      };
    }, [])
  );

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <View style={{ marginTop: "10%", flex: 1 }}>
        <Text
          style={{
            fontSize: 25,
            marginLeft: "1%",
            paddingBottom: 5,
            fontWeight: "600",
          }}
        >
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
        <Text style={{ fontSize: 25, marginLeft: "1%", fontWeight: "600" }}>
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

  noPostsText: {
    alignSelf: "center",
    marginTop: 12,
    fontSize: 24,
  },
});
