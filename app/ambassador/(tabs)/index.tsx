import { StyleSheet, Button, TouchableOpacity } from "react-native";

import { Text, View } from "@/components/Themed";
import { Link, useFocusEffect } from "expo-router";
import { supabase } from "@/lib/Supabase";
import { useCallback, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { globalStyles } from "@/lib/Styles";
import ForumPostList from "@/components/ForumPostList";

export default function TabOneScreen() {
  const [posts, setPosts] = useState<Array<Post>>([]);

  const navigation = useNavigation();

  const [fetchError, setFetchError] = useState(null);
  const [forum, setForum] = useState<any[] | null>(null);

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
});
