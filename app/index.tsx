import { Button, StyleSheet, Pressable, Keyboard } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Text, View } from "@/components/Themed";
import { Link, router } from "expo-router";
import Auth from "@/components/Auth";
import { supabase } from "@/lib/Supabase";
import { redirectAfterLogin } from "@/lib/redirect";
import { updateClientRoleId } from "@/lib/auth";
import Colors from "@/lib/Colors";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

export default function Entry() {
  const [fontsLoaded, fontError] = useFonts({
    FDMFont: require("../assets/fonts/FDMFont.ttf"),
    Inter: require("../assets/fonts/Inter-Regular.ttf"),
    InterSemibold: require("../assets/fonts/Inter-SemiBold.ttf"),
  });

  SplashScreen.preventAutoHideAsync();

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

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

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.pressableContainer}
        onPress={() => Keyboard.dismiss()}
      >
        <Text style={styles.fdmHeader}>FDM</Text>
        <Text style={styles.nameHeader}>Fit Mind</Text>
        <Auth />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    paddingTop: "16%",
  },
  pressableContainer: {
    flex: 1,
  },
  fdmHeader: {
    fontFamily: "FDMFont",
    fontSize: 60,
    alignSelf: "center",
    paddingBottom: "4%",
    fontWeight: "700",
    color: Colors.dark.tint,
  },
  nameHeader: {
    fontFamily: "FDMFont",
    fontSize: 40,
    alignSelf: "center",
    fontWeight: "600",
    marginBottom: "12%",
  },
});
