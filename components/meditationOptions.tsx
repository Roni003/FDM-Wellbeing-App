import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, useColorScheme } from 'react-native';
import Colors from "@/lib/Colors";


const Options = ({ options, selectedOption, onSelectOption }) => {
  const colorScheme = useColorScheme();
  const themeColors = colorScheme === "light" ? Colors.light : Colors.dark;
  return (
    <View style={[styles.optionsContainer]}>
      {options.map(option => (
        <TouchableOpacity
          key={option}
          style={[
            styles.option,
            selectedOption === option && { borderColor: themeColors.text },
            selectedOption === option && styles.selectedOption
          ]}
          onPress={() => onSelectOption(option)}
        >
          <Text style={[styles.optionText, { color: themeColors.text }]}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  optionsContainer: {
    flexDirection: 'row',
  },
  option: {
    paddingHorizontal: 0,
    marginHorizontal: 15,
    borderBottomWidth: 2,
    borderColor: 'transparent',
  },
  selectedOption: {
    //borderColor: 'black',
    marginBottom: 10,
  },
  optionText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default Options;