import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { loginEmail, registerGoogle } from '../../redux/actions/actions';
import { bindActionCreators } from 'redux';
import { StyleSheet, ImageBackground, Text, View, TouchableOpacity, TextInput, TextComponent } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Foundation';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import Hr from 'react-native-hr-component';

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
  const [email, setEmail] = useState('Your email');
  const [password, setPassword] = useState('Password');
  console.log(email);
  return (
    <ImageBackground source={require('../../assets/background.jpg')} style={styles.backgroundImage}>
      <View style={styles.containerDiv}>
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
            style={styles.textInput}
            autoCompleteType={'email'}
            onChangeText={text => setEmail(text)}
            placeholder="Your email"
            placeholderTextColor="white"
          />
          <TextInput
            secureTextEntry={true}
            style={styles.textInput}
            autoCompleteType={'password'}
            autoCorrect={false}
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
          <TouchableOpacity style={styles.btnGmail} onPress={() => console.log('hello')}>
            <Icon name="google" style={styles.btnIcon} color="white" />
            <Text style={styles.btnText}>CONTINUE WITH GMAIL</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    height: '100%',
    alignItems: 'center',
    resizeMode: 'cover' // or 'stretch'
  },
  containerDiv: {
    height: '100%',
    display: 'flex',
    width: '70%',
    justifyContent: 'space-between'
  },
  titleDiv: { marginTop: '15%' },
  titleText: {
    color: 'white',
    fontSize: 45,
    marginTop: '5%',
    fontWeight: '300',
    textShadowColor: '#000',
    textShadowRadius: 40
  },
  btnGmail: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    paddingVertical: 10,
    width: '100%',
    marginBottom: '10%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5
  },

  buttonDiv: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'flex-start'
  },
  btnIcon: {
    paddingRight: 10,
    fontSize: 27,
    borderRightWidth: 2,
    borderColor: 'white'
  },
  btnText: {
    paddingLeft: 10,
    fontSize: 15,
    fontWeight: '400',
    color: '#fff',
    textAlign: 'center'
  },
  textInput: { fontSize: 18, backgroundColor: 'black', opacity: 0.6, marginVertical: 5, color: 'white' },
  btnEmail: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'grey',
    paddingVertical: 10,
    width: '100%',
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5
  }
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ loginEmail, registerGoogle }, dispatch);
};
const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
