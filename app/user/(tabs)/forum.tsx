import { StyleSheet, Button, TextInput, Alert } from "react-native";
import { Formik, Field, Form } from "formik";
import { supabase } from "@/lib/Supabase";

import { Text, View } from "@/components/Themed";
import { Link } from "expo-router";

export default function TabThreeScreen() {
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ title: "", body: "" }}
        onSubmit={async (values) => {
          supabase.auth.getSession().then(async ({ data: { session } }) => {

            if (!values.title || !values.body){
                Alert.alert('Fill in all Fields')
            }

            else{

              const { data, error } = await supabase
              .from("forum_posts")
              .insert([
                {
                  title: values.title,
                  content: values.body,
                  user_id: session?.user.id,
                },
              ])
              .select();

            if (error) {
              console.log(error);
            }

            if (data) {
              console.log(data);
            }

            }

            
          });
        }}
      >
        {(props) => (
          <View>
            <TextInput
              placeholder="Title"
              onChangeText={props.handleChange("title")}
              value={props.values.title}
              style={styles.titleInput}
            />

            <TextInput
              multiline
              placeholder="Body"
              onChangeText={props.handleChange("body")}
              value={props.values.body}
              style={styles.bodyInput}
            />

            <Button title="submit" onPress={props.handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  label: {},

  titleInput: {
    color: "white",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    margin: 10,
    borderRadius: 6,
    fontSize: 18,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
  },

  bodyInput: {
    color: "white",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    margin: 10,
    borderRadius: 6,
    fontSize: 18,
    width: 150,
    height: 250,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
