import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../redux/actions/actions';
import { bindActionCreators } from 'redux';
import { StyleSheet, ImageBackground, Text, View, Keyboard } from 'react-native';
import { loginStyles } from './styles';
import SocialAuth from '../../components/SocialAuth';
import SmsAuth from '../../components/SmsAuth';
import VerifiedMessage from '../../components/VerifiedMessage';
import EmailAuth from '../../components/EmailAuth';
function Login({ registerUser, navigation, auth, error }) {
  // const [email, setEmail] = useState('Your email'); // Will use for email/password only
  // const [password, setPassword] = useState('Password');
  //console.log('from login ' + JSON.stringify(auth));
  const [showSMS, setShowSMS] = useState(false);
  const [showTitle, setShowTitle] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const keyboardWillShow = () => setShowTitle(false);
  const keyboardWillHide = () => setShowTitle(true);

  useEffect(() => {
    const keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', keyboardWillShow);
    const keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', keyboardWillHide);
    return () => {
      keyboardWillShowSub.remove();
      keyboardWillHideSub.remove();
    };
  }, [showTitle, auth]);
  //https://www.freecodecamp.org/news/how-to-make-your-react-native-app-respond-gracefully-when-the-keyboard-pops-up-7442c1535580/
  return (
    <ImageBackground source={require('../../assets/background.jpg')} style={styles.backgroundImage}>
      {isVerified ? (
        <VerifiedMessage {...{ styles }} />
      ) : (
        <View style={styles.containerDiv}>
          {showTitle ? (
            <View style={styles.titleDiv}>
              <Text style={styles.titleText}>NORTH</Text>
              <Text style={styles.titleText}>CENTRAL</Text>
              <Text style={styles.titleText}>CONSULTING</Text>
            </View>
          ) : null}
          {showSMS ? <SmsAuth {...{ auth, styles, setIsVerified, navigation }} /> : <SocialAuth {...{ styles, setShowSMS, registerUser }} />}
        </View>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create(loginStyles);
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ registerUser }, dispatch);
};
const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);

//NOTES
// Somewhere in your code
// client ID of type WEB for your server (needed to verify user ID and offline access)
// scopes: ['https://www.googleapis.com/auth/drive.read,only'],
// what API you want to access on behalf of the user, default is email and profile
// hostedDomain: '', // specifies a hosted domain restriction
// loginHint: '', // [iOS] The user's ID, or email addre,ss, to be prefilled in the authentication UI if
//possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/
// interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
// forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
// accountName: '', // [Android] specifies an account name on the device that should be used
// iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)

//TODO!!!
//  <TextInput
//   onSubmitEditing={Keyboard.dismiss}
//   style={styles.textInput}
//   autoCompleteType={'email'}
//   onChangeText={text => setEmail(text)}
//   placeholder="Your email"
//   placeholderTextColor="white"
// />
// <TextInput
//   onSubmitEditing={Keyboard.dismiss}
//   secureTextEntry={true}
//   autoCorrect={false}
//   style={styles.textInput}
//   autoCompleteType={'password'}
//   onChangeText={text => setPassword(text)}
//   placeholder="Password"
//   placeholderTextColor="white"
// />
// <TouchableOpacity style={styles.btnEmail} onPress={() => _signIn2(email, password)}>
//   <Text style={styles.btnText}>SIGN IN</Text>
// </TouchableOpacity>
// <Hr
//   text="or"
//   fontSize={5}
//   lineColor="#eee"
//   textPadding={5}
//   textStyles={{ fontSize: 20, marginVertical: 12, color: 'white' }}
//   hrStyles={{ color: 'white' }}
// />
