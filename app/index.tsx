import { Alert, StyleSheet, useWindowDimensions } from "react-native";
import React, { useState } from "react";
import { Text, View } from "@/components/Themed";
import { Link, router } from "expo-router";
import LoginInputs from "@/components/loginComponents/LoginInputs";
import LoginButton from "@/components/loginComponents/LoginButton";
import SUPABASE_ANON_KEY from "@/constants/Supabase";
export default function Entry() {
  // When user loads in, if authentiacted, get role from db

  // If role == fdm
  // router.replace(/user/(tabs))

  // If role == ambassador
  // router.replace(/ambassador/(tabs))

  // this will be login page, user stays here if theyre not authed,
  // then gets redirected to home page after login

  // use height to set a logo (if need be)
  //const { height } = useWindowDimensions();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handlePress() {
    if (!validateEmail(email)) {
      Alert.alert("Please enter a valid email address");
      return;
    }
    if (!validatePassword(password)) {
      Alert.alert("Please a password that is 5 characters or longer");
      return;
    }

    login(email, password);
  }

  function login(email: string, password: string): void {}

  // Kinda pointless for login, just so it can be used later for register
  function validatePassword(val: string): boolean {
    if (val == null || val.length < 5) return false;
    return true;
  }

  function validateEmail(email: string) {
    const atIndex = email.indexOf("@");
    if (atIndex === -1 || atIndex === 0 || atIndex === email.length - 1) {
      return false;
    }

    const domain = email.substring(atIndex + 1);
    if (domain.indexOf(".") === -1) {
      return false;
    }

    return true;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to Fit Mind</Text>

      <LoginInputs
        setValue={setEmail}
        placeholder="Email address"
        secureTextEntry={false}
      />
      <LoginInputs
        setValue={setPassword}
        placeholder="Password"
        secureTextEntry={true}
      />

      <LoginButton pressHandler={handlePress} />

      <Link replace href="/user/(tabs)">
        <Text>Link to user home page</Text>
      </Link>
      <Link replace href="/ambassador/(tabs)">
        <Text>Link to ambassador home page</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: "20%",
  },
});
