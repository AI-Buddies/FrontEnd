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
        <DiaryLoadingScreen
          width={width}
          onPress={() => setIsLoading(false)}
          loadingText={'또리가 그림을 그리는 중...'}
        />
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
