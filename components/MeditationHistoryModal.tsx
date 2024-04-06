import React from 'react';
import { StyleSheet, Modal, Text, View, TouchableOpacity, ScrollView, useColorScheme } from 'react-native';
import Colors from "@/lib/Colors";

const MeditationHistoryModal = ({ isVisible, sessions, onClose }) => {
    const colorScheme = useColorScheme();
    const themeColors = colorScheme === "light" ? Colors.light : Colors.dark;
    
    return (
        <Modal 
            visible={isVisible} 
            transparent={true}
            animationType="slide"
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Session History</Text>
                    <ScrollView>
                        <View style={styles.sessionHistoryContainer}>
                            {sessions.map(item => (
                                <View style={[styles.sessionHistoryBox, { backgroundColor: themeColors.innerBackground }]} key={item.id}>
                                    <Text style={[styles.sessionHistoryText, { color: themeColors.text }]}>{item.completionDate.toLocaleString([], {dateStyle: 'short', timeStyle: 'short'})}</Text>
                                    <Text style={[styles.sessionHistoryText, { color: themeColors.text }]}>{item.name}</Text>
                                    <Text style={[styles.sessionHistoryText, { color: themeColors.text }]}>Duration: {item.duration / 60} mins</Text>
                                </View>
                            ))}
                        </View>
                    </ScrollView>
               
                <TouchableOpacity onPress={onClose}>
                    <Text>Close</Text>
                </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalButton: {
        backgroundColor: '#333333',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    modalButtonText: {
        color: '#ffffff',
        fontSize: 16,
    },
    sessionHistoryContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sessionHistoryBox: {
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        margin: 5,
        borderRadius: 5,
    },
    sessionHistoryText: {
        fontSize: 16,
    },
});

export default MeditationHistoryModal;