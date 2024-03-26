import { StyleSheet, Button, TextInput, Alert } from "react-native";
import { Formik, Field, Form } from "formik";
import { supabase } from "@/lib/Supabase";
import React, { useState } from 'react';


import { Text, View } from "@/components/Themed";
import { Link } from "expo-router";

export default function TabThreeScreen() {

  const [titleError, setTitleError] = useState(false);
  const [bodyError, setBodyError] = useState(false);

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ title: "", body: "" }}
        onSubmit={async (values) => {
          supabase.auth.getSession().then(async ({ data: { session } }) => {

            if (!values.title || !values.body){

                Alert.alert('Fill in all Fields')

            }

            if (!values.title && !values.body) {
              setTitleError(true);
              setBodyError(true);
            }

            else if (!values.title ){
              setTitleError(true);
              setBodyError(false);

            }

            else if (!values.body ){
              setTitleError(false);
              setBodyError(true);
            }

            else{

              setTitleError(false);
              setBodyError(false);


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
              style={[styles.titleInput, styles.inputReset, titleError && styles.inputError]}
            />

            <TextInput
              multiline
              placeholder="Body"
              onChangeText={props.handleChange("body")}
              value={props.values.body}
              style={[styles.bodyInput, styles.inputReset, bodyError && styles.inputError]}
            />

            <Button title="submit" onPress={props.handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({

  inputReset: {
    borderColor: 'white',
  },

  inputError: {
    borderColor: 'red', 
  },

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
