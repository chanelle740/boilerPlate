import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";

export default function SubmitButton(props) {
  const { title, onPress } = props;

  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    backgroundColor: "#4361EE",
    width: 350,
    padding: 15,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    letterSpacing: 0.25,
    // fontFamily: "urbanist-bold",
  },
});