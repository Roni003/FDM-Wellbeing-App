import {
  StyleSheet,
  Button,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  useColorScheme,
  ScrollView,
} from "react-native";
import { Formik, Field, Form } from "formik";

import { Text, View } from "@/components/Themed";
import { Link, useFocusEffect, useLocalSearchParams } from "expo-router";
import { globalStyles } from "@/lib/Styles";
import { supabase } from "@/lib/Supabase";
import React, { useCallback, useEffect, useState } from "react";
import { Post } from "@/lib/Post";
import { Reply } from "@/lib/Reply";
import BackButton from "@/components/BackButton";
import Colors from "@/lib/Colors";
import { EvilIcons, FontAwesome } from "@expo/vector-icons";
import { err } from "react-native-svg";

export default function SinglePost() {
  const colorScheme = useColorScheme();
  const tabstyle = colorScheme === "light" ? styles.lightTab : styles.darkTab;

  const { postid } = useLocalSearchParams();
  const [post, setPost] = useState<Post>();
  const [date, setDate] = useState<string>();

  const [replies, setReplies] = useState<Reply>();

  const formatDate = (timestamp: string | number | Date) => {
    const date = new Date(timestamp);
    return date.toDateString();
  };

  function deletePost(post_id) {
    Alert.alert("Delete Post", "Are you sure you want to DELETE this post?", [
      {
        text: "YES",
        onPress: async () => {
          console.log("YES");
          console.log(postid);

          const { error } = await supabase
            .from("forum_posts")
            .delete()
            .eq("post_id", post_id)
            .select();

          if (error) {
            console.log(error);
          } else {
            console.log("Post deleted successfully");
          }
        },
      },
      {
        text: "NO",
        onPress: () => {
          console.log("pressed NO");
        },
      },
    ]);
  }

  const handleDeletePost = () => {
    Alert.alert("Delete Post", "Are you sure you want to DELETE this post?", [
      {
        text: "YES",
        onPress: async () => {
          console.log("YES");
          console.log(postid);

          try {
            // Delete from post_replies table
            await supabase.from("post_replies").delete().eq("post_id", postid);

            // Delete from forum_post table
            await supabase.from("forum_posts").delete().eq("post_id", postid);

            console.log("Post deleted successfully");
          } catch (error) {
            console.error("Error deleting post:", error);
          }
        },
      },
      {
        text: "NO",
        onPress: () => {
          console.log("NO");
        },
      },
    ]);
  };

  useFocusEffect(
    useCallback(() => {
      const postReplies = async () => {
        try {
          const { data, error } = await supabase
            .from("post_replies")
            .select("*")
            .eq("post_id", postid);

          if (error) {
            console.log(error);
            return;
          }

          if (data) {
            setReplies(data);
          }
        } catch (err) {
          console.error("Error fetching replies:", err);
        }
      };

      postReplies();
    }, [postid])
  );

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchPosts = async () => {
        try {
          const { data } = await supabase
            .from("forum_posts")
            .select("*")
            .eq("post_id", postid);

          if (isActive) {
            setPost(data[0]);
            setDate(new Date(data[0].created_at).toUTCString());
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
      {/* need to make the button redirect to the right page, check if user or ambassador etc */}
      <BackButton name="Login page" destination="/" />
      {post ? (
        <View style={styles.postContainer}>
          <View style={styles.postHeader}>
            <Text style={styles.title}>{post.title}</Text>
            <FontAwesome
              name="trash"
              size={28}
              style={styles.deleteButton}
              onPress={() => deletePost(post.post_id)}
            />
          </View>
          <Text style={styles.content}>{post.content}</Text>
          <Text style={styles.date}>Posted at: {date}</Text>
        </View>
      ) : (
        <Text>Fetching</Text>
      )}
      <ScrollView style={styles.repliesContainer}>
        {/* Make a component that takes in the post id as a prop, returns a scrollView 
              which contains a list of replies for the current post
            */}

        {replies && Array.isArray(replies) && replies.length > 0 ? (
          replies.map((reply, index) => (
            <View key={index} style={[styles.replyMessage]}>
              <Text style={styles.content}>{reply.content}</Text>
              <Text style={styles.date}>
                Posted at: {formatDate(reply.created_at)}
              </Text>
            </View>
          ))
        ) : (
          <Text>No replies available.</Text>
        )}
      </ScrollView>

      <KeyboardAvoidingView
        style={styles.replyFormcontainer}
        behavior="padding"
      >
        {/*Reply container, make a form here to post a reply to the form above*/}
        <Formik
          initialValues={{ replyMessage: "" }}
          onSubmit={async (values) => {
            supabase.auth.getSession().then(async ({ data: { session } }) => {
              if (!values.replyMessage) {
                Alert.alert("Fill in all Fields");
              } else {
                const { data, error } = await supabase
                  .from("post_replies")
                  .insert([
                    {
                      user_id: session?.user.id,
                      post_id: postid,
                      content: values.replyMessage,
                    },
                  ]);
              }
            });
          }}
        >
          {(props) => (
            <>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Reply to Post"
                  onChangeText={props.handleChange("replyMessage")}
                  value={props.values.replyMessage}
                  style={styles.replyInputField}
                />
                <FontAwesome
                  name="paper-plane"
                  size={28}
                  style={styles.submitButton}
                  onPress={props.handleSubmit}
                />
              </View>
            </>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  lightTab: {},
  darkTab: {},
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  submitButton: {
    color: "rgba(0, 210, 0, 0.9)",
    alignSelf: "center",
    padding: 5,
    marginBottom: 10,
  },

  deleteButton: {
    color: "rgba(255, 0, 0, 0.9)",
    alignSelf: "center",
    padding: 5,
    marginBottom: 10,
  },

  replyInputField: {
    backgroundColor: "rgba(100, 160, 255, 0.3)",
    color: "white",
    borderWidth: 1,
    borderColor: "rgba(250, 250, 250, 0.2)",
    padding: 10,
    borderRadius: 6,
    fontSize: 18,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
  },

  replyMessage: {
    margin: 10,
    padding: 15,
    borderColor: "rgba(250, 250, 250, 0.2)",
    borderWidth: 0.5,
    backgroundColor: "rgba(100, 160, 255, 0.5)",
  },

  userReplyMessage: {
    backgroundColor: "red",
  },

  postContainer: {
    flex: 1,
    margin: 7,
    marginTop: 12,
    borderRadius: 10,
    borderColor: "rgba(250, 250, 250, 0.2)",
    borderWidth: 0.5,
    padding: 10,
    backgroundColor: "rgba(100, 160, 255, 0.5)",
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
  date: {
    fontSize: 12,
    alignSelf: "flex-end",
    marginTop: "auto",
  },

  repliesContainer: {
    flex: 1,
  },

  replyFormcontainer: {},

  postHeader: {
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0)",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 10,
  },
});
