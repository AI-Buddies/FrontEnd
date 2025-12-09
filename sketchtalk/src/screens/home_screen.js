import React from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import colors from '../constants/colors';
import {
  ImageBackground,
  Pressable,
  Dimensions,
  Text,
  View,
  Image,
} from 'react-native';

const {width, height} = Dimensions.get('window');

export default function HomeScreen() {
  const navigation = useNavigation();
  return (
    <Background
      source={require('../assets/background/yellow_bg.png')}
      resizeMode="cover">
      <AppLogo />
      <CharacterImage
        onPress={() => navigation.navigate('DiaryStackNavigator')}
      />
    </Background>
  );
}

const AppLogo = () => (
  <Image
    source={require('../assets/logo.png')}
    style={{
      position: 'absolute',
      top: 10,
      left: 10,
      width: 80,
      height: 80,
    }}
  />
);

const CharacterImage = props => (
  <Pressable
    onPress={props.onPress}
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
    }}>
    <Image source={require('../assets/character/bear_home.png')} />
    <View
      style={{
        width: width,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        style={{width: width * 0.9}}
        resizeMode="contain"
        source={require('../assets/character/home_comment.png')}
      />
    </View>
  </Pressable>
);

const Background = styled(ImageBackground)`
  flex: 1;
  width: ${width};
  height: ${height};
  justify-content: center;
  align-items: center;
`;
