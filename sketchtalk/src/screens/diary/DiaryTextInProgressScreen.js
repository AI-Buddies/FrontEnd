import {
  Text,
  View,
  Dimensions,
  ImageBackground,
  Image,
  Pressable,
} from 'react-native';
import React from 'react';
import colors from '../../constants/colors';
import styled from 'styled-components';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

export default function DiaryTextInProgressScreen() {
  const navigation = useNavigation();
  function TempNavigate() {
    navigation.navigate('DiaryConfirmTextScreen');
  }
  return (
    <Background
      source={require('../../assets/background/yellow_bg.png')}
      resizeMode="cover">
      <Text
        style={{
          flex: 1,
          marginTop: 100,
          fontFamily: 'MangoDdobak-B',
          fontSize: 30,
          color: colors.primary,
        }}>
        또리가 일기를 작성 중...
      </Text>
      <CharacterImage />
      <View
        style={{
          flex: 3,
          justifyContent: 'flex-start',
          width: width * 0.9,
          marginBottom: 50,
        }}>
        <Pressable
          style={{alignSelf: 'flex-start', fontSize: 25, marginTop: 20}}
          onPress={TempNavigate}>
          <Text
            style={{
              alignSelf: 'flex-start',
              fontFamily: 'MangoDdobak-B',
              fontSize: 25,
              marginTop: 0,
            }}>
            오늘의 추천💡
          </Text>
        </Pressable>
        <Text
          style={{
            alignSelf: 'flex-start',
            fontSize: 20,
            fontFamily: 'MangoDdobak-R',
            lineHeight: 29,
            marginTop: 20,
          }}>
          일기를 쓸 때 너무 많은 걸 쓰려고 하지 말고, 가장 기억에 남는 한 가지를
          고르면 좋아! 오늘 친구랑 축구한 것처럼 말이야 :)
        </Text>
      </View>
    </Background>
  );
}

const CharacterImage = () => (
  <View
    style={{
      flex: 3,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <ImageBackground
      source={require('../../assets/character/ellipse.png')}
      style={{
        width: 360,
        height: 360,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        style={{
          shadowColor: colors.primary,
          borderRadius: 120,
        }}
        source={require('../../assets/character/writing_bear.png')}
      />
    </ImageBackground>
  </View>
);

const Background = styled(ImageBackground)`
  flex: 1;
  width: ${width};
  height: ${height};
  justify-content: center;
  align-items: center;
`;
