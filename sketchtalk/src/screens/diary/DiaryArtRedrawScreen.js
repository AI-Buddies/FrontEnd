import {
  Text,
  View,
  Dimensions,
  ImageBackground,
  Image,
  Pressable,
} from 'react-native';
import React from 'react';
import ConfirmText from '../../components/confirmtext';
import ConfirmButton from '../../components/confirmbutton';
import colors from '../../constants/colors';
import styled from 'styled-components';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

export default function DiaryArtRedrawScreen() {
  const navigation = useNavigation();
  function TempNavigate() {
    navigation.navigate('DiaryResultScreen');
  }
  return (
    <Background
      source={require('../../assets/background/yellow_bg.png')}
      resizeMode="cover">
      <Text
        style={{
          flex: 1,
          fontSize: 30,
          color: colors.primary,
          textAlign: 'center',
          textAlignVertical: 'center',
          marginTop: 20,
        }}>
        그림을 선택해주세요.
      </Text>
      <DiaryRedrawArtDisplay
        text={'이전 그림'}
        onPress={() => TempNavigate()}
      />
      <DiaryRedrawArtDisplay
        text={'새로 그린 그림'}
        onPress={() => TempNavigate()}
      />
    </Background>
  );
}

const DiaryRedrawArtDisplay = props => (
  <View
    style={{
      flex: 2.5,
      alignItems: 'center',
      width: width * 0.9,
      marginVertical: 10,
    }}>
    <View
      style={{
        height: 100,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: width * 0.9,
      }}>
      <Text
        style={{
          fontSize: 25,
          textAlign: 'left',
          width: width * 0.9,
          marginBottom: 15,
        }}>
        {props.text}
      </Text>
      <Pressable onPress={props.onPress}>
        <Image source={require('../../assets/soccer_diary2.png')} />
      </Pressable>
    </View>
  </View>
);

const Background = styled(ImageBackground)`
  flex: 1;
  width: ${width};
  height: ${height};
  justify-content: center;
  align-items: center;
`;
