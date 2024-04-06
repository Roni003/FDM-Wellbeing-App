import { Text, View } from "@/components/Themed";
import { Post } from "@/lib/Post";
import { Pressable, StyleSheet, useColorScheme } from "react-native";
import { router } from "expo-router";
import Colors from "@/lib/Colors";

type ForumPostProps = {
  post: Post;
};

const ForumPost = ({ post }: ForumPostProps) => {
  let date = new Date(post.created_at).toUTCString();
  const colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    container: {
      margin: 7,
      borderRadius: 10,
      borderColor:
        colorScheme === "light"
          ? Colors.light.borderColor
          : Colors.dark.borderColor,
      borderWidth: 0.5,
      padding: 10,
      backgroundColor:
        colorScheme === "light"
          ? Colors.light.cardBackground
          : Colors.dark.cardBackground,
    },
    title: {
      fontSize: 20,
      fontWeight: "600",
      marginBottom: 8,
    },
    content: {
      fontSize: 14,
      marginBottom: 10,
    },
    from: {
      fontSize: 15,
      alignSelf: "flex-end",
      paddingBottom: 8,
    },
    date: {
      fontSize: 12,
      alignSelf: "flex-end",
    },
  });

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        router.navigate({
          pathname: "/forumpost/[postid]",
          params: { postid: post.post_id },
        });
      }}
    >
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.content}>{post.content}</Text>
      <Text style={styles.from}>from {post.full_name}</Text>
      <Text style={styles.date}>Posted at: {date}</Text>
    </Pressable>
  );
};

export default ForumPost;
