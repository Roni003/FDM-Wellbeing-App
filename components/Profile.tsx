import {
  StyleSheet,
  Image,
  Button,
  useColorScheme,
  TouchableHighlight,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Text, View } from "@/components/Themed";
import { signOut } from "@/lib/auth";
import { supabase } from "@/lib/Supabase";
import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";
import Colors from "@/lib/Colors";

export default function Profile() {
  const colorScheme = useColorScheme();

  const [name, setName] = useState("-");
  const [email, setEmail] = useState("Fetching...");
  const [id, setId] = useState("Fetching...");
  const [postCount, setPostCount] = useState(0);
  const [errorText, setErrorText] = useState("");

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchPosts = async (id: string) => {
        if (!id) return;

        try {
          const { data } = await supabase
            .from("forum_posts")
            .select("*")
            .eq("user_id", id);

          if (isActive) {
            setPostCount(data?.length);
          }
        } catch (err) {
          console.log(err);
        }
      };

      const fetchSession = async () => {
        try {
          const data = await supabase.auth.getSession();
          fetchPosts(data.data.session?.user.id);
          if (isActive) {
            setId(data.data.session?.user.id || "Failed to fetch user id");
            setEmail(data.data.session?.user.email || "Failed to fetch email");
            setName(data.data.session?.user.user_metadata.full_name || "-");
            setErrorText("");
            if (data.data.session == null && data.error == null)
              setErrorText("Not logged in");
          }
        } catch (err) {
          //setErrorText(err);
          console.log(err);
        }
      };

      fetchSession();

      return () => {
        isActive = false;
      };
    }, [])
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      width: "100%",
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
    },
    btn_container: {
      flex: 1,
      position: "absolute",
      bottom: "4%",
      padding: 2,
      borderRadius: 10,
      borderWidth: 0.8,
      borderColor:
        colorScheme === "light"
          ? Colors.light.text
          : "rgba(250, 250, 250, 0.2)",
      overflow: "hidden",
      width: "30%",
    },
    user: {
      width: "80%",
    },
    info: {
      margin: "1%",
      marginTop: "2%",
    },
    info_text: {
      marginLeft: "2%",
    },
    info_value: {
      fontSize: 17,
      fontWeight: "500",
      backgroundColor: "rgba(210, 210, 210, 0.3)",
      padding: "2%",
      margin: "1%",
      borderRadius: 5,
      borderWidth: 0.5,
      borderColor: "rgba(250, 250, 250, 0.2)",
      overflow: "hidden",
    },
    errorText: {
      color: "red",
      fontSize: 16,
      fontWeight: "600",
      paddingTop: 6,
    },
    signoutButton: {
      backgroundColor:
        colorScheme === "light"
          ? Colors.light.cardBackground
          : Colors.dark.cardBackground,
      alignContent: "center",
      justifyContent: "center",
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 7,
    },
    signoutButtonText: {
      fontWeight: "600",
      fontSize: 16,
      textAlign: "center",
      color: colorScheme === "light" ? Colors.light.tint : Colors.dark.tint,
    },
  });

  return (
    <View style={styles.container}>
      <FontAwesome5
        name="user-circle"
        size={88}
        color={
          colorScheme === "light" ? "rgba(0, 110, 255, 1)" : Colors.dark.tint
        }
      />

      <View style={styles.user}>
        <View style={styles.info}>
          <Text style={styles.info_text}>Name</Text>
          <Text style={styles.info_value}>{name}</Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.info_text}>Email Address</Text>
          <Text style={styles.info_value}>{email}</Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.info_text}>User ID</Text>
          <Text style={styles.info_value}>{id}</Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.info_text}>My Active Forum Posts</Text>
          <Text style={styles.info_value}>{postCount}</Text>
        </View>
      </View>
      <Text style={styles.errorText}>{errorText}</Text>

      <View style={styles.btn_container}>
        <TouchableHighlight onPress={signOut} style={styles.signoutButton}>
          <Text style={styles.signoutButtonText}>Sign out</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}
