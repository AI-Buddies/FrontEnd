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
  {
    id: 1,
    dateYear: 2025,
    dateMonth: 5,
    dateDay: 21,
    title: '축구하다가 넘어졌지만 괜찮아!',
  },
  {
    id: 2,
    dateYear: 2025,
    dateMonth: 5,
    dateDay: 23,
    title: '축구하다 넘어졌지만 괜찮아!',
  },
  {
    id: 3,
    dateYear: 2025,
    dateMonth: 5,
    dateDay: 24,
    title: '넘어졌지만 괜찮아!',
  },
  {
    id: 4,
    dateYear: 2025,
    dateMonth: 5,
    dateDay: 25,
    title: '넘어졌지만 괜찮아!',
  },
  {
    id: 5,
    dateYear: 2025,
    dateMonth: 5,
    dateDay: 25,
    title: '축구하다 넘어졌지만 괜찮아!',
  },
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
      <CalendarNavigator />
      <View style={{flex: 7}}>
        <FlatList
          contentContainerStyle={{
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}
          keyExtractor={item => item.id}
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
        {item.dateYear}년 {item.dateMonth}월 {item.dateDay}일
      </Text>
      <Text
        style={{
          flex: 1,
          marginHorizontal: 10,
          alignSelf: 'flex-start',
          fontSize: 15,
        }}
        numberOfLines={1}>
        {item.title}
      </Text>
    </View>
  </Pressable>
);

const CalendarNavigator = () => (
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
);

const Background = styled(ImageBackground)`
  flex: 1;
  width: ${width};
  height: ${height};
  justify-content: center;
  align-items: center;
`;
