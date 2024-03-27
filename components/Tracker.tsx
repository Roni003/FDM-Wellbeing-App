import { Dimensions, Pressable, StyleSheet } from "react-native";
import React, { useState } from 'react';
import { Text, View } from "@/components/Themed";
import { router } from "expo-router";

type TrackerProps = {
    head: string,
    counter: string,
    link: any,
};

const Tracker = ({head, counter, link}: TrackerProps) => {

    return (
        <View style={styles.tracker_container}>
            <Pressable
                onPress={() => router.navigate(link)}
                style={({ pressed }) => [
                    { backgroundColor: pressed ? 'rgba(100, 160, 255, 0.5)' : 'rgba(100, 160, 255, 0.1)'},
                    styles.pressable
                ]}
            >
                <Text style={styles.tracker_container_Head}>{head}</Text>
                <Text style={styles.tracker_container_Counter}>{counter}</Text>
            </Pressable>
        </View>
    );
}

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    tracker_container: {
        flex: 1,
        height: screenHeight * 0.2,
        padding: 0,
        margin: 5,
        borderRadius: 10,
        backgroundColor: 'rgba(100, 160, 255, 0.5)',
        borderColor: 'rgba(250, 250, 250, 0.2)',
        borderWidth: 0.5,
      },
    
      tracker_container_Head: {
        fontSize: 21,
      },

      tracker_container_Counter: {
        marginTop: '5%',
        fontSize: 16,
        fontWeight: '700',
      },

      pressable: {
        padding: 10,
        borderRadius: 10,
        flex: 1,
        overflow: 'hidden',
      },
});

export default Tracker;