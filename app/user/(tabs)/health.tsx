import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  useColorScheme,
  Pressable,
  Keyboard,
} from "react-native";
import { View, Text } from "@/components/Themed";
import React, { useState } from "react";
import { globalStyles } from "@/lib/Styles";
import Colors from "@/lib/Colors";
import { Input } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";

export default function health() {
  const colorScheme = useColorScheme();
  const textColor =
    colorScheme === "light" ? Colors.light.text : Colors.dark.text;

  const styles = StyleSheet.create({
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    headerText: {
      ...globalStyles.header2,
      padding: 8,
    },
    inputs: {
      paddingTop: 8,
      paddingBottom: 8,
      paddingHorizontal: 8,
      marginBottom: 5,
      alignSelf: "stretch",
      borderRadius: 8,
      color: textColor,
    },
    button: {
      height: 50,
      width: "70%",
      borderRadius: 8,
      backgroundColor:
        colorScheme === "light"
          ? Colors.light.cardBackground
          : Colors.dark.cardBackground,
      padding: 15,
      marginTop: 10,
      alignItems: "center",
      alignSelf: "center",
    },
    buttonText: {
      fontSize: 16,
      color: textColor,
    },
    resultView: {
      margin: 20,
      alignItems: "center",
    },
    result: {
      fontSize: 20,
      color: textColor,
      marginBottom: 8,
    },
    buttonSelector: {
      flexDirection: "row",
      justifyContent: "center",
      marginBottom: 20,
    },
    buttonOption: {
      flex: 1,
      maxWidth: 120,
      paddingVertical: 10,
      backgroundColor:
        colorScheme === "light"
          ? Colors.light.cardBackground
          : Colors.dark.cardBackground,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonOptionText: {
      fontSize: 14,
      color: textColor,
    },
    selectedOption: {
      backgroundColor:
        colorScheme === "light"
          ? Colors.light.lowOpacityTint
          : Colors.dark.lowOpacityTint,
    },
    clearButton: {
      color: colorScheme === "light" ? Colors.light.tint : Colors.dark.tint,
      opacity: 0.9,
      alignSelf: "center",
      padding: 5,
      marginBottom: 10,
    },
  });

  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [sex, setSex] = useState("");
  const [age, setAge] = useState("");
  const [bmi, setBmi] = useState("");
  const [calories, setCalories] = useState("");
  const [description, setDescription] = useState("");
  const [weightState, setWeightState] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const enableButton = () => {
    if (weight && height && sex && age && weightState) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  };

  const calculatehealthData = () => {
    if (!weight || !height || !sex || !age || !weightState) {
      Alert.alert("Please fill in all sections");
      return;
    }

    const bmi = weight / ((height / 100) * (height / 100));
    const bmiSentence = `BMI: ${bmi.toFixed(1)}% - `;
    setBmi(bmiSentence);

    if (sex == "male") {
      const bmr = 66.47 + 13.75 * weight + 5.003 * height - 6.755 * age;
      if (weightState == "lose") {
        const CaloriesSentence = `Eat at/under: ${(bmr * 1.2 - 200).toFixed(
          0
        )} kcal`;
        setCalories(CaloriesSentence);
      } else if (weightState == "maintain") {
        const CaloriesSentence = `Eat at: ${(bmr * 1.2).toFixed(0)} kcal`;
        setCalories(CaloriesSentence);
      } else if (weightState == "gain") {
        const CaloriesSentence = `Eat at/more: ${(bmr * 1.2 + 200).toFixed(
          0
        )} kcal`;
        setCalories(CaloriesSentence);
      }
    } else if (sex == "female") {
      const bmr = 655.1 + 9.563 * weight + 1.85 * height - 4.676 * age;
      if (weightState == "lose") {
        const CaloriesSentence = `Eat at/under: ${(bmr * 1.2 - 150).toFixed(
          0
        )} kcal`;
        setCalories(CaloriesSentence);
      } else if (weightState == "maintain") {
        const CaloriesSentence = `Eat at: ${(bmr * 1.2).toFixed(0)} kcal`;
        setCalories(CaloriesSentence);
      } else if (weightState == "gain") {
        const CaloriesSentence = `Eat at/more ${(bmr * 1.2 + 150).toFixed(
          0
        )} kcal`;
        setCalories(CaloriesSentence);
      }
    }

    if (bmi < 18.5) {
      setDescription("You are underweight");
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      setDescription("You are at a normal weight");
    } else if (bmi >= 25 && bmi <= 29.9) {
      setDescription("You are overweight");
    } else if (bmi >= 30) {
      setDescription("You are classed into obesity");
    }
  };

  const handleReset = () => {
    setWeight("");
    setHeight("");
    setSex("");
    setAge("");
    setBmi("");
    setCalories("");
    setDescription("");
    setWeightState("");
    setButtonDisabled(true);
  };

  return (
    <View style={globalStyles.container}>
      <Pressable onPress={() => Keyboard.dismiss()}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Health Data</Text>
          <FontAwesome
            name="eraser"
            size={28}
            style={[styles.clearButton, { transform: [{ rotate: "180deg" }] }]}
            onPress={handleReset}
          />
        </View>
        <View style={{ height: 10 }} />
        <View style={styles.buttonSelector}>
          <TouchableOpacity
            style={[
              styles.buttonOption,
              sex === "male" && styles.selectedOption,
            ]}
            onPress={() => {
              setSex("male");
              enableButton();
            }}
          >
            <Text style={styles.buttonOptionText}>Male</Text>
          </TouchableOpacity>
          <View style={{ width: 20 }} />
          <TouchableOpacity
            style={[
              styles.buttonOption,
              sex === "female" && styles.selectedOption,
            ]}
            onPress={() => {
              setSex("female");
              enableButton();
            }}
          >
            <Text style={styles.buttonOptionText}>Female</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonSelector}>
          <TouchableOpacity
            style={[
              styles.buttonOption,
              weightState === "lose" && styles.selectedOption,
            ]}
            onPress={() => {
              setWeightState("lose");
              enableButton();
            }}
          >
            <Text style={styles.buttonOptionText}>Lose Weight</Text>
          </TouchableOpacity>
          <View style={{ width: 10 }} />
          <TouchableOpacity
            style={[
              styles.buttonOption,
              weightState === "maintain" && styles.selectedOption,
            ]}
            onPress={() => {
              setWeightState("maintain");
              enableButton();
            }}
          >
            <Text style={styles.buttonOptionText}>Maintain Weight</Text>
          </TouchableOpacity>
          <View style={{ width: 10 }} />
          <TouchableOpacity
            style={[
              styles.buttonOption,
              weightState === "gain" && styles.selectedOption,
            ]}
            onPress={() => {
              setWeightState("gain");
              enableButton();
            }}
          >
            <Text style={styles.buttonOptionText}>Gain Weight</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 20 }} />
        <Input
          style={styles.inputs}
          value={weight}
          onChangeText={(text) => {
            setWeight(text);
            enableButton();
          }}
          placeholder="Enter: Weight in kg"
          keyboardType="numeric"
        />
        <Input
          style={styles.inputs}
          value={height}
          onChangeText={(text) => {
            setHeight(text);
            enableButton();
          }}
          placeholder="Enter: Height in cm"
          keyboardType="numeric"
        />
        <Input
          style={styles.inputs}
          value={age}
          onChangeText={(number) => {
            setAge(number);
            enableButton();
          }}
          placeholder="Enter: Age"
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={[styles.button, { opacity: buttonDisabled ? 0.5 : 1 }]}
          onPress={calculatehealthData}
          disabled={buttonDisabled}
        >
          <Text style={styles.buttonText}>View Health Data</Text>
        </TouchableOpacity>
        <View style={styles.resultView}>
          <Text style={styles.result}>
            {bmi}
            {description}
          </Text>
          <Text style={styles.result}>{calories}</Text>
        </View>
      </Pressable>
    </View>
  );
}
