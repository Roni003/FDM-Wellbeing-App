import { StyleSheet, Pressable, useColorScheme } from "react-native";
import { supabase } from "@/lib/Supabase";
import React, { useCallback, useState } from "react";

import { Post } from "@/lib/Post";
import { Text, View } from "@/components/Themed";
import { Link, useFocusEffect, router } from "expo-router";
import { globalStyles } from "@/lib/Styles";
import ForumPostList from "@/components/ForumPostList";
import Colors from "@/lib/Colors";

export default function ForumPage() {
  const colorScheme = useColorScheme();

  const [posts, setPosts] = useState<Array<Post>>([]);

  const fetchPosts = async (isActive: boolean) => {
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

  const refreshPosts = () => {
    fetchPosts(true);
  };

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      fetchPosts(isActive);

      return () => {
        isActive = false;
      };
    }, [])
  );

  const styles = StyleSheet.create({
    header: {
      ...globalStyles.header2,
      marginLeft: "1.5%",
      marginBottom: 6,
    },
    noPostsText: {
      alignSelf: "center",
      marginTop: 12,
      fontSize: 24,
    },
    addPostButton: {
      backgroundColor:
        colorScheme === "light"
          ? Colors.light.cardBackground
          : Colors.dark.cardBackground,
      padding: 10,
      borderRadius: 10,
      marginTop: 10,
      overflow: "hidden",
      alignItems: "center",
    },
    buttonText: {
      fontSize: 18,
      fontWeight: "600",
    },
  });

  return (
    <View style={globalStyles.container}>
      <Text style={styles.header}>Forum Posts</Text>
      <ForumPostList posts={posts} refreshPosts={refreshPosts} />
      <Pressable
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.6 : 1,
          },
          styles.addPostButton,
        ]}
        onPress={() => router.navigate("/forumpost/createPost")}
      >
        <Text style={styles.buttonText}>Add new Post</Text>
      </Pressable>
    </View>
  );
}
