import React from "react";
import {Text, TouchableOpacity, StyleSheet} from "react-native";
import {COLORS} from "../constants";

const Button = ({title, onPress}) => {
  return (
    <TouchableOpacity style = {styles.button} onPress = {onPress}>
      <Text style = {styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.black,
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 14
  },
  text: {
    color: COLORS.white,
    fontSize: 16
  }
});

export default Button


