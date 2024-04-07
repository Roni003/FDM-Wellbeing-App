import { StyleSheet, Pressable, useColorScheme } from "react-native";
import { supabase } from "@/lib/Supabase";
import React, { useCallback, useEffect, useState } from "react";

import { Post } from "@/lib/Post";
import { Text, View } from "@/components/Themed";
import { Link, useFocusEffect, router } from "expo-router";
import { globalStyles } from "@/lib/Styles";
import ForumPostList from "@/components/ForumPostList";
import Colors from "@/lib/Colors";

export default function ForumPage() {
  const colorScheme = useColorScheme();

  const [postsAscending, setPostsAscending] = useState(false); // newest on top
  const [posts, setPosts] = useState<Array<Post>>([]);

  const fetchPosts = async (isActive: boolean) => {
    console.log("fetching");

    try {
      const { data } = await supabase
        .from("forum_posts")
        .select("*")
        .order("created_at", { ascending: postsAscending });

      if (isActive) {
        setPosts(data || []);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPosts(true);
  }, [postsAscending]);

  function handleOrderPress() {
    setPostsAscending((val) => !val);
  }

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
    headerContainer: {
      flexDirection: "row",
      alignContent: "center",
      justifyContent: "space-between",
      marginLeft: "1.5%",
      marginBottom: 10,
    },
    filterContainer: {
      marginRight: 6,
      borderRadius: 8,
      alignContent: "center",
      justifyContent: "center",
      paddingVertical: 10,
      paddingHorizontal: 14,
      backgroundColor:
        colorScheme === "light"
          ? //Light
            postsAscending
            ? Colors.light.innerBackground
            : Colors.light.lowOpacityTint
          : //Dark
          postsAscending
          ? Colors.dark.innerBackground
          : Colors.dark.lowOpacityTint,
    },
    filterText: {
      fontWeight: "500",
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
      <View style={styles.headerContainer}>
        <Text style={globalStyles.header2}>Forum Posts</Text>
        <Pressable style={styles.filterContainer} onPress={handleOrderPress}>
          <Text style={styles.filterText}>
            {postsAscending ? "Oldest" : "Newest"} first
          </Text>
        </Pressable>
      </View>
      <ForumPostList
        posts={posts}
        refreshPosts={() => {
          setPostsAscending(false);
          fetchPosts(true);
        }}
      />
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
