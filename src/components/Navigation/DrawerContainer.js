import React from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, StyleSheet, View, ScrollView } from 'react-native';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';

import Home from '../../views/Home';
import Form1 from '../../views/Form1';
import Colors from '../../assets/Colors';
import Logout from '../Logout';
import { Text } from 'native-base';

const CustomDrawerComponent = props => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: `${Colors.mainRed}`,
        flex: 1,
        justifyContent: 'space-evenly'
      }}
    >
      <View
        style={{
          padding: 15,
          height: 150,
          flex: 1
        }}
      >
        <Text style={styles.titleText}>{'north'.toUpperCase()} </Text>
        <Text style={styles.titleText}>{'insurance'.toUpperCase()}</Text>
        <Text style={styles.titleText}>{'consulting'.toUpperCase()}</Text>
        <Text style={styles.greetingText}>{`Welcome,\n${props.auth.isAuthenticated ? props.auth.user.name.split(' ')[0] : null}`} </Text>
      </View>
      <ScrollView>
        <DrawerItems {...props}></DrawerItems>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error
});
const Drawer = connect(mapStateToProps)(CustomDrawerComponent);

export default AppDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: Home
    },
    Form1: Form1,
    Logout: Logout
  },
  {
    contentComponent: Drawer,
    hideStatusBar: true
  }
);

const styles = StyleSheet.create({
  titleText: {
    fontWeight: '400',
    fontSize: 30,
    color: `${Colors.drawerWhite}`
  },
  greetingText: {
    fontWeight: '400',
    fontSize: 20,
    color: `${Colors.drawerWhite}`,
    textTransform: 'capitalize',
    marginVertical: 15
  }
});
