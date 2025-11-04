import {
  Text,
  View,
  Dimensions,
  ImageBackground,
  Image,
  FlatList,
  Pressable,
} from 'react-native';
import React from 'react';
import ConfirmText from '../../../components/confirmtext';
import styled from 'styled-components';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const dummyData = [
  {style_name: '화풍1'},
  {style_name: '화풍2'},
  {style_name: '화풍3'},
  {style_name: '화풍4'},
  {style_name: '화풍5'},
  {style_name: '화풍6'},
  {style_name: '화풍7'},
  {style_name: '화풍8'},
  {style_name: '화풍9'},
];

export default function DiaryEditChooseArtstyleScreen({route}) {
  const navigation = useNavigation();
  function TempNavigate() {
    navigation.navigate('DiaryArtRedrawScreen', {...route.params});
  }
  return (
    <Background
      source={require('../../../assets/background/yellow_bg.png')}
      resizeMode="cover">
      <View
        style={{
          flex: 1.15,
          width: width * 0.9,
          marginTop: 100,
          marginBottom: 10,
        }}>
        <FlatList
          contentContainerStyle={{
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}
          keyExtractor={item => item.style_name}
          fadingEdgeLength={100}
          data={dummyData}
          renderItem={({item}) => (
            <MessageItem {...item} onPress={TempNavigate} />
          )}
          numColumns={2}></FlatList>
      </View>
      <ConfirmText text={'어떤 스타일로 그려줄까?'} width={width} flex={0.55} />
    </Background>
  );
}

const MessageItem = item => (
  <Pressable
    style={{
      width: 150,
      height: 125,
      textAlign: 'center',
      marginHorizontal: 5,
      marginVertical: 10,
    }}
    onPress={item.onPress}>
    <Image
      style={{width: 150, height: 125}}
      resizeMode="contain"
      source={require('../../../assets/soccer_diary.png')}
    />
    <Text style={{alignSelf: 'flex-end'}}>{item.style_name}</Text>
  </Pressable>
);

const Background = styled(ImageBackground)`
  flex: 1;
  width: ${width};
  height: ${height};
  justify-content: center;
  align-items: center;
`;
