import { StyleSheet, Button, TextInput, Alert, KeyboardAvoidingView, ScrollView } from "react-native";
import { Formik, Field, Form } from "formik";



import { Text, View } from "@/components/Themed";
import { Link, useFocusEffect, useLocalSearchParams } from "expo-router";
import { globalStyles } from "@/lib/Styles";
import { supabase } from "@/lib/Supabase";
import { useCallback, useEffect, useState } from "react";
import { Post } from "@/lib/Post";
import { Reply } from "@/lib/Reply";
import BackButton from "@/components/BackButton";

export default function SinglePost() {
  const { postid } = useLocalSearchParams();
  const [post, setPost] = useState<Post>();
  const [date, setDate] = useState<string>();

  const[reply, setReply] = useState('');
  const[replies, setReplies] = useState<Reply>();

    

  useFocusEffect(
    useCallback(() => {
      const postReplies = async () => {
        try {
          const { data, error } = await supabase
            .from('post_replies')
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


    

        <View style={globalStyles.container} >
          {/* need to make the button redirect to the right page, check if user or ambassador etc */}
          <BackButton name="Login page" destination="/" />
          {post ? (
            <View style={styles.postContainer}>
              <Text style={styles.title}>{post.title}</Text>
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
                <View style = { styles.replyMessage}>
                  <Text key={index}>{reply.content}</Text>
                </View>
                
                
              ))
            ) : (
              <Text>No replies available.</Text>
            )}
          </ScrollView>
         



          <KeyboardAvoidingView style={styles.replyFormcontainer} behavior="padding">
            
              {/*Reply container, make a form here to post a reply to the form above*/}
              <Formik
        initialValues={{ replyMessage: ''}}
        onSubmit={async (values) => {
          supabase.auth.getSession().then(async ({ data: { session } }) => {

            if (!values.replyMessage) {
              Alert.alert("Fill in all Fields");
            }

            else{

              const { data, error } = await supabase
              .from("post_replies")
                  .insert([
                    {
                      user_id: session?.user.id,
                      post_id:postid,
                      content: values.replyMessage,
                    },
                  ])

            }
            
            }
          );
        }}
      >

            {(props) => (
              
              <>
              <TextInput
                placeholder="Reply to Post"
                onChangeText={props.handleChange("replyMessage")}
                value={props.values.replyMessage}
                style={styles.replyInputField}
              />
              <Button title="Submit" onPress={props.handleSubmit} />
            </>



            )}

            

              </Formik>
          </KeyboardAvoidingView>
        </View>

  );
}

const styles = StyleSheet.create({

  replyInputField: {
    backgroundColor: "rgba(100, 160, 255, 0.3)",
    color: "white",
    borderWidth: 1,
    borderColor: "rgba(250, 250, 250, 0.2)",
    padding:10,
    borderRadius: 6,
    fontSize: 18,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  replyMessage: {
    backgroundColor : 'red',
    margin:10,
    padding:15,
  },


  postContainer: {
    flex: 1,
    margin: 7,
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

  replyFormcontainer: {
    flex: 1,
  },
});