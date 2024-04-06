import { Text } from "@/components/Themed";
import { Post } from "@/lib/Post";
import { Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import Colors from "@/lib/Colors";
import { useColorScheme } from "react-native";
import { color } from "react-native-elements/dist/helpers";

type MiniForumPostProps = {
  post: Post;
};

const MiniForumPost = ({ post }: MiniForumPostProps) => {
  let date = new Date(post.created_at).toUTCString();
  const colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    notif_container: {
      margin: 7,
      borderRadius: 10,
      borderColor:
        colorScheme === "light"
          ? Colors.light.borderColor
          : Colors.dark.borderColor,
      borderWidth: 0.5,
      padding: 7,
      backgroundColor:
        colorScheme === "light"
          ? Colors.light.cardBackground
          : Colors.dark.cardBackground,
    },
  });
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

export default MiniForumPost;
