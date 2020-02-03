import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { loginEmail, registerGoogle } from '../../redux/actions/actions';
import { bindActionCreators } from 'redux';
import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import Hr from 'react-native-hr-component';
import { loginStyles } from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// Somewhere in your code

function Login() {
  useEffect(() => {
    GoogleSignin.configure({
      // scopes: ['https://www.googleapis.com/auth/drive.read,only'], // what API you want to access on behalf of the user, default is email and profile
      webClientId: '513987502158-aisv8hs5dh520clh3vpcdqb97cj8la95.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true // if you want to access Google API on behalf of the user FROM YOUR SERVER
      // hostedDomain: '', // specifies a hosted domain restriction
      // loginHint: '', // [iOS] The user's ID, or email addre,ss, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      // forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
      // accountName: '', // [Android] specifies an account name on the device that should be used
      // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });
  });
  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      let userInfo = await GoogleSignin.signIn();

      console.log(userInfo.user);
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
  const [email, setEmail] = useState('Your email');
  const [password, setPassword] = useState('Password');
  console.log(email);
  //https://www.freecodecamp.org/news/how-to-make-your-react-native-app-respond-gracefully-when-the-keyboard-pops-up-7442c1535580/
  return (
    <ImageBackground source={require('../../assets/background.jpg')} style={{ width: '100%', height: '100%' }}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.titleDiv}>
          <Text style={styles.titleText}>NORTH</Text>
          <Text style={styles.titleText}>CENTRAL</Text>
          <Text style={styles.titleText}>CONSULTING</Text>
        </View>
        <View style={styles.buttonDiv}>
          <Hr
            text="Sign in"
            fontSize={5}
            lineColor="#eee"
            textPadding={5}
            textStyles={{ fontSize: 20, marginVertical: 12, color: 'white' }}
            hrStyles={{ color: 'white' }}
          />
          <TextInput
            autoFocus={true}
            style={styles.textInput}
            autoCompleteType={'email'}
            onChangeText={text => setEmail(text)}
            placeholder="Your email"
            placeholderTextColor="white"
          />
          <TextInput
            autoFocus={true}
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
          <Hr
            text="or"
            fontSize={5}
            lineColor="#eee"
            textPadding={5}
            textStyles={{ fontSize: 20, marginVertical: 12, color: 'white' }}
            hrStyles={{ color: 'white' }}
          />
          <TouchableOpacity style={styles.btnGmail} onPress={_signIn}>
            <Icon name="google" style={styles.btnIcon} color="white" />
            <Text style={styles.btnText}>CONTINUE WITH GMAIL</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create(loginStyles);

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ loginEmail, registerGoogle }, dispatch);
};
const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
