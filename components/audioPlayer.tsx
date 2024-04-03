import { Text, TouchableOpacity, View, StyleSheet, Image, ImageBackground} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import { FontAwesome } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

export default function App({ audioPath, onAudioEnd, onBackSession}) {
  
  const [audioPlayback, setAudioPlayback] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackPosition, setPlaybackPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [timer, setTimer] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    // Cleanup upon unmounting
    return () => {
      stopAudioPlayback();
    };
  }, []);

  useEffect(() => {
    // Resume playback if paused and audioPlayback is set
    if (isPlaying && audioPlayback) {
      resumeAudioPlayback();
    }
  }, [isPlaying, audioPlayback]);

  useEffect(() => {
    // Timer functionality
    const interval = setInterval(() => {
      if (isPlaying) {
        setTimer(prevTimer => prevTimer + 1000); // Increment timer by 1 second
      }
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [isPlaying]);


  async function startAudioPlayback() {
    try {
      const soundObject = new Audio.Sound();
      await soundObject.loadAsync(audioPath, { positionMillis: playbackPosition }, true);
      await soundObject.setVolumeAsync(volume); // Set initial volume
      await soundObject.playAsync();
      setAudioPlayback(soundObject);
      setIsPlaying(true);
      soundObject.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      const { durationMillis } = await soundObject.getStatusAsync();
      setDuration(durationMillis);
    } catch (error) {
      console.error('Failed to start audio playback', error);
    }
  }

  async function resumeAudioPlayback() {
    try {
      if (audioPlayback) {
        await audioPlayback.playFromPositionAsync(playbackPosition);
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Failed to resume audio playback', error);
    }
  }

  async function pauseAudioPlayback() {
    try {
      if (audioPlayback) {
        const status = await audioPlayback.pauseAsync();
        setPlaybackPosition(status.positionMillis);
        setIsPlaying(false);
      }
    } catch (error) {
      console.error('Failed to pause audio playback', error);
    }
  }

  async function stopAudioPlayback() {
    try {
      if (audioPlayback) {
        await audioPlayback.stopAsync();
        await audioPlayback.unloadAsync();
        setAudioPlayback(null);
        setIsPlaying(false);
        setPlaybackPosition(0);
        setTimer(0); // Reset timer on audio stop
        setDuration(0);
      }
    } catch (error) {
      console.error('Failed to stop audio playback', error);
    }
  }

  async function handlePlaybackButtonPress() {
    if (isPlaying) {
      await pauseAudioPlayback();
    } else {
      if (audioPlayback) {
        await resumeAudioPlayback();
      } else {
        await startAudioPlayback();
      }
    }
  }

  async function onPlaybackStatusUpdate(status) {
    if (status.didJustFinish) {
      setIsPlaying(false);
      setPlaybackPosition(0);
      setTimer(0); // Reset timer when audio finishes
      onAudioEnd(); // Call the callback function to increase totalSessions
    } else if (status.isPlaying) {
      setIsPlaying(true);
      setPlaybackPosition(status.positionMillis);
      setTimer(status.positionMillis); // Update timer to match the playback position
    }
  }

  const onSliderValueChange = async (value) => {
    try {
      if (audioPlayback) {
        await audioPlayback.setPositionAsync(value);
        setPlaybackPosition(value);
        setTimer(value); // Update timer when user interacts with slider
      }
    } catch (error) {
      console.error('Failed to seek audio', error);
    }
  };

  const handleBackSessionPress = () => {
    stopAudioPlayback(); // Stop audio playback
    onBackSession(); // Call the callback function to navigate back
  };

  // Convert timer milliseconds to minutes and seconds
  const minutes = Math.floor(timer / 60000);
  const seconds = ((timer % 60000) / 1000).toFixed(0);

  // Convert duration milliseconds to minutes and seconds
  const durationMinutes = Math.floor(duration / 60000);
  const durationSeconds = ((duration % 60000) / 1000).toFixed(0);

  return (
    <View>
    <ImageBackground source={{ uri: 'https://i.pinimg.com/736x/20/5d/35/205d35cd6e10fba7313c135dae5c354f.jpg' }} style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handlePlaybackButtonPress}>
        <FontAwesome name={isPlaying ? 'pause-circle' : 'play-circle'} size={64} color="white" />
      </TouchableOpacity>
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>{`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}</Text>
        <Text style={styles.timerText}>{`${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`}</Text>
      </View>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration}   //allows slider to control audio dont set to 1
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#CCCCCC"
        thumbTintColor="#FFFFFF"
        onValueChange={onSliderValueChange}
        value={playbackPosition} // Set slider value to playback position
      />

    </ImageBackground>
    <TouchableOpacity style={styles.stopButton} onPress={handleBackSessionPress}>
      <Text style={styles.buttonText}>End Session</Text>
    </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ' #222222',
    borderWidth: 2,
    borderRadius: 10,
    width: 340,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 90,
    height: 90,
    borderRadius: 64,
    backgroundColor: '#333333',
    borderColor: 'white',
    borderWidth: 2,
    marginTop: 40,
  },
  slider: {
    width: 300,
    height: 40,
    marginTop: 20,
  },
  timerText: {
    color: 'white',
    fontSize: 15,
  },
  playbackStatusText: {
    color: 'white',
    marginTop: 10,
  },
  audioImage: {
    width: 200,
    height: 200,
  },
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300, 
  },
  stopButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    borderColor: 'white',
    borderWidth: 0.5,
    marginTop: 0,
    width: 340,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
