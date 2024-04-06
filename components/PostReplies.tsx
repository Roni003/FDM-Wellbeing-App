import { ScrollView, useColorScheme, StyleSheet } from "react-native";
import Colors from "@/lib/Colors";
import { Text, View } from "@/components/Themed";
import React from "react";
import { Reply } from "@/lib/Reply";

const PostReplies = ({ replies }: { replies: Reply[] }) => {
  const colorScheme = useColorScheme();

  const formatDate = (timestamp: string | number | Date) => {
    const date = new Date(timestamp);
    return date.toDateString();
  };

  const styles = StyleSheet.create({
    replyMessage: {
      padding: 15,
      borderColor: "rgba(250, 250, 250, 0.2)",
      borderWidth: 0.5,
      borderRadius: 10,
      opacity: 0.8,
      marginTop: 10,
      backgroundColor:
        colorScheme === "light"
          ? Colors.light.cardBackground
          : Colors.dark.cardBackground,
    },

    userReplyMessage: {
      backgroundColor: "red",
    },

    title: {
      fontSize: 20,
      fontWeight: "600",
      marginBottom: 8,
    },
    content: {
      fontSize: 15,
      marginBottom: 10,
    },
    from: { fontSize: 14, alignSelf: "flex-end", paddingBottom: 8 },
    date: {
      fontSize: 12,
      alignSelf: "flex-end",
      marginTop: "auto",
      color: colorScheme === "light" ? Colors.light.tint : Colors.dark.tint,
    },

    repliesContainer: {
      flex: 1,
      margin: 6,
    },
  });

  return (
    <ScrollView style={styles.repliesContainer}>
      {/* Make a component that takes in the post id as a prop, returns a scrollView 
          which contains a list of replies for the current post
        */}

      {replies && Array.isArray(replies) && replies.length > 0 ? (
        replies.map((reply, index) => (
          <View key={index} style={[styles.replyMessage]}>
            <Text style={styles.content}>{reply.content}</Text>
            <Text style={styles.from}>from {reply.full_name}</Text>
            <Text style={styles.date}>
              Posted on: {formatDate(reply.created_at)}
            </Text>
          </View>
        ))
      ) : (
        <Text style={{ alignSelf: "center", paddingTop: 20, fontSize: 18 }}>
          No replies available.
        </Text>
      )}
    </ScrollView>
  );
};

export default PostReplies;
