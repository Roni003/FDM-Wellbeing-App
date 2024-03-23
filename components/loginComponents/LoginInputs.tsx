import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'

type LoginProps = {
    placeholder: string
    secureTextEntry: boolean
}

const LoginInputs = ( { placeholder, secureTextEntry }: LoginProps ) => {
  return (
    <View style={styles.container}>
      <TextInput placeholder={placeholder} secureTextEntry={secureTextEntry} style={styles.inputs}></TextInput>
    </View>
  )
}


const styles = StyleSheet.create({
    inputs: {
    },
    container: {
        backgroundColor: 'white',
        width: '100%',

        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 4,
        marginVertical: 5,
    }
});


export default LoginInputs
