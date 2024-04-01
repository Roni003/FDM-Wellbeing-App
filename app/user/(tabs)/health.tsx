import { StyleSheet, TextInput, TouchableOpacity, Alert, useColorScheme } from 'react-native'
import { View, Text } from "@/components/Themed";
import React, { useState } from 'react'
import { globalStyles } from '@/lib/Styles'
import Colors from '@/lib/Colors'
import { Input } from 'react-native-elements';

export default function health() {
  const colorScheme = useColorScheme();
  const textColor =
    colorScheme === "light" ? Colors.light.text : Colors.dark.text;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      paddingTop: "12%",
    },
    inputs: {
        paddingTop: 8,
        paddingBottom: 8,
        paddingHorizontal: 8,
        alignSelf: "stretch",
        borderRadius: 5,
        color: textColor,
    },
    button: {
        height: 50,
        maxWidth: '50%',
        margin: 20,
        borderRadius: 5,
        backgroundColor: colorScheme === "light"
        ? Colors.light.cardBackground
        : Colors.dark.cardBackground,
        padding: 15,
        alignItems: 'center',
        alignSelf: 'center',
    },
    buttonText: {
        fontSize: 16
    },
    resultView: {
        margin: 20,
    },
    result: {
        fontSize: 20
    },
    buttonSelector: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonOption: {
        flex: 1,
        maxWidth: 120,
        padding: 10,
        marginTop: 20,
        backgroundColor:
        colorScheme === "light"
          ? Colors.light.cardBackground
          : Colors.dark.cardBackground,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonOptionText: {
        fontSize: 14,
    },
    selectedOption: {
        backgroundColor: 'rgba(100, 160, 255, 0.4)'
    }
})

  
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [sex, setSex] = useState('');
    const [age, setAge] = useState('');
    const [bmi, setBmi] = useState('');
    const [calories, setCalories] = useState('');
    const [description, setDescription] = useState('');
    const [weightState, setWeightState] = useState('')
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const enableButton = () => {
        if (weight && height && sex && age && weightState) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }

    const calculatehealthData = () => {

        if (!weight || !height || !sex || !age || !weightState) {
            Alert.alert('Please fill in all sections');
            return;
        }

        const bmi = weight / ((height / 100) * (height/100))
        const bmiSentence = `BMI: ${bmi.toFixed(1)}% - `
        setBmi(bmiSentence)

        if (sex == 'male') {
            const bmr = 66.47 + (13.75 * weight) + (5.003 * height) - (6.755 * age)
            if (weightState == 'lose') {
                const CaloriesSentence = `Your calories is: ${((bmr*1.2)-200).toFixed(0)}`
                setCalories(CaloriesSentence)
            }else if (weightState == 'maintain') {
                const CaloriesSentence = `Your calories is: ${((bmr*1.2)).toFixed(0)}`
                setCalories(CaloriesSentence)
            }else if (weightState == 'gain'){
                const CaloriesSentence = `Your calories is: ${((bmr*1.2) + 200).toFixed(0)}`
                setCalories(CaloriesSentence)
            }
        } else if (sex == 'female') {
            const bmr = 655.1 + (9.563 * weight) + (1.850 * height) - (4.676 * age)
            if (weightState == 'lose') {
                const CaloriesSentence = `Your calories is: ${((bmr*1.2)-150).toFixed(0)}`
                setCalories(CaloriesSentence)
            }else if (weightState == 'maintain') {
                const CaloriesSentence = `Your calories is: ${((bmr*1.2)).toFixed(0)}`
                setCalories(CaloriesSentence)
            }else if (weightState == 'gain'){
                const CaloriesSentence = `Your calories is: ${((bmr*1.2) + 150).toFixed(0)}`
                setCalories(CaloriesSentence)
            }
        }

        if (bmi < 18.5) {
            setDescription('You are underweight')
        }else if (bmi >= 18.5 && bmi <= 24.9) {
            setDescription('You are at a normal weight')
        }else if (bmi >= 25 && bmi <= 29.9) {
            setDescription('You are overweight')
        }else if (bmi >= 30) {
            setDescription('You are classed into obesity')
        }
    }

  return (
    <View style={styles.container}>
      <Text style={globalStyles.header2}>Health Data</Text>
      <View style={styles.buttonSelector}>
        <TouchableOpacity
          style={[styles.buttonOption, sex === 'male' && styles.selectedOption]}
          onPress={() => {setSex('male'); enableButton()}}
        >
          <Text style={styles.buttonOptionText}>Male</Text>
        </TouchableOpacity>
        <View style={{ width: 20 }} />
        <TouchableOpacity
          style={[styles.buttonOption, sex === 'female' && styles.selectedOption]}
          onPress={() => {setSex('female'); enableButton()}}
        >
          <Text style={styles.buttonOptionText}>Female</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonSelector}>
        <TouchableOpacity
          style={[styles.buttonOption, weightState === 'lose' && styles.selectedOption]}
          onPress={() => {setWeightState('lose'); enableButton()}}
        >
          <Text style={styles.buttonOptionText}>Lose Weight</Text>
        </TouchableOpacity>
        <View style={{ width: 10 }} />
        <TouchableOpacity
          style={[styles.buttonOption, weightState === 'maintain' && styles.selectedOption]}
          onPress={() => {setWeightState('maintain'); enableButton()}}
        >
          <Text style={styles.buttonOptionText}>Maintain Weight</Text>
        </TouchableOpacity>
        <View style={{ width: 10 }} />
        <TouchableOpacity
          style={[styles.buttonOption, weightState === 'gain' && styles.selectedOption]}
          onPress={() => {setWeightState('gain'); enableButton()}}
        >
          <Text style={styles.buttonOptionText}>Gain Weight</Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: 20 }} />
      <Input 
      style={styles.inputs}
      value={weight}
      onChangeText={(text) => {setWeight(text); enableButton()}}
      placeholder='Enter: Weight in kg'
      keyboardType='numeric'
       />
      <Input 
      style={styles.inputs}
      value={height}
      onChangeText={(text) => {setHeight(text); enableButton()}}
      placeholder='Enter: Height in cm'
      keyboardType='numeric'
       />
      <Input 
      style={styles.inputs}
      value={age}
      onChangeText={(number) => {setAge(number); enableButton()}}
      placeholder='Enter: Age'
      keyboardType='numeric'
       />
      <TouchableOpacity style={[styles.button, {opacity: buttonDisabled ? 0.5 : 1}]} onPress={calculatehealthData} disabled={buttonDisabled}>
            <Text style={styles.buttonText}>View Health Data</Text>
      </TouchableOpacity>
      <View style={styles.resultView}>
          <Text style={styles.result}>{bmi}{description}</Text>
          <Text style={styles.result}>{calories}</Text>
      </View>
    </View>
  )
}
