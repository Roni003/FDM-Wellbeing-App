import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Options = ({ options, selectedOption, onSelectOption }) => {
  return (
    <View style={styles.optionsContainer}>
      {options.map(option => (
        <TouchableOpacity
          key={option}
          style={[
            styles.option,
            selectedOption === option && styles.selectedOption
          ]}
          onPress={() => onSelectOption(option)}
        >
          <Text style={styles.optionText}>{option}</Text>
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
    borderColor: 'white',
    marginBottom: 10,
  },
  optionText: {
    fontSize: 15,
    color: 'white',
  },
});

export default Options;