import {Text, View, Dimensions, ImageBackground, Image} from 'react-native';
import React from 'react';
import ConfirmText from '../../components/confirmtext';
import ConfirmButton from '../../components/confirmbutton';
import colors from '../../constants/colors';
import styled from 'styled-components';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

export default function DiaryConfirmArtScreen() {
  const navigation = useNavigation();
  function TempNavigate() {
    navigation.navigate('DiaryResultStackNavigator', {
      screen: 'DiaryResultScreen',
      params: {date: new Date(2025, 4, 1), isCalendar: false},
    });
  }
  return (
    <Background
      source={require('../../assets/background/yellow_bg.png')}
      resizeMode="cover">
      <CharacterImage />
      <DiaryArtDisplay />
      <ConfirmText text={'다시 그려줄까?'} width={width} flex={0.5} />
      <View style={{flex: 1.7}}>
        <ConfirmButton
          text={'응! 다시 그려줘.'}
          color={colors.primary}
          marginBottom={0}
        />
        <ConfirmButton
          text={'아니야! 마음에 들어.'}
          color={colors.blue}
          marginBottom={22}
          onPress={TempNavigate}
        />
      </View>
    </Background>
  );
}

const CharacterImage = () => (
  <View
    style={{
      flex: 2.5,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 19,
    }}>
    <Image source={require('../../assets/character/question_bear.png')} />
  </View>
);

const DiaryArtDisplay = props => (
  <View
    style={{
      flex: 2.6,
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
      <Image source={require('../../assets/soccer_diary2.png')} />
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
