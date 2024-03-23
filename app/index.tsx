import { StyleSheet, useWindowDimensions } from "react-native";
import React, {useState} from "react";
import { Text, View } from "@/components/Themed";
import { Link, router } from "expo-router";
import LoginInputs from "@/components/loginComponents/LoginInputs";
import LoginButton from "@/components/loginComponents/LoginButton";
export default function Entry() {
  // When user loads in, if authentiacted, get role from db

  // If role == fdm
  // router.replace(/user/(tabs))

  // If role == ambassador
  // router.replace(/ambassador/(tabs))

  // this will be login page, user stays here if theyre not authed,
  // then gets redirected to home page after login

  // use height to set a logo (if need be)
  const {height} = useWindowDimensions();

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to Fit Mind</Text>
      <LoginInputs placeholder="Email address" secureTextEntry={false} />
      <LoginInputs placeholder="Password" secureTextEntry={true} />
      <LoginButton />
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
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: '20%',
  }
});
