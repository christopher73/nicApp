import React from 'react';
import { H1, Container, Content } from 'native-base';
import HeaderNav from './HeaderNav';

export default class Signup extends React.Component {
  static navigationOptions = {
    title: 'Signup'
  };
  render() {
    const open = () => this.props.navigation.openDrawer();
    return (
      <Container>
        <HeaderNav open={open} navTitle={'Signup'} />
        <Content>
          <H1>Sign Up</H1>
        </Content>
      </Container>
    );
  }
}
