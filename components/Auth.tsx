import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
  useColorScheme,
  TouchableHighlight,
} from "react-native";
import { supabase } from "@/lib/Supabase";
import { Button, Input, colors } from "react-native-elements";
import { validateInputs, validateName } from "@/lib/auth";
import Colors from "@/lib/Colors";
import { Text } from "./Themed";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

export default function Auth() {
  const [pageState, setPageState] = useState("login"); // "login" or "signup"

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const colorScheme = useColorScheme();
  const textColor =
    colorScheme === "light" ? Colors.light.text : Colors.dark.text;

  async function signInWithEmail() {
    if (pageState === "signup") {
      setPageState("login");
      return;
    }
    if (!validateInputs(email, password)) return;

    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    if (pageState === "login") {
      setPageState("signup");
      return;
    }
    if (!validateInputs(email, password)) return;
    if (!validateName(name)) return;

    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    if (error) {
      Alert.alert(error.message);
      console.log(error);
    }
    if (!session)
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 12,
    },
    usernameFieldPlaceholder: {
      height: 92,
    },
    verticallySpaced: {
      paddingTop: 4,
      paddingBottom: 4,
      alignSelf: "stretch",
    },
    mt15: {
      marginTop: 15,
    },
    iconStyles: {
      color: colorScheme === "light" ? Colors.light.text : Colors.dark.text,
      fontSize: 24,
      paddingRight: 5,
    },
    loginButton: {
      paddingTop: 4,
      paddingBottom: 4,
      alignSelf: "stretch",
      backgroundColor:
        colorScheme === "light"
          ? Colors.light.cardBackground
          : Colors.dark.cardBackground,
      borderColor:
        colorScheme === "light" ? Colors.light.text : Colors.dark.tint,
      borderRadius: 5,
      alignItems: "center",
      marginBottom: 8,
      borderWidth: pageState === "login" ? 2 : 0,
      opacity: pageState === "login" ? 1 : 0.65,
    },
    signupButton: {
      paddingTop: 4,
      paddingBottom: 4,
      alignSelf: "stretch",
      backgroundColor:
        colorScheme === "light"
          ? Colors.light.cardBackground
          : Colors.dark.cardBackground,
      borderColor:
        colorScheme === "light" ? Colors.light.text : Colors.dark.tint,
      borderRadius: 5,
      alignItems: "center",
      marginBottom: 8,
      borderWidth: pageState === "signup" ? 2 : 0,
      opacity: pageState === "signup" ? 1 : 0.65,
    },
    buttonText: {
      fontSize: 18,
      padding: 5,
    },
  });

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt15]}>
        {pageState === "signup" ? (
          <Input
            label="Full name"
            leftIcon={<FontAwesome name="user" style={styles.iconStyles} />}
            onChangeText={(text) => setName(text)}
            value={name}
            placeholder="John Doe"
            autoCapitalize={"words"}
            style={{ color: textColor }}
          />
        ) : (
          <View style={styles.usernameFieldPlaceholder}></View>
        )}
        <Input
          label="Email"
          leftIcon={<FontAwesome name="envelope" style={styles.iconStyles} />}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="john.doe@fdmgroup.com"
          autoCapitalize={"none"}
          style={{ color: textColor }}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Password"
          leftIcon={<FontAwesome name="lock" style={styles.iconStyles} />}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={"none"}
          style={{ color: textColor }}
        />
      </View>

      <TouchableHighlight
        style={[styles.loginButton, styles.mt15]}
        disabled={loading}
        onPress={() => signInWithEmail()}
      >
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={styles.signupButton}
        disabled={loading}
        onPress={() => signUpWithEmail()}
      >
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableHighlight>
    </View>
  );
}
