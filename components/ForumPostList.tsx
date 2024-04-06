import {
  StyleSheet,
  ScrollView,
  useColorScheme,
  RefreshControl,
} from "react-native";
import { Text } from "@/components/Themed";
import { Post } from "@/lib/Post";
import ForumPost from "./ForumPost";
import Colors from "@/lib/Colors";
import { useCallback, useState } from "react";

type ForumPostListProps = {
  posts: Post[];
  refreshPosts: () => void;
};

const ForumPostList = ({ posts, refreshPosts }: ForumPostListProps) => {
  const colorScheme = useColorScheme();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refreshPosts();
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  const styles = StyleSheet.create({
    scrollView: {
      flex: 1,
      borderRadius: 10,
      borderWidth: 0,
      borderColor: "white",
      padding: 5,
      backgroundColor:
        colorScheme === "light"
          ? Colors.light.innerBackground
          : Colors.dark.innerBackground,
    },
    noPostsText: {
      alignSelf: "center",
      marginTop: 12,
      fontSize: 24,
    },
  });
  return (
    <ScrollView
      style={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {!posts || posts.length == 0 ? (
        <Text style={styles.noPostsText}>No forum posts</Text>
      ) : (
        posts.map((post, index) => {
          return <ForumPost key={post.post_id} post={post}></ForumPost>;
        })
      )}
    </ScrollView>
  );
};

export default ForumPostList;
