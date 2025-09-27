import {Pressable, Text, View} from 'react-native';
import React from 'react';
import colors from '../constants/colors';

const ConfirmButton = ({
  flex = 1,
  width = 260,
  height = 55,
  fontSize = 20,
  ...props
}) => (
  <View
    style={{
      flex: flex,
      justifyContent: 'center',
      alignItems: 'center',
      width: width,
    }}>
    <Pressable
      style={{
        width: width,
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
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
      <Text
        style={{
          fontSize: fontSize,
          color: colors.white,
          textAlignVertical: 'bottom',
          marginbottom: 6,
        }}>
        {props.text}
      </Text>
    </Pressable>
  </View>
);

export default ConfirmButton;
