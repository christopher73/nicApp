import React from 'react';
import {connect} from 'react-redux';
import {logoutUser} from '../redux/actions/actions';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Container} from 'native-base';
import Colors from '../assets/Colors';
import {Text} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import HeaderNav from './HeaderNav';

class Logout extends React.Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    drawerLabel: () => (
      <Text style={{color: '#fff', fontSize: 20, marginVertical: 20}}>
        Log Out
      </Text>
    ),
    drawerIcon: () => (
      <Icon
        style={{
          color: 'white',
          fontSize: 25,
        }}
        name="arrow-circle-left"
      />
    ),
  };

  logoutNow = () => {
    console.log('pressed LOG-OUT BUTTON');
    this.props.logoutUser();
    this.props.navigation.navigate('Auth');
  };
  render() {
    const open = () => this.props.navigation.openDrawer();
    return (
      <Container>
        <HeaderNav open={open} navTitle={'Home'} />
        <View style={styles.content}>
          <Text style={styles.header}>Are you sure you wan to log out?</Text>
          <TouchableOpacity style={styles.btn} onPress={this.logoutNow}>
            <Text style={styles.btnText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              this.props.navigation.navigate('Home');
            }}>
            <Text style={styles.btnText}>No</Text>
          </TouchableOpacity>
        </View>
      </Container>
    );
  }
}
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
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
  btnText: {
    fontSize: 17,
    fontWeight: '400',
    color: '#fff',
    textAlign: 'center',
  },
});

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error,
});
export default connect(mapStateToProps, {logoutUser})(Logout);
