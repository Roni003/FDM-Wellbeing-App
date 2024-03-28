import { StyleSheet, Button, TextInput, Alert, ScrollView } from "react-native";
import { Formik, Field, Form } from "formik";
import { supabase } from "@/lib/Supabase";
import React, { useCallback, useState } from "react";

import { Post } from "@/lib/Post";
import { Text, View } from "@/components/Themed";
import { Link, useFocusEffect } from "expo-router";
import { globalStyles } from "@/lib/Styles";
import ForumPost from "@/components/ForumPost";

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
      <ScrollView style={styles.scrollView}>
        {!posts || posts.length == 0 ? (
          <Text style={styles.noPostsText}>No forum posts</Text>
        ) : (
          posts.map((post, index) => {
            return <ForumPost key={post.post_id} post={post}></ForumPost>;
          })
        )}
      </ScrollView>
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
});
