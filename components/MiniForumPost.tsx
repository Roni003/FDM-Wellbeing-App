import { Text } from "@/components/Themed";
import { Post } from "@/lib/Post";
import { Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";

type MiniForumPostProps = {
  post: Post;
};

const MiniForumPost = ({ post }: MiniForumPostProps) => {
  let date = new Date(post.created_at).toUTCString();
  // Didn't add who posted because would need another db query inside the map func, dk how to do that
  return (
    <Pressable
      style={styles.notif_container}
      onPress={() => {
        router.navigate({
          pathname: "/forumpost/[postid]",
          params: { postid: post.post_id },
        });
      }}
    >
      <Text>{post.title}</Text>
      <Text>@ {date}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  notif_container: {
    margin: 7,
    borderRadius: 10,
    borderColor: "rgba(250, 250, 250, 0.2)",
    borderWidth: 0.5,
    padding: 7,
    backgroundColor: "rgba(100, 160, 255, 0.5)",
  },
});

export default MiniForumPost;
