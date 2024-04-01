import { StyleSheet, ScrollView, useColorScheme } from "react-native";
import { Text } from "@/components/Themed";
import { Post } from "@/lib/Post";
import ForumPost from "./ForumPost";
import Colors from "@/lib/Colors";

type ForumPostListProps = {
  posts: Post[];
};

const ForumPostList = ({ posts }: ForumPostListProps) => {
  const colorScheme = useColorScheme();

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
    <ScrollView style={styles.scrollView}>
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
