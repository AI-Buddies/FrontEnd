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
import {useNavigation} from '@react-navigation/native';
import {useDiaryGetArtFetch} from './api/DiaryFetch';

const {width, height} = Dimensions.get('window');

export default function DiaryConfirmArtScreen({route}) {
  const navigation = useNavigation();
  function TempNavigate() {
    navigation.navigate('DiaryResultStackNavigator', {
      screen: 'DiaryResultScreen',
      params: {
        date: new Date(2025, 4, 1),
        isCalendar: false,
        //image_url: useDiaryGetArtFetch.data.image_url,
        image_url: 'image_url',
        confirmArt: true,
        ...route.params,
      },
    });
  }

  //const {isPending, isError, data, error} = useDiaryGetArtFetch(userID, content, style_name);
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
            또리가 그림을 그리는 중...
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
                  fontSize: 25,
                  fontFamily: 'MangoDdobak-B',
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
              가지를 고르면 좋아! 오늘 친구랑 축구한 것처럼 말이야 :) 일기를 쓸
              때 너무 많은 걸 쓰려고 하지 말고, 가장 기억에 남는 한 가지를
              고르면 좋아! 오늘 친구랑 축구한 것처럼 말이야 :)
            </Text>
          </View>
        </View>
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
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
