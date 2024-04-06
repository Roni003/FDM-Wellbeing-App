import React, { useRef, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Video } from 'expo-av';

const VideoPlayer = ({ videoSource, style, onVideoEnd }) => {
  const videoRef = useRef(null);

  const handlePlaybackStatusUpdate = (status) => {
    if (status.didJustFinish) {
      onVideoEnd(); // Call the provided callback when video ends
    }
  };

  return (
    //<View style={[styles.container, style]}>
      <Video
        ref={videoRef}
        source={videoSource}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        useNativeControls
        resizeMode="contain"
        shouldPlay
        style={styles.video}
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate} // Add the event handler
      />
    //</View>
  );
};

const styles = StyleSheet.create({
  video: {
    width: '60%',
    height: '100%',
  },
});

export default VideoPlayer;