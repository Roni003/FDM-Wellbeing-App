import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState, useRef } from 'react'
import { StatusBar } from 'expo-status-bar'


const TimerComponent = () => {
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
      <View style={styles.timerContainer}>
        <Text style={styles.timer}>{formatTime(timer)}</Text>
      </View>
      <View style={styles.buttonContainer}>
        {!isActive && !isPaused ? (
          <TouchableOpacity style={styles.button} onPress={startHandler}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity style={styles.button} onPress={resetHandler}>
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
            {!isPaused ? (
              <TouchableOpacity style={styles.button} onPress={pauseHandler}>
                <Text style={styles.buttonText}>Pause</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.button} onPress={continueHandler}>
                <Text style={styles.buttonText}>Continue</Text>
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
    width: 100,
    height: 100,
    marginTop: '10%',
    borderRadius: 200 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timer: {
    fontSize: 25,
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 30,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 70 / 2,
    backgroundColor: '#00BBFF',
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