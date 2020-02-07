import React, { Component } from 'react';
import { View, Button, Text, TextInput, Image } from 'react-native';
import firebase from 'react-native-firebase';

function PhoneAuth2() {
  const signIn = () => {
    const { phoneNumber } = this.state;
    this.setState({ message: 'Sending code ...' });
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber)
      .then(confirmResult => this.setState({ confirmResult, message: 'Code has been sent!' }))
      .catch(error => this.setState({ message: `Sign In With Phone Number Error: ${error.message}` }));
  };
  return (
    <View>
      <TextInput
        onSubmitEditing={Keyboard.dismiss}
        secureTextEntry={true}
        autoCorrect={false}
        style={styles.textInput}
        autoCompleteType={'password'}
        onChangeText={text => setPassword(text)}
        placeholder="Password"
        placeholderTextColor="white"
      />
      <TouchableOpacity style={styles.btnEmail} onPress={() => console.log('hello')}>
        <Text style={styles.btnText}>SIGN IN</Text>
      </TouchableOpacity>
    </View>
  );
}
