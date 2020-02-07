import React, { Component } from 'react';
import { View, Button, Text, TextInput, Image } from 'react-native';
import firebase from 'react-native-firebase';

function PhoneAuth2(number, setNumber) {
  // const [number, setNumber] = useState('Your Number');

  const _smsAuth = async phoneNumber => {
    await firebase
      .auth()
      .verifyPhoneNumber(phoneNumber)
      .on(
        'state_changed',
        phoneAuthSnapshot => {
          switch (phoneAuthSnapshot.state) {
            case firebase.auth.PhoneAuthState.CODE_SENT: // or 'sent'
              console.log('code sent');
              break;
            case firebase.auth.PhoneAuthState.ERROR: // or 'error'
              console.log('verification error');
              console.log(phoneAuthSnapshot.error);
              break;
            case firebase.auth.PhoneAuthState.AUTO_VERIFY_TIMEOUT: // or 'timeout'
              console.log('auto verify on android timed out');
              break;
            case firebase.auth.PhoneAuthState.AUTO_VERIFIED: // or 'verified'
              console.log('auto verified on android');
              console.log(phoneAuthSnapshot);
              const { verificationId, code } = phoneAuthSnapshot;
              const cred = firebase.auth.PhoneAuthProvider.credential(verificationId, code);
              firebase.auth().currentUser.linkWithCredential(cred);

              // Do something with your new credential, e.g.:
              //firebase.auth().signInWithCredential(credential);
              setIsVerified(true);

              break;
          }
        },
        error => {
          console.log(error);
          console.log(error.verificationId);
        },
        phoneAuthSnapshot => {
          console.log(phoneAuthSnapshot);
        }
      );
    await sleep(2000);
    navigation.navigate('AuthLoading');
  };
  return (
    <View style={styles.buttonDiv}>
      <Hr
        text="Verify Number"
        fontSize={5}
        lineColor="#eee"
        textPadding={5}
        textStyles={{ fontSize: 20, marginVertical: 12, color: 'white' }}
        hrStyles={{ color: 'white' }}
      />
      <TextInput
        onSubmitEditing={Keyboard.dismiss}
        style={styles.textInput}
        autoCompleteType={'tel'}
        onChangeText={text => setNumber(text)}
        placeholder="Your Phone Number"
        placeholderTextColor="white"
      />
      <TouchableOpacity style={styles.btnEmail} onPress={() => _smsAuth(number)}>
        <Text style={styles.btnText}>SEND</Text>
      </TouchableOpacity>
    </View>
  );
}
