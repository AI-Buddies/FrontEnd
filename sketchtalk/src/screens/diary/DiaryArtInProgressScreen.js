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

export default function DiaryArtInProgressScreen() {
  const navigation = useNavigation();
  function TempNavigate() {
    navigation.navigate('DiaryConfirmArtScreen');
  }
  return (
    <Background
      source={require('../../assets/background/yellow_bg.png')}
      resizeMode="cover">
      <Text
        style={{
          flex: 1,
          marginTop: 100,
          fontSize: 30,
          color: colors.primary,
        }}>
        또리가 그림을 그리는 중...
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
          <Text style={{alignSelf: 'flex-start', fontSize: 25, marginTop: 0}}>
            오늘의 추천💡
          </Text>
        </Pressable>
        <Text style={{alignSelf: 'flex-start', fontSize: 20, marginTop: 20}}>
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
      paddingTop: 19,
    }}>
    <Image source={require('../../assets/character/writing_bear.png')} />
  </View>
);

const Background = styled(ImageBackground)`
  flex: 1;
  width: ${width};
  height: ${height};
  justify-content: center;
  align-items: center;
`;
