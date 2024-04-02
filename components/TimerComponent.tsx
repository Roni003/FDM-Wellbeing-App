import { View, Text, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native'
import React, { useState, useRef } from 'react'
import { StatusBar } from 'expo-status-bar'
import Colors from "@/lib/Colors";


const TimerComponent = () => {
  const colorScheme = useColorScheme();
  const themeColors = colorScheme === "light" ? Colors.light : Colors.dark;

  const [timer, setTimer] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setPaused] = useState(false)
  const count = useRef(null)


  const startHandler = () => {
    setIsActive(true)
    setPaused(false)
    count.current = setInterval(() => {
      setTimer((timer) => timer + 1)
    }, 1000)
  }


  const pauseHandler = () => {
    clearInterval(count.current)
    setPaused(true)
  }


  const continueHandler = () => {
    setPaused(false)
    count.current = setInterval(() => {
      setTimer((timer) => timer + 1)
    }, 1000)
  }


  const resetHandler = () => {
    clearInterval(count.current)
    setIsActive(false)
    setPaused(false)
    setTimer(0)
  }


  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }


  return (
    <View style={styles.container}>
      <View style={[styles.timerContainer, { borderColor: themeColors.tabIconDefault}]}>
        <Text style={[styles.timer, { color: themeColors.textSecondary}]}>{formatTime(timer)}</Text>
      </View>
      <View style={styles.buttonContainer}>
        {!isActive && !isPaused ? (
          <TouchableOpacity style={[styles.button, { backgroundColor: themeColors.tint }]} onPress={startHandler}>
            <Text style={[styles.buttonText, { color: themeColors.text }]}>Start</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity style={[styles.button, { backgroundColor: themeColors.tint }]} onPress={resetHandler}>
              <Text style={[styles.buttonText, { color: themeColors.text }]}>Reset</Text>
            </TouchableOpacity>
            {!isPaused ? (
              <TouchableOpacity style={[styles.button, { backgroundColor: themeColors.tint }]} onPress={pauseHandler}>
                <Text style={[styles.buttonText, { color: themeColors.text }]}>Pause</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={[styles.button, { backgroundColor: themeColors.tint }]} onPress={continueHandler}>
                <Text style={[styles.buttonText, { color: themeColors.text }]}>Continue</Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerContainer: {
    borderWidth: 4,
    borderColor: 'white',
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timer: {
    fontSize: 25,
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 70 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
  },
  buttonText: {
    fontSize: 12,
    color: '#fff',
  },
})


export default TimerComponent