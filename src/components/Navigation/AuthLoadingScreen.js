import React from 'react';
import {connect} from 'react-redux';
import {loginEmail, registerGoogle} from '../../redux/actions/actions';
import {bindActionCreators} from 'redux';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
  Linking,
} from 'react-native';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log('START listenning');
    if (Platform.OS === 'android') {
      Linking.getInitialURL()
        .then(url => {
          console.log('url is', url);
          if (url === null) this.props.navigation.navigate('Auth');
          else this.handleOpenURL({url});
        })
        .catch(err => {
          console.log('error is ' + err);
        });
    } else {
      Linking.addEventListener('url', this.handleOpenURL);
    }
    // }
  }

  componentWillUnmount() {
    // Remove event listener
    console.log('STOP listenning');
    Linking.removeEventListener('url', this.handleOpenURL);
  }
  handleOpenURL = ({url}) => {
    // Extract stringified user string out of the URL
    const [, user_string] = url.match(/user=([^#]+)/);
    const data = JSON.parse(decodeURI(user_string));
    console.log(data);
    this.props.loginEmail(data);

    this.props.navigation.navigate('App');

    if (Platform.OS === 'ios') {
      SafariView.dismiss();
    }
  };

  // Render any loading content that you like here
  render() {
    console.log('from AUTHLOADING ' + this.props.auth.isAuthenticated);

    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
const mapDispatchToProps = dispatch => {
  return bindActionCreators({loginEmail, registerGoogle}, dispatch);
};
const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen);
