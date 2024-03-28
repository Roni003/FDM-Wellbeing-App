import { StyleSheet, Pressable } from "react-native";
import { supabase } from "@/lib/Supabase";
import React, { useCallback, useState } from "react";

import { Post } from "@/lib/Post";
import { Text, View } from "@/components/Themed";
import { Link, useFocusEffect, router } from "expo-router";
import { globalStyles } from "@/lib/Styles";
import ForumPostList from "@/components/ForumPostList";

export default function TabThreeScreen() {
  const [posts, setPosts] = useState<Array<Post>>([]);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchPosts = async () => {
        try {
          const { data } = await supabase
            .from("forum_posts")
            .select("*")
            .order("created_at", { ascending: false });

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
      <Text style={styles.header}>Forum Posts</Text>
      <Pressable style={({ pressed }) => [
                    { backgroundColor: pressed ? 'rgba(100, 160, 255, 0.5)' : 'rgba(100, 160, 255, 0.1)'},
                    styles.pressable
                ]} onPress={() => router.navigate('/forumpost/createPost')}>
        <Text style={styles.buttonText}>Create Post</Text>
      </Pressable>
      <ForumPostList posts={posts} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    ...globalStyles.header2,
    marginLeft: "1.5%",
    marginBottom: 4,
  },
  scrollView: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 0,
    borderColor: "white",
    padding: 5,
    backgroundColor: "rgba(100, 120, 220, 0.1)",
  },
  noPostsText: {
    alignSelf: "center",
    marginTop: 12,
    fontSize: 24,
  },
  pressable: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
  },
});
