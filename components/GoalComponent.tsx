import { View, StyleSheet, useColorScheme } from 'react-native';
import React from 'react';
import SVG, {Circle, Text} from 'react-native-svg';
import Colors from '@/lib/Colors';
import { colors } from 'react-native-elements';

const GoalComponent = ({radius, progress, goal}) => { 
    //changing radius argument will change the size of the component on the page
  const colorScheme = useColorScheme();
  const textColor =
    colorScheme === "light" ? Colors.light.text : Colors.dark.text;
  const strokebackgroundColour = 
    colorScheme === "light" ? Colors.light.lowOpacityTint : "white"

  const strokeC = 
    colorScheme === "light" ? Colors.light.lowOpacityTint : "white"
  const stroke = radius / 3.2;
  const innerRad = radius - stroke / 2;
  const circ = 2 * Math.PI * innerRad;
  const percentage = progress / goal
  let strokeColor = strokeC;
  if (percentage >= 1) { // circle will turn green when goal is met
    strokeColor = 'green';
  }


  return (
    <>
    <View style={[styles.container, {width: radius*2, height: radius*2}]}>
      <SVG>
        <Circle //background circle (incomplete portion)
          r={innerRad}
          cx={radius} cy={radius}
          strokeWidth={stroke}
          stroke={strokebackgroundColour}
          opacity={0.2}
          />
        <Circle //foreground circle (complete portion)
          r={innerRad}
          cx={radius} cy={radius}
          rotation="-90" originX={radius} originY={radius}
          strokeWidth={stroke}
          fillOpacity={0}
          stroke={strokeColor} strokeLinecap="round"
          strokeDasharray={[circ*(percentage),circ]}
        />
        <Text //progress displayed in centre of circle
          x={radius}
          y={radius+(radius/9)} 
          textAnchor="middle"
          fontSize={stroke*1.2}
          fontWeight="bold"
          fill={textColor}
        >
          {progress}
        </Text>
      </SVG>
    </View>
    </>
  )
}




const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 50,
    height: 50,
  },
  header: {
    color: 'white',
  },
})


export default GoalComponent;
