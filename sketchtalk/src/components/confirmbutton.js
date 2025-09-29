import {Pressable, Text, View} from 'react-native';
import React from 'react';
import colors from '../constants/colors';

const ConfirmButton = props => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: props.width * 0.65,
    }}>
    <Pressable
      style={{
        width: props.width * 0.65,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 36,
        backgroundColor: props.color,
        marginBottom: props.marginBottom,
        shadowColor: colors.black,
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
  </View>
);

export default ConfirmButton;
