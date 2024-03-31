import { View, StyleSheet } from 'react-native';
import React from 'react';
import SVG, {Circle, Text} from 'react-native-svg';


const GoalComponent = ({radius, progress, goal}) => { 
    //changing radius argument will change the size of the component on the page
  const stroke = radius / 3.2;
  const innerRad = radius - stroke / 2;
  const circ = 2 * Math.PI * innerRad;
  const percentage = progress / goal
  let strokeColor = 'white';
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
          stroke="white"
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
          fill={strokeColor}
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
