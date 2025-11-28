import {
  Text,
  View,
  Dimensions,
  ImageBackground,
  Image,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import ConfirmText from '../../components/confirmtext';
import ConfirmButton from '../../components/confirmbutton';
import colors from '../../constants/colors';
import styled from 'styled-components';
import {useNavigation} from '@react-navigation/native';
import {useDiaryConfirmTextFetch} from './api/DiaryFetch';

const {width, height} = Dimensions.get('window');

const dummyData = {
  title: '축구하다가 넘어졌지만 재밌었어!',
  content:
    '오늘 학교에서 친구들이랑 운동장에서 축구를 했다. 나는 열심히 뛰다가 그만 넘어져서 무릎이 좀 아팠다. 그래도 친구들이 걱정해줘서 기분이 좋았고, 계속 같이 놀았다. 골은 못 넣었지만 친구들이랑 뛰어다니는 게 너무 재미있었다. 내일도 또 축구하고 싶다!',
};

export default function DiaryConfirmTextScreen() {
  const navigation = useNavigation();
  function TempNavigate() {
    navigation.navigate('DiaryChooseArtstyleScreen');
  }

  //const {data, error, isFetching, isLoading} = useDiaryGetTextFetch(userID);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Background
      source={require('../../assets/background/yellow_bg.png')}
      resizeMode="cover">
      {isLoading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
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
          <LoadingCharacterImage />
          <View
            style={{
              flex: 3,
              justifyContent: 'flex-start',
              width: width * 0.9,
              marginBottom: 50,
            }}>
            <Pressable
              style={{alignSelf: 'flex-start', fontSize: 25, marginTop: 20}}
              onPress={() => setIsLoading(false)}>
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
              일기를 쓸 때 너무 많은 걸 쓰려고 하지 말고, 가장 기억에 남는 한
              가지를 고르면 좋아! 오늘 친구랑 축구한 것처럼 말이야 :)
            </Text>
          </View>
        </View>
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <CharacterImage />
          <DiaryDisplay
            //item={data.data}
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

const LoadingCharacterImage = () => (
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
