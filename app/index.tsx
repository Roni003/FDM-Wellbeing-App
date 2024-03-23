import { Button, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Text, View } from "@/components/Themed";
import { Link } from "expo-router";
import Auth from "@/components/Auth";
import { supabase } from "@/lib/Supabase";
import { Session } from "@supabase/supabase-js";
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
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Supabase session user:", session?.user.email);
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      console.log(
        "Auth state changed, session user set to:",
        session?.user.email
      );
      setSession(session);
    });
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to Fit Mind</Text>
      <Auth />

      <Button title="sign out (for testing)" onPress={signOut} />

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
    padding: 30,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: "20%",
  },
});
