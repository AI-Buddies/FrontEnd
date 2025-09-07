import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import colors from '../constants/colors';

const ConfirmText = props => (
  <View
    style={{
      alignItems: 'flex-start',
      width: props.width * 0.9,
      marginBottom: 20,
      paddingRight: 65,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
    }}>
    <View
      style={{
        backgroundColor: colors.creamWhite,
        paddingVertical: 7,
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        borderBottomRightRadius: 18,
        elevation: 1,
      }}>
      <Text
        style={{
          fontSize: 16,
          textAlign: 'left',
          paddingHorizontal: 10,
          marginBottom: 3,
          color: colors.black,
        }}>
        {props.text}
      </Text>
    </View>
  </View>
);

export default ConfirmText;
