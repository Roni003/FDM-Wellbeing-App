import { Dimensions, ScrollView, StyleSheet, Pressable } from "react-native";

import { Text, View } from "@/components/Themed";
import { supabase } from "@/lib/Supabase";
import Tracker from "@/components/Tracker";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Post } from "@/lib/Post";
import MiniForumPost from "@/components/MiniForumPost";
import { globalStyles } from "@/lib/Styles";

export default function TabOneScreen() {
  const [posts, setPosts] = useState<Array<Post>>([]);

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

      fetchPosts();

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
              head="Todays steps"
              counter="0 steps"
              link="/tracker/step"
            />
            <Tracker
              head="Exercise today"
              counter="0 minutes"
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
        <Text style={styles.header}>Recent Forum Posts</Text>
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
  header: {
    ...globalStyles.header2,
    marginLeft: "1.5%",
    marginBottom: 4,
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

  noPostsText: {
    alignSelf: "center",
    marginTop: 12,
    fontSize: 24,
  },
});
