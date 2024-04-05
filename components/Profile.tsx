import { StyleSheet, Image, Button } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Text, View } from "@/components/Themed";
import { signOut } from "@/lib/auth";
import { supabase } from "@/lib/Supabase";
import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";

export default function Profile() {
  const [name, setName] = useState("-");
  const [email, setEmail] = useState("Fetching...");
  const [id, setId] = useState("Fetching...");
  const [postCount, setPostCount] = useState(0);
  const [errorText, setErrorText] = useState("");

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchPosts = async () => {
        try {
          const { data } = await supabase.from("forum_posts").select("*");
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
          if (isActive) {
            setId(data.data.session?.user.id || "Failed to fetch user id");
            setEmail(data.data.session?.user.email || "Failed to fetch email");
            setErrorText("");
            if (data.data.session == null && data.error == null)
              setErrorText("Not logged in");
          }
        } catch (err) {
          //setErrorText(err);
          console.log(err);
        }
      };

      const fetchName = async () => {
        try {
          const sesh = await supabase.auth.getSession();
          const id = sesh.data.session?.user.id;
          if (!id) return;

          if (isActive) {
            const { data, error } = await supabase
              .from("profiles")
              .select("*")
              .eq("id", id);

            if (error) {
              console.log(error);
            } else {
              if (data.length > 0) setName(data[0].full_name);
            }
          }
        } catch (error) {
          console.log(error);
        }
      };

      fetchName();
      fetchPosts();
      fetchSession();

      return () => {
        isActive = false;
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      <FontAwesome5
        name="user-circle"
        size={80}
        color={"rgba(0, 110, 255, 1)"}
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
          <Text style={styles.info_text}>Active Forum Posts</Text>
          <Text style={styles.info_value}>{postCount}</Text>
        </View>
      </View>
      <Text style={styles.errorText}>{errorText}</Text>

      <View style={styles.btn_container}>
        <Button title="Sign Out" onPress={signOut} />
      </View>
    </View>
  );
}

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
    bottom: "2%",
    backgroundColor: "rgba(250, 250, 250, 0.1)",
    padding: 2,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "rgba(250, 250, 250, 0.2)",
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
});
