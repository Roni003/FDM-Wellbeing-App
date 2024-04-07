import { Button, StyleSheet, Pressable, Keyboard } from "react-native";
import React, { useEffect, useState } from "react";
import { Text, View } from "@/components/Themed";
import { Link, router } from "expo-router";
import Auth from "@/components/Auth";
import { supabase } from "@/lib/Supabase";
import { redirectAfterLogin } from "@/lib/redirect";
import { updateClientRoleId } from "@/lib/auth";
export default function Entry() {
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      redirectAfterLogin(session?.user.id);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      console.log(
        "Auth state changed, session user set to:",
        session?.user.email
      );

      updateClientRoleId(); // Stores the role of the user on the client to use later
      redirectAfterLogin(session?.user.id); // Redirect to home page
    });
  }, []);

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.pressableContainer}
        onPress={() => Keyboard.dismiss()}
      >
        <Text style={styles.welcomeText}>Welcome to Fit Mind</Text>
        <Auth />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    paddingTop: 50,
  },
  pressableContainer: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: "20%",
  },
});
