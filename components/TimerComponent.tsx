import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, {useState, useRef} from 'react'
import { StatusBar } from 'expo-status-bar'

const TimerComponent = () => {
    const [timer, setTimer] = useState(0)
    const [isActive, setIsActive] = useState(false)
    const [isPaused, setPaused] = useState(false)
    const count = useRef(null)

    const StartHandler = () => {
        setIsActive(true);
        setPaused(false);
        count.current = setInterval(() => {
          setTimer((timer) => timer + 1);
        }, 1000);
      };

    const PauseHandler = () => {
        clearInterval(count.current);
        setPaused(true)
    };

    const ContinueHandler = () => {
        setPaused(false);
        count.current = setInterval(() => {
            setTimer((timer) => timer + 1);
        }, 1000)
    }

    const ResetHandler = () => {
        clearInterval(count.current);
        setIsActive(false);
        setPaused(false);
        setTimer(0);
      };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60)
        const seconds = time % 60
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }
  return (
    <View style = {styles.container}>
      <View style = {styles.timerContainer}>
        <Text style={styles.timer}>{formatTime(timer)}</Text>
      </View>
      <View style = {styles.buttonContainer}>
        {!isActive && !isPaused ? (
            <TouchableOpacity style={styles.button} onPress={StartHandler}>
                <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>
        ): (
            <>
                <TouchableOpacity style={styles.button} onPress={PauseHandler}>
                    <Text style={styles.buttonText}>Pause</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={ResetHandler}>
                    <Text style={styles.buttonText}>Reset</Text>
                </TouchableOpacity>
                {isPaused && (
                    <TouchableOpacity style={styles.button} onPress={ContinueHandler}>
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
        justifyContent: 'center'
    },

    timerContainer: {
        borderWidth: 4,
        borderColor: 'black',
        width: 200,
        height: 200,
        borderRadius: 200/2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    timer: {
        fontSize: 30,
        color: 'black'
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 30,
    },
    button: {
        width: 70,
        height: 70,
        borderRadius: 70/2, 
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
    },
    buttonText: {
        fontSize: 15,
        color: '#fff',
    },
})

export default TimerComponent