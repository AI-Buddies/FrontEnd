import React from 'react';
import { ImageBackground, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import colors from '../../constants/colors';

const { width, height } = Dimensions.get('window');

export default function CalenderMainScreen() {
  return (
    <Background
      source={require('../../assets/background/blue_bg.png')}
      resizeMode="cover"
    >
    </Background>
  );
}


const Background = styled(ImageBackground)`
  flex: 1;
  width: ${width}px;
  height: ${height}px;
  justify-content: center;
  align-items: center;
`;

const Message = styled.Text`
  font-size: 16px;
  color: ${colors.primary};
`;
