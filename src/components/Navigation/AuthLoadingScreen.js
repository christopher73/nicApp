import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loginEmail, registerGoogle } from '../../redux/actions/actions';
import { bindActionCreators } from 'redux';
import { ActivityIndicator, StatusBar, StyleSheet, View, Linking } from 'react-native';

function AuthLoadingScreen(props) {
  // Render any loading content that you like here

  console.log('from Auth Loading ... User: ' + JSON.stringify(props.auth));
  useEffect(() => {
    props.auth.isAuthenticated ? props.navigation.navigate('App') : props.navigation.navigate('Auth');
  });
  return (
    <View style={styles.container}>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ loginEmail, registerGoogle }, dispatch);
};
const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen);
