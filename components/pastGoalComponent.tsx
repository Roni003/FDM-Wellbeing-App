import { View, StyleSheet, ScrollView, Text } from 'react-native';
import React from 'react';
import Goal from "./GoalComponent";


const pastGoalComponent = ({data, goal}) => { 
  //in your page, put the call inside a view tag and set the height to ~100
  //data array should be oldest date's stat to newest

  return (
    <ScrollView style={styles.scroll} horizontal={true} showsHorizontalScrollIndicator={false} contentOffset={{x:70*data.length}}>
      {data.map((progress, index) => (
        <View key={index} style={styles.slide}>
          <Text style={styles.text}>DD/M</Text>
          <Goal radius={30} progress={progress} goal={goal} />
        </View>
      ))}
    </ScrollView>
  )
}




const styles = StyleSheet.create({
  scroll: {
  },
  slide: {
    flex: 1,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
  },
})


export default pastGoalComponent;