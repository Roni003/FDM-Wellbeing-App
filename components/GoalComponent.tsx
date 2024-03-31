import { View, StyleSheet } from 'react-native';
import React from 'react';
import SVG, {Circle, Text} from 'react-native-svg';


const GoalComponent = ({radius, goalComplete, goal}) => {
  const stroke = radius / 3.2;
  const innerRad = radius - stroke / 2;
  const circ = 2 * Math.PI * innerRad;
  const percentage = goalComplete / goal
  let strokeColor = 'white';
  if (percentage >= 1) {
    strokeColor = 'green';
  }


  return (
    <>
    <View style={[styles.container, {width: radius*2, height: radius*2}]}>
      <SVG>
        <Circle
          r={innerRad}
          cx={radius} cy={radius}
          strokeWidth={stroke}
          stroke="white"
          opacity={0.2}
          />
        <Circle
          r={innerRad}
          cx={radius} cy={radius}
          rotation="-90" originX={radius} originY={radius}
          strokeWidth={stroke}
          fillOpacity={0}
          stroke={strokeColor} strokeLinecap="round"
          strokeDasharray={[circ*(percentage),circ]}
        />
        <Text
          x={radius} // x position of the text
          y={radius+(radius/9)} // y position of the text
          textAnchor="middle" // center align the text horizontally
          fontSize={stroke*1.2} // font size of the text
          fontWeight="bold"
          fill={strokeColor} // color of the text
        >
          {goalComplete}
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
