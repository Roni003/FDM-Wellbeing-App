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
import { validateInputs } from "@/lib/auth";
import Colors from "@/lib/Colors";
import { Text } from "./Themed";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const colorScheme = useColorScheme();
  const textColor =
    colorScheme === "light" ? Colors.light.text : Colors.dark.text;

  async function signInWithEmail() {
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
    if (!validateInputs(email, password)) return;

    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 40,
      padding: 12,
    },
    verticallySpaced: {
      paddingTop: 4,
      paddingBottom: 4,
      alignSelf: "stretch",
    },
    mt15: {
      marginTop: 15,
    },
    buttons: {
      paddingTop: 4,
      paddingBottom: 4,
      alignSelf: "stretch",
      backgroundColor:
        colorScheme === "light"
          ? Colors.light.cardBackground
          : Colors.dark.cardBackground,
      borderRadius: 5,
      alignItems: "center",
      marginBottom: 8,
    },
    buttonText: {
      fontSize: 18,
      padding: 5,
    },
  });

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt15]}>
        <Input
          label="Email"
          leftIcon={{ type: "font-awesome", name: "envelope" }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={"none"}
          style={{ color: textColor }}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Password"
          leftIcon={{ type: "font-awesome", name: "lock" }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={"none"}
          style={{ color: textColor }}
        />
      </View>

      <TouchableHighlight
        style={[styles.buttons, styles.mt15]}
        disabled={loading}
        onPress={() => signInWithEmail()}
      >
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={styles.buttons}
        disabled={loading}
        onPress={() => signUpWithEmail()}
      >
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableHighlight>
    </View>
  );
}
