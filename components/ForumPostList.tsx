import { StyleSheet, ScrollView } from "react-native";
import { Text } from "@/components/Themed";
import { Post } from "@/lib/Post";
import ForumPost from "./ForumPost";

type ForumPostListProps = {
  posts: Post[];
};

const ForumPostList = ({ posts }: ForumPostListProps) => {
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

const styles = StyleSheet.create({
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

export default ForumPostList;
