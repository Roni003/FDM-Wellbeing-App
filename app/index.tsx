import { Button, StyleSheet, Pressable, Keyboard } from "react-native";
import React, { useEffect, useState } from "react";
import { Text, View } from "@/components/Themed";
import { Link, router } from "expo-router";
import Auth from "@/components/Auth";
import { supabase } from "@/lib/Supabase";
import { signOut } from "@/lib/auth";
export default function Entry() {
  async function redirectUser(uid: string) {
    console.log("uid:", uid);
    if (uid == null) {
      console.log("No uid, redirecting to login page");
      router.navigate("/");
      return;
    }

    const { data: user_roles } = await supabase
      .from("user_roles")
      .select("*")
      .eq("user_id", uid);

    if (!user_roles || user_roles.length == 0 || user_roles[0].role_id == 0) {
      console.log("User is a consultant");
      router.navigate("/user/(tabs)/");
      return;
    }

    console.log("User is an ambassador");
    router.navigate("/ambassador/(tabs)/");
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      //console.log("Supabase session user:", session?.user.email);
      //setSession(session);
      redirectUser(session?.user.id);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      console.log(
        "Auth state changed, session user set to:",
        session?.user.email
      );
      //setSession(session);
      redirectUser(session?.user.id);
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

        <Button title="sign out (for testing)" onPress={signOut} />

        <Link replace href="/user/(tabs)">
          <Text>Link to user home page</Text>
        </Link>
        <Link replace href="/ambassador/(tabs)">
          <Text>Link to ambassador home page</Text>
        </Link>
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
