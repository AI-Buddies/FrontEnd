import React from 'react';
import {
  ImageBackground,
  Dimensions,
  Text,
  View,
  Pressable,
  FlatList,
  Image,
} from 'react-native';
import styled from 'styled-components/native';
import colors from '../../constants/colors';
import Entypo from 'react-native-vector-icons/Entypo';

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
  {style_name: '화풍10'},
];

export default function CalenderMainScreen() {
  return (
    <Background
      source={require('../../assets/background/blue_bg.png')}
      resizeMode="cover">
      <Text
        style={{
          fontSize: 25,
          flex: 1,
          textAlignVertical: 'bottom',
        }}>
        달력
      </Text>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',

          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Pressable style={{flex: 1, alignItems: 'flex-end'}}>
          <Entypo name="triangle-left" size={40} color={'#8B8FDE'} />
        </Pressable>
        <Text
          style={{
            fontSize: 25,
            flex: 2,
            textAlign: 'center',
            textAlignVertical: 'top',
            marginBottom: 5,
          }}>
          2025년 5월
        </Text>
        <Pressable style={{flex: 1, alignItems: 'flex-start'}}>
          <Entypo name="triangle-right" size={40} color={'#8B8FDE'} />
        </Pressable>
      </View>
      <View style={{flex: 7}}>
        <FlatList
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
          keyExtractor={item => item.style_name}
          fadingEdgeLength={100}
          data={dummyData}
          renderItem={({item}) => <CalendarItem {...item} />}
          numColumns={2}></FlatList>
      </View>
    </Background>
  );
}

const CalendarItem = item => (
  <Pressable
    style={{
      width: 162,
      height: 202,
      textAlign: 'center',
      marginHorizontal: 5,
      marginVertical: 10,
      backgroundColor: colors.creamWhite,
      borderRadius: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }}
    onPress={item.onPress}>
    <Image
      style={{width: 150, height: 129}}
      resizeMode="contain"
      source={require('../../assets/soccer_diary.png')}
    />
    <View style={{width: 162, height: 50}}>
      <Text
        style={{
          flex: 1,
          marginLeft: 10,
          alignSelf: 'flex-start',
          fontSize: 12,
          color: '#d9d9d9',
        }}>
        2000년 00월 00일
      </Text>
      <Text
        style={{
          flex: 1,
          marginHorizontal: 10,
          alignSelf: 'flex-start',
          fontSize: 15,
        }}
        numberOfLines={1}>
        축구하다가 넘어졌지만 괜찮아!
      </Text>
    </View>
  </Pressable>
);

const Background = styled(ImageBackground)`
  flex: 1;
  width: ${width};
  height: ${height};
  justify-content: center;
  align-items: center;
`;
