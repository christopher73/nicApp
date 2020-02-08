import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { H1, Container, Content } from 'native-base';
import HeaderNav from '../components/HeaderNav';
import Colors from '../assets/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import t from 'tcomb-form-native'; // 0.6.9
import { sendForm1 } from '../utils/sendForms';
const _ = require('lodash');
/* 
ONLINE HELP :
https://github.com/gcanti/tcomb-form-native#api
https://github.com/gcanti/tcomb-form-native/blob/master/lib/stylesheets/bootstrap.js
https://github.com/gcanti/tcomb-form-native/blob/master/docs/STYLESHEETS.md=
*/
const Form = t.form.Form;

const User = t.struct({
  firstName: t.String,
  lastName: t.String,
  medicaid: t.String,
  phone: t.Number,
  medicare: t.Boolean,
  homecare: t.Boolean,
  transportation: t.Boolean,
  comment: t.String
});

const stylesheet = _.cloneDeep(t.form.Form.stylesheet);
stylesheet.fieldset.width = '100%';
stylesheet.formGroup.normal.flexDirection = 'row';
stylesheet.textboxView.normal.flex = 2;
stylesheet.controlLabel.normal.flex = 1;
stylesheet.controlLabel.normal.textTransform = 'capitalize';
stylesheet.controlLabel.error.textTransform = 'capitalize';
stylesheet.formGroup.normal.marginBottom = 20;
stylesheet.formGroup.error.marginBottom = 20;

class Form1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sent: false,
      value: {},
      options: {
        stylesheet: stylesheet,
        fields: {
          email: {
            // you can use strings or JSX
            error: 'Insert a valid email'
          },
          firstName: {
            error: 'Required field!',
            placeholder: 'Required'
          },
          lastName: {
            error: 'Required field!',
            placeholder: 'Required'
          },
          medicaid: {
            error: 'Required field!',
            placeholder: 'Required'
          },
          phone: {
            error: 'Required field!',
            placeholder: 'Required'
          },
          medicare: { placeholder: 'Optional' },
          homecare: { placeholder: 'Optional' },
          transportation: { placeholder: 'Optional' },
          comment: {
            placeholder: 'Optional'
          }
        }
      }
    };
  }
  static navigationOptions = {
    drawerLabel: () => <Text style={{ color: '#fff', fontSize: 20, marginVertical: 20 }}>Forms</Text>,
    drawerIcon: () => (
      <Icon
        style={{
          color: 'white',
          fontSize: 25
        }}
        name="file-text-o"
      />
    )
  };
  handleSubmit = () => {
    const clientInfo = this._form.getValue(); // use that ref to get the form value
    let phone = clientInfo.phone.toString();
    let repsName = this.props.auth.user.name;
    let repsEmail = this.props.auth.user.email;
    let clientData = {
      ...clientInfo,
      phone: phone,
      repsName: repsName,
      repsEmail: repsEmail
    };
    console.log('clientInfo: ', clientData);
    sendForm1(clientData);
    clientInfo ? this.setState({ sent: true }) : null;
  };
  handleSubmitAgain = () => {
    this.setState({ value: null, sent: false });
  };
  render() {
    const open = () => this.props.navigation.openDrawer();
    console.log(this.props.auth);
    return (
      <Container>
        <HeaderNav open={open} navTitle={'Referral Form'} />
        <Content>
          {this.state.sent ? (
            <View style={styles.container}>
              <Text
                style={{
                  marginTop: 50,
                  textAlign: 'center',
                  fontSize: 50
                }}
              >
                Form Sent !
              </Text>

              <Icon
                style={{
                  color: 'green',
                  fontSize: 100,
                  textAlign: 'center'
                }}
                name="check-circle"
              />

              <H1 style={{ ...styles.h1, textAlign: 'center' }}>Do you want to send another Form ?</H1>
              <TouchableOpacity style={styles.btnSubmit} onPress={this.handleSubmitAgain}>
                <Text style={styles.btnText}>Yes</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.container}>
              <H1 style={styles.h1}>Please complete the form.</H1>
              <Form ref={c => (this._form = c)} type={User} value={this.state.value} options={this.state.options} />
              <TouchableOpacity style={styles.btnSubmit} onPress={this.handleSubmit}>
                <Text style={styles.btnText}>Submit</Text>
              </TouchableOpacity>
            </View>
          )}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  h1: {
    marginVertical: 20
  },
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    padding: 20,
    backgroundColor: '#ffffff'
  },
  btnSubmit: {
    backgroundColor: Colors.mainRed,
    paddingVertical: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
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

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error
});

export default connect(mapStateToProps)(Form1);
