// AddMinutesModal.js
import React from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const AddMinutesModal = ({
  addMinutesModalVisible,
  handleAddMinutesInputChange,
  additionalMinutes,
  handleAddDailyMinutes,
  handleAddMinutesModalClose,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={addMinutesModalVisible}
      onRequestClose={handleAddMinutesModalClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add Minutes</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleAddMinutesInputChange}
            value={additionalMinutes}
            placeholder="Enter minutes  meditated outside the app"
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.modalButton} onPress={handleAddDailyMinutes}>
            <Text style={styles.modalButtonText}>Add Minutes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton} onPress={handleAddMinutesModalClose}>
            <Text style={styles.modalButtonText}>Cancel</Text>
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
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#333333',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  modalButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default AddMinutesModal;