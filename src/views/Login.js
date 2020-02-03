import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {loginEmail, registerGoogle} from '../redux/actions/actions';
import {bindActionCreators} from 'redux';
import {StyleSheet, ImageBackground, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Foundation';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes
} from '@react-native-community/google-signin';

// Somewhere in your code

function Login() {
  useEffect(() => {
    GoogleSignin.configure({
      // scopes: ['https://www.googleapis.com/auth/drive.read,only'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '513987502158-aisv8hs5dh520clh3vpcdqb97cj8la95.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true // if you want to access Google API on behalf of the user FROM YOUR SERVER
      // hostedDomain: '', // specifies a hosted domain restriction
      // loginHint: '', // [iOS] The user's ID, or email addre,ss, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      // forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
      // accountName: '', // [Android] specifies an account name on the device that should be used
      // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });
  });
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  return (
    <ImageBackground
      source={require('../assets/background.jpg')}
      style={styles.backgroundImage}>
      <View style={styles.containerDiv}>
        <View style={styles.titleDiv}>
          <Text style={styles.titleText}>NORTH</Text>
          <Text style={styles.titleText}>CENTRAL</Text>
          <Text style={styles.titleText}>CONSULTING</Text>
        </View>
        <Icon.Button name="google" backgroundColor="#de5246" onPress={signIn}>
          Login with Gmail
        </Icon.Button>
        <Icon2.Button
          name="mail"
          backgroundColor="black"
          color="#f1f1f1"
          onPress={signIn}>
          Login with Gmail
        </Icon2.Button>
      </View>
    </ImageBackground>
  );
}
// <TouchableOpacity style={styles.btnGmail} onPress={login}>
//         <Text style={styles.btnText}>Log in with Gmail</Text>
//       </TouchableOpacity>
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'cover' // or 'stretch'
  },
  containerDiv: {
    width: '70%'
  },
  titleDiv: {
    height: '55%',
    display: 'flex',
    alignContent: 'center'
  },
  titleText: {
    color: 'white',
    fontSize: 45,
    fontWeight: '500',
    textShadowColor: '#000',
    textShadowRadius: 40
  },
  btnGmail: {
    backgroundColor: 'red',
    paddingVertical: 10,
    width: '100%',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5
  },
  btnGuess: {
    backgroundColor: 'grey',
    paddingVertical: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5
  },
  btnText: {
    fontSize: 17,
    fontWeight: '400',
    color: '#fff',
    textAlign: 'center'
  }
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({loginEmail, registerGoogle}, dispatch);
};
const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
