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
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

export default function DiaryArtRedrawScreen({route}) {
  const navigation = useNavigation();
  function TempNavigate() {
    navigation.navigate('DiaryResultScreen', {...route.params});
  }
  //const {data, error, isFetching, isLoading} = useDiaryGetArtFetch(userID);
  const [isLoading, setIsLoading] = useState(true);
  return (
    <Background
      source={require('../../../assets/background/yellow_bg.png')}
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
