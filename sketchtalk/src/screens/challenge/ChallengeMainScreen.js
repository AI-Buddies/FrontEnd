import React from 'react';
import {View, Text, Image, ImageBackground, Dimensions, StyleSheet, FlatList, Pressable, Platform, StatusBar} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import colors from '../../constants/colors';
import ChallengeTask from '../../components/challengeTask';

const { width, height } = Dimensions.get('window');
const TOP = Platform.OS === 'android' ? (StatusBar.currentHeight || 0) : 0;
const GAP = 20;
const CARD_W = (width - GAP * 3) / 2;

const DATA = [
  {
    id: 'family',
    title: '가족',
    image: require('../../assets/challenge/family.png'),
    done: 6,
    total: 6,
  },
  {
    id: 'playground',
    title: '놀이터',
    image: require('../../assets/challenge/playground.png'),
    done: 1,
    total: 20,
  },
  {
    id: 'exercise',
    title: '운동',
    image: require('../../assets/challenge/ball.png'),
    done: 2,
    total: 6,
  },
  {
    id: 'kindergarten',
    title: '유치원',
    image: require('../../assets/challenge/kindergarten.png'),
    done: 8,
    total: 20,
  },
  {
    id: 'leisure',
    title: '여가생활',
    image: require('../../assets/challenge/leisure.png'),
    done: 10,
    total: 20,
  },
  {
    id: 'holiday',
    title: '명절',
    image: require('../../assets/challenge/holiday.png'),
    done: 19,
    total: 20,
  },
  {
    id: 'etc',
    title: '기타',
    image: require('../../assets/challenge/etc.png'),
    done: 0,
    total: 0,
  },
];

export default function ChallengeMainScreen({navigation}) {
  const renderItem = ({item}) => (
    <ChallengeTask
      title={item.title}
      image={item.image}
      done={item.done}
      total={item.total}
      completed={item.completed}
      style={{ width: CARD_W, marginTop: GAP }}
      onPress={()=>navigation.navigate('ChallengeInfo')}
    />
  );

  return (
    <ImageBackground
      source={require('../../assets/background/green_bg.png')}
      resizeMode="cover"
      style={styles.background}
    >
      <Image source={require('../../assets/logo.png')} style={styles.logo}/>
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>도전과제</Text>

        <Pressable style={styles.headerRight} hitSlop={8} onPress={() => {}}>
          <Entypo name="menu" size={30} color={colors.redBrown}/>
        </Pressable>
      </View>

      <FlatList
        data={DATA}
        keyExtractor={(it) => it.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.column}
        renderItem={renderItem}
        showsVerticalScrollIndicator={true}
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
  logo: {
    position: 'absolute',
    top: TOP + 8,
    left: 20,
    width:100,
    height: 100,
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
    color: colors.redBrown,
    fontFamily: 'MangoDdobak-B',
  },
  headerRight: {
    position: 'absolute',
    right: 16,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingHorizontal: GAP,
    paddingBottom: 24,
  },
  column: {
    columnGap: GAP,
  },
});