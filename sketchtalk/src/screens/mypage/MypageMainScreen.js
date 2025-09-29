import React from 'react';
import { ImageBackground, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import colors from '../../constants/colors';
import ConfirmButton from '../../components/confirmbutton';

const { width, height } = Dimensions.get('window');

export default function MypageMainScreen({ navigation }) {
  return (
    <Background
      source={require('../../assets/background/yellow_bg.png')}
      resizeMode="cover"
    >
      <Logo source={require('../../assets/logo.png')} />
      <ConfirmButton
          text = "로그아웃"
          color = {colors.primary}
          width = {width}
          marginBottom = {0}
          onPress={() => navigation.replace('AuthStackNavigator')}
      />
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

const Logo = styled.Image`
  position: absolute;
  top: 20px;
  left: 20px;
`;

const Message = styled.Text`
  font-size: 16px;
  color: ${colors.primary};
`;
