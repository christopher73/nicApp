import React, { useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import firebase from 'react-native-firebase';
import Hr from 'react-native-hr-component';

function SocialAuth({ styles, setShowSMS, registerUser }) {
  const GOOGLECLIENTID = '513987502158-aisv8hs5dh520clh3vpcdqb97cj8la95.apps.googleusercontent.com';

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: GOOGLECLIENTID,
      offlineAccess: true
    });
  }, []);

  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      let userInfo = await GoogleSignin.signIn();
      const credential = firebase.auth.GoogleAuthProvider.credential(userInfo.idToken, userInfo.accessToken);
      const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
      const firebaseUser = firebaseUserCredential.user.toJSON();

      registerUser({ ...firebaseUser.providerData[0], smsNumber: firebaseUser.phoneNumber });
      setShowSMS(true);
      // console.log(userInfo.user);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        console.log(error);
        // some other error happened
      }
    }
  };

  return (
    <View style={styles.buttonDiv}>
      <Hr
        text=" Log in with "
        fontSize={5}
        lineColor="#eee"
        textPadding={5}
        textStyles={{ fontSize: 20, marginVertical: 12, color: 'white' }}
        hrStyles={{ color: 'white' }}
      />
      <TouchableOpacity style={{ ...styles.authButton, backgroundColor: 'rgba(255, 0, 0, 0.6)' }} onPress={_signIn}>
        <Icon name="google" style={styles.btnIcon} color="white" />
        <Text style={styles.btnText}>Google</Text>
      </TouchableOpacity>
      {
        //     <TouchableOpacity style={{ ...styles.authButton, backgroundColor: 'rgba(0, 0, 0, 0.6);' }} onPress={_signIn}>
        //    <Icon name="envelope" style={styles.btnIcon} color="white" />
        //  <Text style={styles.btnText}>Email</Text>
        //</TouchableOpacity>
      }
    </View>
  );
}
export default SocialAuth;
