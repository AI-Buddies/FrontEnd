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
import {useMutation} from '@tanstack/react-query';
import axios from 'axios';
import {useDiaryGetArtFetch} from './api/DiaryFetch';

const {width, height} = Dimensions.get('window');

export default function DiaryConfirmArtScreen({route}) {
  const navigation = useNavigation();

  //그림 승인
  const ls = require('local-storage');
  const useDiaryConfirmArtFetch = useMutation({
    mutationFn: newTodo => {
      console.log(newTodo);
      const token = ls('token');

      return axios.post(`https://sketch-talk.com/chat/image/save`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onError: error => {
      console.warn('confirmart' + error);
    },

    onSuccess: data => {
      navigation.navigate('DiaryResultStackNavigator', {
        screen: 'DiaryResultScreen',
        params: {
          isCalendar: false,
          diaryId: data.data.data.diaryId,
          achieved: data.data.data.achieved,
          achievedResult: data.data.data.achievedResult,
          ...route.params,
        },
      });
    },
  });

  const confirmArt = () => {
    useDiaryConfirmArtFetch.mutate({
      diaryId: getArtData.data.data.diaryId,
      style: getArtData.data.data.style,
      imageUrl: getArtData.data.data.imageUrl,
    });
  };

  const {userID, content, style_name} = route.params;
  const {
    isPending,
    isError,
    data: getArtData,
    error,
  } = useDiaryGetArtFetch(userID, content, style_name);
  if (isPending) {
    console.log('그림로딩중');
  }
  if (isError) {
    console.log(error.message);
  }

  return (
    <Background
      source={require('../../assets/background/yellow_bg.png')}
      resizeMode="cover">
      {isPending ? (
        <DiaryLoadingScreen
          width={width}
          //onPress={() => setIsLoading(false)}
          loadingText={'또리가 그림을 그리는 중...'}
        />
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <CharacterImage />
          <DiaryArtDisplay imageUrl={getArtData.data.data.imageUrl} />
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
              onPress={() => confirmArt()}
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
      <Image
        style={{width: width * 0.9, height: 100}}
        resizeMode={'contain'}
        source={props.imageUrl}
      />
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
