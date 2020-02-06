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
}
