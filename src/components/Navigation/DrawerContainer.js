import React from 'react';
import {connect} from 'react-redux';
import {SafeAreaView, StyleSheet, View, ScrollView} from 'react-native';
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';

import Home from '../../views/Home';
import Form1 from '../../views/Form1';
import Colors from '../../assets/Colors';
import Logout from '../Logout';
import {Text} from 'native-base';

const CustomDrawerComponent = props => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: `${Colors.mainRed}`,
        flex: 1,
        justifyContent: 'space-evenly',
      }}>
      <View
        style={{
          padding: 15,
          height: 150,
          flex: 1,
        }}>
        <Text style={styles.titleText}>{'north'.toUpperCase()} </Text>
        <Text style={styles.titleText}>{'insurance'.toUpperCase()}</Text>
        <Text style={styles.titleText}>{'consulting'.toUpperCase()}</Text>
        <Text style={styles.greetingText}>
          {`Welcome,\n${
            props.auth.isAuthenticated
              ? props.auth.user.name.split(' ')[0]
              : null
          }`}{' '}
        </Text>
      </View>
      <ScrollView>
        <DrawerItems {...props}></DrawerItems>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error,
});
const Drawer = connect(mapStateToProps)(CustomDrawerComponent);

export default AppDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: Home,
    },
    Form1: Form1,
    Logout: Logout,
  },
  {
    contentComponent: Drawer,
    hideStatusBar: true,
  },
);

const styles = StyleSheet.create({
  btn: {
    backgroundColor: `${Colors.mainRed}`,
    paddingVertical: 10,
    width: '70%',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  btnText: {
    fontSize: 20,
    fontWeight: '400',
    color: '#fff',
    marginHorizontal: 20,
  },
  titleText: {
    fontWeight: '400',
    fontSize: 30,
    color: `${Colors.drawerWhite}`,
  },
  greetingText: {
    fontWeight: '400',
    fontSize: 20,
    color: `${Colors.drawerWhite}`,
    textTransform: 'capitalize',
    marginVertical: 15,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    alignItems: 'center',
    margin: 20,
  },
  avatarImage: {
    borderRadius: 50,
    height: 100,
    width: 100,
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    marginVertical: 20,
  },
  text: {
    textAlign: 'center',
    color: '#333',
    marginBottom: 5,
  },
  buttons: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 20,
    marginBottom: 30,
  },
  h1: {
    marginVertical: 20,
  },
  container: {
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  btnSubmit: {
    backgroundColor: Colors.mainRed,
    paddingVertical: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  btnText: {
    fontSize: 17,
    fontWeight: '400',
    color: '#fff',
    textAlign: 'center',
  },
});
