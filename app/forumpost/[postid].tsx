import { StyleSheet, Button, TextInput, Alert, KeyboardAvoidingView, ScrollView, useColorScheme } from "react-native";
import { Formik, Field, Form } from "formik";



import Colors from "@/lib/Colors";
import { Text, View } from "@/components/Themed";
import { Link, useFocusEffect, useLocalSearchParams } from "expo-router";
import { globalStyles } from "@/lib/Styles";
import { supabase } from "@/lib/Supabase";
import { useCallback, useEffect, useState } from "react";
import { Post } from "@/lib/Post";
import { Reply } from "@/lib/Reply";
import BackButton from "@/components/BackButton";
import { color } from "react-native-elements/dist/helpers";
import { useNavigation } from '@react-navigation/native';



export default function SinglePost() {
  const colorScheme = useColorScheme();
  const tabstyle =  colorScheme === "light" ? styles.lightTab : styles.darkTab;

  

  const { postid } = useLocalSearchParams();
  const [post, setPost] = useState<Post>();
  const [date, setDate] = useState<string>();

  const[reply, setReply] = useState('');  
  const[replies, setReplies] = useState<Reply>();

  

  const formatDate = (timestamp: string | number | Date) => {
    const date = new Date(timestamp);
    return date.toDateString(); // or any other date formatting method you prefer
  };

// Inside your component or function where you need to access the userID


  
const handleDeletePost = () => {
  

  Alert.alert(
    'Delete Post',
    'Are you sure you want to DELETE this post?',
    [
      {
        text: 'YES', onPress: async () => {
          console.log("YES")
          console.log(postid)

          try {
            // Delete from post_replies table
            await supabase
              .from('post_replies')
              .delete()
              .eq('post_id', postid); 

            // Delete from forum_post table
            await supabase
              .from('forum_posts')
              .delete()
              .eq('post_id', postid);

            console.log("Post deleted successfully");
          } catch (error) {
            console.error("Error deleting post:", error);
          }
  
        },
      },
      {
        text: 'NO', onPress: () => {
          console.log("NO")
        },
      }
    ]
  );
};



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
                <View key={index} style={[styles.replyMessage]}>

                  <Text style = {styles.content}>{reply.content}</Text>
                  <Text style={styles.date}>Posted at: {formatDate(reply.created_at)}</Text>
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
              <View style = {styles.submitButtonContainer}>
                <Button title="Submit" onPress={props.handleSubmit} />
              </View>
              

              <View style={styles.deleteButtonContainer}>
                <Button title="Delete Post" onPress={handleDeletePost} />
              </View>

              
            </>



            )}

            

              </Formik>
          </KeyboardAvoidingView>

          
        </View>

  );
}

const styles = StyleSheet.create({
  lightTab:{
    backgroundColor:Colors.tabColors.light,
    
  },
  darkTab:{

  },

  submitButtonContainer:{
    backgroundColor: 'rgba(0, 255, 0, 0.3)', 
    borderRadius: 20, 
    padding: 5, 
    marginBottom: 10,
    marginTop:10,
  },

  deleteButtonContainer: {
    backgroundColor: 'rgba(255, 0, 0, 0.25)', 
    borderRadius: 20, 
    padding: 5, 
    marginBottom: 10, 
  },

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
    margin:10,
    padding:15,
    borderColor: "rgba(250, 250, 250, 0.2)",
    borderWidth: 0.5,
    backgroundColor: "rgba(100, 160, 255, 0.5)",
  },

  userReplyMessage:{
    backgroundColor:"red",
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