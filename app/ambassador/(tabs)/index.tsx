import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { Link } from "expo-router";
import { supabase } from "@/lib/Supabase";
import { useEffect,useState } from "react";



export default function TabOneScreen() {

  const[fetchError, setFetchError] = useState(null)
  const[forum, setForum] = useState<any[] | null>(null);

  useEffect(() => {

    const fetchForums = async () => {
      const { data, error } = await supabase
      .from("forum_posts")
      .select()

      if (error) {
        console.log(error)
      }

      if (data) {
        
        console.log(data)
        setForum(data);
      }


    }

    fetchForums()

  }, [])

  return (
    <View style={styles.container}>
    <Text >Ambassador home page (Forum)</Text>
    <View >
      {forum && forum.map(forum => (
        <Text style = {styles.forumPost}>{forum.title}, {forum.content}</Text>
      ))}
    </View>
    <Link href="/">
      <Text>Link</Text>
    </Link>
  </View>
  );
}

const styles = StyleSheet.create({

  forumPost: {
    padding: 10,
    margin:10,
    borderColor: 'red',
    borderWidth: 1, 
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
