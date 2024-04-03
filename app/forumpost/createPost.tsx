import { StyleSheet, Button, TextInput, Alert, useColorScheme, TouchableOpacity } from "react-native";
import { Formik, Field, Form } from "formik";
import { supabase } from "@/lib/Supabase";
import React, { useState } from "react";

import { Text, View } from "@/components/Themed";
import { Link, router } from "expo-router";
import BackButton from "@/components/BackButton";
import { err } from "react-native-svg";
import Colors from "@/lib/Colors";
import { globalStyles } from "@/lib/Styles";

export default function CreatePostForm() {
  const [titleError, setTitleError] = useState(false);
  const [bodyError, setBodyError] = useState(false);
  const [errorText, setErrorText] = useState("");

  const colorScheme = useColorScheme();
  const textColor =
    colorScheme === "light" ? Colors.light.text : Colors.dark.text;

  const styles = StyleSheet.create({
    inputReset: {
      borderColor: colorScheme === "light"
      ? Colors.light.text
      : Colors.dark.text,
    },
  
    inputError: {
      borderColor: "red",
    },
  
    label: {},
  
    titleInput: {
      backgroundColor:colorScheme === "light"
      ? Colors.light.cardBackground
      : Colors.dark.cardBackground,
      color: textColor,
      borderWidth: 1,
      borderColor: "#ddd",
      padding: 10,
      margin: 10,
      borderRadius: 6,
      fontSize: 18,
      width: '95%',
      alignItems: "center",
      justifyContent: "center",
    },
  
    bodyInput: {
      backgroundColor:colorScheme === "light"
      ? Colors.light.cardBackground
      : Colors.dark.cardBackground,
      color: textColor,
      borderWidth: 1,
      padding: 10,
      margin: 10,
      borderRadius: 6,
      fontSize: 18,
      width: '95%',
      height: '70%',
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
    button: {
      height: 50,
      width: '70%',
      marginVertical: 10,
      borderRadius: 8,
      backgroundColor: colorScheme === "light"
      ? Colors.light.cardBackground
      : Colors.dark.cardBackground,
      padding: 15,
      alignItems: 'center',
      alignSelf: 'center',
    },
    textStyle: {
      fontSize: 16,
      color: textColor,
    },
    placeholderText: {
      fontSize: 16,
      color: textColor,
    }
  });

  return (
    <View style={globalStyles.container}>
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
              placeholderTextColor={styles.placeholderText.color}
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
              placeholderTextColor={styles.placeholderText.color}
            />

            <Text style={styles.errorText}>{errorText}</Text>
            <TouchableOpacity style={styles.button} onPress={props.handleSubmit}>
              <Text style={styles.textStyle}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
}