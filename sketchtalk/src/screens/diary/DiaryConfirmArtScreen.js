import {Text, View, Dimensions, ImageBackground, Image} from 'react-native';
import React from 'react';
import ConfirmText from '../../components/confirmtext';
import ConfirmButton from '../../components/confirmbutton';
import colors from '../../constants/colors';
import styled from 'styled-components';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const dummyData = {
  title: '축구하다가 넘어졌지만 재밌었어!',
  content:
    '오늘 학교에서 친구들이랑 운동장에서 축구를 했다. 나는 열심히 뛰다가 그만 넘어져서 무릎이 좀 아팠다. 그래도 친구들이 걱정해줘서 기분이 좋았고, 계속 같이 놀았다. 골은 못 넣었지만 친구들이랑 뛰어다니는 게 너무 재미있었다. 내일도 또 축구하고 싶다!',
};

export default function DiaryConfirmTextScreen() {
  const navigation = useNavigation();
  function TempNavigate() {
    navigation.navigate('DiaryInProgressScreen');
  }
  return (
    <Background
      source={require('../../assets/background/yellow_bg.png')}
      resizeMode="cover">
      <CharacterImage />
      <DiaryArtDisplay item={dummyData} />
      <ConfirmText text={'다시 그려줄까?'} width={width} flex={0.5} />
      <ConfirmButton
        text={'응! 다시 그려줘.'}
        color={colors.primary}
        width={width}
        marginBottom={0}
      />
      <ConfirmButton
        text={'아니야! 마음에 들어.'}
        color={colors.blue}
        width={width}
        marginBottom={22}
        onPress={TempNavigate}
      />
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
    <Image source={require('../../assets/character/question_bear.png')} />
  </View>
);

const DiaryArtDisplay = props => (
  <View
    style={{
      flex: 3,
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: width * 0.9,
      marginVertical: 10,
    }}>
    <Image source={require('../../assets/soccer_diary2.png')} />
  </View>
);

const Background = styled(ImageBackground)`
  flex: 1;
  width: ${width};
  height: ${height};
  justify-content: center;
  align-items: center;
`;
