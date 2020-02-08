import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import firebase from 'react-native-firebase';
import Hr from 'react-native-hr-component';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function SmsAuth({ auth, styles, setIsVerified, navigation }) {
  const [number, setNumber] = useState('Your Number');
  const sleep = m => new Promise(r => setTimeout(r, m)); // sets delay
  console.log('from sms : ' + JSON.stringify(auth));
  // useEffect(() => {
  //   auth.smsNumber === null ? null : navigation.navigate('AuthLoading');
  // }, [auth]);
  const _smsAuth = async phoneNumber => {
    await firebase
      .auth()
      .verifyPhoneNumber(`${phoneNumber}`)
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

  return auth.user.smsNumber === null ? (
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
      <TouchableOpacity style={{ ...styles.authButton, backgroundColor: 'rgba(0, 255, 0, 0.6)' }} onPress={() => _smsAuth(number)}>
        <Icon name="sms" style={styles.btnIcon} color="white" />
        <Text style={styles.btnText}>Send</Text>
      </TouchableOpacity>
    </View>
  ) : (
    navigation.navigate('AuthLoading')
  );
}
