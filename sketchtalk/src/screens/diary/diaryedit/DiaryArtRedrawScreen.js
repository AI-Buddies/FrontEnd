import {
  Text,
  View,
  Dimensions,
  ImageBackground,
  Image,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import ConfirmText from '../../../components/confirmtext';
import ConfirmButton from '../../../components/confirmbutton';
import colors from '../../../constants/colors';
import styled from 'styled-components';
import {DiaryLoadingScreen} from '../component/DiaryLoadingScreen';
import {useNavigation} from '@react-navigation/native';
import {useDiaryRedrawImageFetch} from '../api/DiaryFetch';

const {width, height} = Dimensions.get('window');

export default function DiaryArtRedrawScreen({route}) {
  const navigation = useNavigation();
  function TempNavigate(image_url) {
    navigation.navigate('DiaryResultScreen', {
      image_url: 'image_url', //new image
      ...route.params,
    });
  }

  const {content, style_name, image_url} = route.params;

  //const {data, error, isFetching, isLoading} = useDiaryRedrawImageFetch(content, style_name, image_url);
  const [isLoading, setIsLoading] = useState(true);
  return (
    <Background
      source={require('../../../assets/background/yellow_bg.png')}
      resizeMode="cover">
      {isLoading ? (
        <DiaryLoadingScreen
          width={width}
          onPress={() => setIsLoading(false)}
          loadingText={'또리가 그림을 그리는 중...'}
        />
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text
            style={{
              flex: 1,
              fontSize: 30,
              fontFamily: 'MangoDdobak-B',
              includeFontPadding: false,
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
        </View>
      )}
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
          fontFamily: 'MangoDdobak-B',
          includeFontPadding: false,
          textAlign: 'left',
          width: width * 0.9,
          marginBottom: 15,
        }}>
        {props.text}
      </Text>
      <Pressable onPress={props.onPress}>
        <Image source={require('../../../assets/soccer_diary2.png')} />
      </Pressable>
    </View>
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
      source={require('../../../assets/character/ellipse.png')}
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
        source={require('../../../assets/character/writing_bear.png')}
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
