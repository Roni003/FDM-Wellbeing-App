import { StyleSheet, Button, TouchableOpacity} from "react-native";

import { Text, View } from "@/components/Themed";
import { Link } from "expo-router";
import { supabase } from "@/lib/Supabase";
import { useEffect,useState } from "react";
import { useNavigation } from '@react-navigation/native';




export default function TabOneScreen() {

  const navigation = useNavigation();


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

        <TouchableOpacity onPress={() => {
          // navigate to fullscreen page
        }}>
        
          <Text style={styles.forumPost}>
            <Text style={styles.title}>{forum.title}</Text>
            <Text style={styles.content}>{"\n"}{forum.content} </Text>
            
          </Text>

        </TouchableOpacity>
        
      ))}
    </View>
    <Link href="/">
      <Text>Link</Text>
    </Link>
  </View>
  );
}

const styles = StyleSheet.create({

  title:{
    fontSize: 25,
    textAlign:"center",
  },

  content:{
    fontSize:12,


  },

  forumPost: {
    minWidth:350,
    padding: 10,
    margin:10,
    borderColor: 'red',
    borderWidth: 2,
    borderRadius:20, 
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
