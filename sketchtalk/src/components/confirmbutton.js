import {Pressable, Text} from 'react-native';
import React from 'react';
import colors from '../constants/colors';

const ConfirmButton = props => (
  <Pressable
    style={{
      flex: 0.9,
      justifyContent: 'center',
      alignItems: 'center',
      width: props.width * 0.65,
      borderRadius: 36,
      backgroundColor: props.color,
      marginBottom: props.marginBottom,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    }}
    onPress={props.onPress}>
    <Text style={{fontSize: 20, paddingBottom: 6, color: colors.white}}>
      {props.text}
    </Text>
  </Pressable>
);

export default ConfirmButton;
