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
import {
  Link,
  router,
  useFocusEffect,
  useLocalSearchParams,
} from "expo-router";
import { globalStyles } from "@/lib/Styles";
import { supabase } from "@/lib/Supabase";
import React, { useCallback, useEffect, useState } from "react";
import { Post } from "@/lib/Post";
import { Reply } from "@/lib/Reply";
import BackButton from "@/components/BackButton";
import Colors from "@/lib/Colors";
import { EvilIcons, FontAwesome } from "@expo/vector-icons";
import { err } from "react-native-svg";
import PostReplies from "@/components/PostReplies";

export default function SinglePost() {
  const colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    container: {
      ...globalStyles.container,
      paddingBottom: "8%",
    },

    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
    },

    submitButton: {
      color: colorScheme === "light" ? Colors.light.tint : Colors.dark.tint,
      opacity: 0.8,
      alignSelf: "center",
      padding: 5,
      marginBottom: 10,
    },

    deleteButton: {
      color: colorScheme === "light" ? Colors.light.text : Colors.dark.text,
      opacity: 0.7,
      alignSelf: "center",
      padding: 5,
      marginBottom: 10,
    },

    miniHeader: {
      fontWeight: "500",
      fontSize: 20,
      padding: 8,
    },
    replyInputField: {
      backgroundColor:
        colorScheme === "light"
          ? Colors.light.cardBackground
          : Colors.dark.cardBackground,
      color: colorScheme === "light" ? Colors.light.text : Colors.dark.text,
      borderWidth: 1,
      borderColor:
        colorScheme === "light"
          ? Colors.light.borderColor
          : Colors.dark.borderColor,
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
      margin: 6,
      marginTop: 12,
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
      marginTop: "auto",
    },
    date: {
      fontSize: 12,
      alignSelf: "flex-end",
    },

    repliesContainer: {
      flex: 1,
      margin: 6,
    },

    replyFormcontainer: {
      padding: 4,
      paddingBottom: 20,
    },

    postHeader: {
      flexDirection: "row",
      backgroundColor: "rgba(0,0,0,0)",
      alignItems: "center",
      justifyContent: "space-between",
      paddingRight: 10,
    },
  });

  const { postid } = useLocalSearchParams();
  const [post, setPost] = useState<Post>();
  const [date, setDate] = useState<string>();
  const [userId, setUserId] = useState("");
  const [replies, setReplies] = useState<Reply>();

  const formatDate = (timestamp: string | number | Date) => {
    const date = new Date(timestamp);
    return date.toDateString();
  };

  const fetchReplies = async () => {
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

  const fetchPosts = async (isActive: boolean) => {
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

  function deletePost(post_id) {
    Alert.alert("Delete Post", "Are you sure you want to DELETE this post?", [
      {
        text: "YES",
        onPress: async () => {
          console.log("Attemting to delete post, ID:", postid);

          const { error } = await supabase
            .from("forum_posts")
            .delete()
            .eq("post_id", post_id)
            .select();

          if (error) {
            console.log(error);
          } else {
            console.log("Post deleted successfully");
            router.navigate("/user/(tabs)/forum");
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

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      const setId = async () => {
        const data = await supabase.auth.getSession();
        setUserId(data.data.session?.user.id || "");
      };

      setId();
      fetchReplies();
      fetchPosts(isActive);

      return () => {
        isActive = false;
      };
    }, [postid])
  );

  return (
    <View style={styles.container}>
      {/* need to make the button redirect to the right page, check if user or ambassador etc */}
      <BackButton name="Login page" destination="/" />
      {post ? (
        <View style={styles.postContainer}>
          <View style={styles.postHeader}>
            <Text style={styles.title}>{post.title}</Text>
            {/* Need to only render this if user id matches post user id */}
            {post && post.user_id == userId ? (
              <FontAwesome
                name="trash"
                size={28}
                style={styles.deleteButton}
                onPress={() => deletePost(post.post_id)}
              />
            ) : (
              <View></View>
            )}
          </View>
          <Text style={styles.content}>{post.content}</Text>
          <Text style={styles.from}>from {post.full_name}</Text>
          <Text style={styles.date}>Posted at: {date}</Text>
        </View>
      ) : (
        <Text>Fetching</Text>
      )}

      <Text style={styles.miniHeader}>Replies</Text>
      <PostReplies replies={replies} />

      <KeyboardAvoidingView
        style={styles.replyFormcontainer}
        behavior="padding"
      >
        <Formik
          initialValues={{ replyMessage: "" }}
          onSubmit={async (values, { resetForm }) => {
            supabase.auth.getSession().then(async ({ data: { session } }) => {
              if (!values.replyMessage) {
                Alert.alert("Cannot reply with an empty message");
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
                if (error) {
                  console.log(error);
                } else {
                  resetForm();
                  Alert.alert("Replied to post!");
                  fetchReplies();
                }
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
