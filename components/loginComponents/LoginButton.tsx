import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import React from "react";

const loginButton = ({ pressHandler }) => {
  return (
    <TouchableHighlight style={styles.container} onPress={pressHandler}>
      <Text style={styles.text}>Login</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
  },
  container: {
    backgroundColor: "#3ec6ff",
    width: "50%",

    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
    padding: 13,
    marginVertical: 5,
    alignItems: "center",
  },
});

export default loginButton;
