import React from 'react';
import { Text } from 'react-native';
import { Left, Right, Body, Title, Header, Icon } from 'native-base';
import Colors from '../assets/Colors';

export default class HeaderNav extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Header transparent>
        <Left style={{ flex: 1 }}>
          <Text style={{ fontSize: 10 }}>{'north'.toUpperCase()} </Text>
          <Text style={{ fontSize: 10 }}>{'insurance'.toUpperCase()}</Text>
          <Text style={{ fontSize: 10 }}>{'consulting'.toUpperCase()}</Text>
        </Left>
        <Body style={{ flex: 1 }}>
          <Title
            style={{
              alignSelf: 'center',
              color: `${Colors.mainRed}`,
              fontWeight: '100'
            }}
          >
            {this.props.navTitle}
          </Title>
        </Body>
        <Right style={{ flex: 1 }}>
          <Icon style={{ color: '#000', marginRight: 15 }} name="menu" onPress={() => this.props.open()} />
        </Right>
      </Header>
    );
  }
}
