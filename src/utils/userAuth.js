import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import firebase from 'react-native-firebase';

const GOOGLECLIENTID = '513987502158-aisv8hs5dh520clh3vpcdqb97cj8la95.apps.googleusercontent.com';
// await firebase
//   .auth()
//   .verifyPhoneNumber(phoneNumber)
//   .on(
//     'state_changed',
//     phoneAuthSnapshot => {
//       switch (phoneAuthSnapshot.state) {
//         case firebase.auth.PhoneAuthState.CODE_SENT: // or 'sent'
//           console.log('code sent');
//           break;
//         case firebase.auth.PhoneAuthState.ERROR: // or 'error'
//           console.log('verification error');
//           console.log(phoneAuthSnapshot.error);
//           break;
//         case firebase.auth.PhoneAuthState.AUTO_VERIFY_TIMEOUT: // or 'timeout'
//           console.log('auto verify on android timed out');
//           break;
//         case firebase.auth.PhoneAuthState.AUTO_VERIFIED: // or 'verified'
//           console.log('auto verified on android');
//           console.log(phoneAuthSnapshot);
//           const { verificationId, code } = phoneAuthSnapshot;
//           const cred = firebase.auth.PhoneAuthProvider.credential(verificationId, code);

//           // Do something with your new credential, e.g.:
//           //firebase.auth().signInWithCredential(credential);
//           firebase.auth().currentUser.linkWithCredential(cred);
//           break;
//       }
//     },
//     error => {
//       console.log(error);
//       console.log(error.verificationId);
//     },
//     phoneAuthSnapshot => {
//       console.log(phoneAuthSnapshot);
//     }
//   );

export const _signIn = async phoneNumber => {
  try {
    await GoogleSignin.configure({
      webClientId: GOOGLECLIENTID,
      offlineAccess: true
    });
    await GoogleSignin.hasPlayServices();
    let userInfo = await GoogleSignin.signIn();
    //firebase
    const credential = firebase.auth.GoogleAuthProvider.credential(userInfo.idToken, userInfo.accessToken);
    const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
    console.warn(JSON.stringify(firebaseUserCredential.user.toJSON(), null, 2));

    //registerUser(userInfo.user);
    //navigation.navigate('AuthLoading');
    //console.log(userInfo.user);
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
