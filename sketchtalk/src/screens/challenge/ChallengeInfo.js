import React from 'react';
import {View, Text, Image, ImageBackground, Dimensions, StyleSheet, FlatList, Pressable, Platform, StatusBar} from 'react-native';
import colors from '../../constants/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import ChallengeList from '../../components/challengelist';

const { width, height } = Dimensions.get('window');
const TOP = Platform.OS === 'android' ? (StatusBar.currentHeight || 0) : 0;

const DATA = [
    {
        id: '1',
        title: '축구',
        subtitle: '축구가 언급되는 일기 생성',
        image: require('../../assets/challenge/ball.png'),
        completed: false,
    },
    {
        id: '2',
        title: '농구',
        subtitle: '농구가 언급되는 일기 생성',
        image: require('../../assets/challenge/ball.png'),
        completed: true,
    },
    {
        id: '3',
        title: '야구',
        subtitle: '야구가 언급되는 일기 생성',
        image: require('../../assets/challenge/baseball.png'),
        completed: false,
    },
    {
        id: '4',
        title: '배구',
        subtitle: '배구가 언급되는 일기 생성',
        image: require('../../assets/challenge/ball.png'),
        completed: true,
    },
    {
        id: '5',
        title: '탁구',
        subtitle: '탁구가 언급되는 일기 생성',
        image: require('../../assets/challenge/ball.png'),
        completed: false,
    },
    {
        id: '6',
        title: '배드민턴',
        subtitle: '배드민턴이 언급되는 일기 생성',
        image: require('../../assets/challenge/ball.png'),
        completed: false,
    },
]

export default function ChallengeInfo({navigation}) {
    const renderItem = ({item}) => (
        <ChallengeList
            title={item.title}
            subtitle={item.subtitle}
            image={item.image}
            completed={item.completed}
        />
    );

    return (
      <ImageBackground
        source={require('../../assets/background/green_bg.png')}
        resizeMode="cover"
        style={styles.background}
      >
        <View style={styles.header}>
            <Pressable style={styles.headerLeft} hitSlop={8} onPress={() => navigation.goBack()}>
                <Entypo name="chevron-thin-left" size={30} color={colors.redBrown} />
            </Pressable>
            
            <Text style={styles.headerTitle}>도전과제</Text>
        
            <Pressable style={styles.headerRight} hitSlop={8} onPress={() => {}}>
                <Entypo name="menu" size={30} color={colors.redBrown}/>
            </Pressable>
        </View>

        <FlatList
            data={DATA}
            keyExtractor={(it) => it.id}
            renderItem={renderItem}
            contentContainerStyle={{paddingBottom : 24}}
            showsVerticalScrollIndicator = {false}
        />

      </ImageBackground>
    );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: width,
    height: height,
  },
header: {
    marginTop: TOP + 35,
    height: 44,
    paddingHorizontal: 16,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
},
headerTitle: {
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'MangoDdobak-B',
    color: colors.redBrown,
},
headerRight: {
    position: 'absolute',
    right: 16,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
},
headerLeft: {
    position: 'absolute',
    left: 16,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
},
});