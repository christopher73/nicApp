import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
export default function VerifiedMessage({ styles }) {
  return (
    <View style={styles.containerDiv}>
      <Text
        style={{
          marginTop: 50,
          textAlign: 'center',
          fontSize: 60,
          color: 'white'
        }}
      >
        Account Verified
      </Text>
      <Icon
        style={{
          color: 'green',
          fontSize: 140,
          textAlign: 'center'
        }}
        name="check-circle"
      />
    </View>
  );
}
