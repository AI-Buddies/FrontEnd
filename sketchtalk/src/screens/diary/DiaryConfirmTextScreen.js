import {
  Text,
  View,
  Dimensions,
  ImageBackground,
  Image,
  Pressable,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import ConfirmText from '../../components/confirmtext';
import ConfirmButton from '../../components/confirmbutton';
import colors from '../../constants/colors';
import styled from 'styled-components';
import {DiaryLoadingScreen} from './component/DiaryLoadingScreen';
import {useNavigation} from '@react-navigation/native';
import {useDiaryGetTextFetch, useDiaryConfirmTextFetch} from './api/DiaryFetch';

const {width, height} = Dimensions.get('window');

const dummyData = {
  title: '축구하다가 넘어졌지만 재밌었어!',
  content:
    '오늘 학교에서 친구들이랑 운동장에서 축구를 했다. 나는 열심히 뛰다가 그만 넘어져서 무릎이 좀 아팠다. 그래도 친구들이 걱정해줘서 기분이 좋았고, 계속 같이 놀았다. 골은 못 넣었지만 친구들이랑 뛰어다니는 게 너무 재미있었다. 내일도 또 축구하고 싶다!',
};

export default function DiaryConfirmTextScreen() {
  const navigation = useNavigation();
  function TempNavigate() {
    /*useDiaryConfirmTextFetch.mutate(
      userID,
      useDiaryGetTextFetch.data.title,
      useDiaryGetTextFetch.data.content,
    );
    navigation.navigate('DiaryChooseArtstyleScreen', {
      diaryID: useDiaryConfirmTextFetch.data.diaryID, content: useDiaryGetTextFetch.data.content,
    });*/
    navigation.navigate('DiaryChooseArtstyleScreen', {
      diaryID: 'diaryID',
      content: 'content',
    });
  }

  const [isLoading, setIsLoading] = useState(true);

  //const {isPending, isError, data, error} = useDiaryGetTextFetch('userID');

  return (
    <Background
      source={require('../../assets/background/yellow_bg.png')}
      resizeMode="cover">
      {/*{useDiaryGetTextFetch.isPending ? (*/}
      {isLoading ? (
        <DiaryLoadingScreen
          width={width}
          onPress={() => setIsLoading(false)}
          loadingText={'또리가 일기를 작성하는 중...'}
        />
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <CharacterImage />
          <DiaryDisplay
            //item={useDiaryGetTextFetch.data}
            item={dummyData}
          />
          <ConfirmText text={'다시 써볼까?'} width={width} flex={0.5} />
          <View style={{flex: 1.7}}>
            <ConfirmButton
              text={'응! 다시 써줘.'}
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
        </View>
      )}
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

const DiaryDisplay = props => (
  <View style={{flex: 3, justifyContent: 'flex-start', alignItems: 'center'}}>
    <View
      style={{
        height: 220,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: width * 0.9,
        backgroundColor: colors.creamWhite,
        marginVertical: 10,
        borderRadius: 10,
        borderColor: colors.black,
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
        elevation: 1,
      }}>
      <View style={{position: 'absolute'}}>
        <NotebookLine />
        <NotebookLine />
        <NotebookLine />
        <NotebookLine />
        <NotebookLine />
        <NotebookLine />
        <NotebookLine />
      </View>
      <Text
        style={{
          fontSize: 14,
          fontFamily: 'MangoDdobak-R',
          justifyContent: 'flex-start',
          width: width * 0.9 - 2,
          paddingHorizontal: 10,
          lineHeight: 30,
        }}>
        제목 : {props.item.title}
      </Text>
      <Text
        style={{
          fontSize: 14,
          fontFamily: 'MangoDdobak-R',
          includeFontPadding: false,
          justifyContent: 'flex-start',
          paddingHorizontal: 10,
          width: width * 0.9 - 2,
          lineHeight: 30,
        }}>
        {props.item.content}
      </Text>
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

const NotebookLine = () => (
  <View
    style={{
      height: 30.4,
      width: width * 0.9 - 12,
      borderTopColor: '#0000',
      borderLeftColor: '#0000',
      borderRightColor: '#0000',
      borderBottomColor: colors.gray200,
      borderWidth: 1,
    }}
  />
);
