import { StyleSheet, Button, TextInput, Alert } from "react-native";
import { Formik, Field, Form } from "formik";
import { supabase } from "@/lib/Supabase";
import React, { useState } from "react";

import { Text, View } from "@/components/Themed";
import { Link, router } from "expo-router";
import BackButton from "@/components/BackButton";
import { err } from "react-native-svg";

export default function CreatePostForm() {
  const [titleError, setTitleError] = useState(false);
  const [bodyError, setBodyError] = useState(false);
  const [errorText, setErrorText] = useState("");

  return (
    <View style={styles.container}>
      <BackButton destination={"/"} name={"home page"} />
      <Formik
        initialValues={{ title: "", body: "" }}
        onSubmit={async (values) => {
          if (!values.title) {
            setTitleError(true);
            Alert.alert("Fill in the title field");
            return;
          }
          setTitleError(false);

          if (!values.body) {
            setBodyError(true);
            Alert.alert("Fill in the body field");
            return;
          }
          setBodyError(false);

          supabase.auth.getSession().then(async ({ data: { session } }) => {
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
              setErrorText("Failed to submit form");
            }

            if (data) {
              setErrorText("");
              console.log("Inserted new post: ", data);
              router.navigate("/");
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
              style={[
                styles.titleInput,
                styles.inputReset,
                titleError && styles.inputError,
              ]}
            />

            <TextInput
              multiline
              placeholder="Body"
              onChangeText={props.handleChange("body")}
              value={props.values.body}
              style={[
                styles.bodyInput,
                styles.inputReset,
                bodyError && styles.inputError,
              ]}
            />

            <Text style={styles.errorText}>{errorText}</Text>
            <Button title="submit" onPress={props.handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  inputReset: {
    borderColor: "white",
  },

  inputError: {
    borderColor: "red",
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  label: {},
  errorText: {
    color: "red",
    fontWeight: "600",
    fontSize: 16,
  },

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
