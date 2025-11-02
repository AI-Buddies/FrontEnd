import React, {useState} from 'react';
import { ImageBackground, Dimensions, StyleSheet, View, Text, Pressable, StatusBar, Platform, FlatList, LayoutAnimation } from 'react-native';
import colors from '../../constants/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import MypageField from '../../components/mypagefield';

const { width, height } = Dimensions.get('window');
const TOP = Platform.OS === 'android' ? (StatusBar.currentHeight || 0) : 0;

const FAQList = [
    { id: '1', q: '자주 묻는 질문', a: '첫번째 답변' },
    { id: '2', q: '엄청 긴 답변과 엄청 더 기이이이이이이이이이이이이이이이이이이이이이이이이이이이이이이이이이이이이이인 질문', a: '자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 자주 묻는 질문 ' },
    { id: '3', q: '이건 세번째 질문', a: '자주 묻는 질문 답변' },
]

export default function FAQScreen({ navigation }) {
    const [openId, setOpenId] = useState(null);

    const toggle = (id) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setOpenId(prev => (prev === id ? null : id));
    };

    const renderItem = ({ item }) => {
        const isOpen = openId === item.id;
        return (
        <View>
            <MypageField
            highlight="Q. "
            text={item.q}
            onPress={() => toggle(item.id)}
            rightType="down"
            rightRotate={isOpen ? 180 : 0}
            divider="thin"
            />
            {isOpen && (
            <View style={styles.answerBox}>
                <Text style={styles.answerLabel}>A.</Text>
                <Text style={styles.answerText}>{item.a}</Text>
                <View style={styles.answerDivider}></View>
            </View>
            )}
        </View>
        );
    };
    
    return (
    <ImageBackground
        source={require('../../assets/background/yellow_bg.png')}
        resizeMode="cover"
        style={styles.background}
    >
        <View style={[styles.header, { top: TOP + 45 }]}>
            <Pressable
                style={styles.backBtn}
                onPress={() => navigation.goBack()}
            >
                <Entypo name="chevron-thin-left" size={30} color={colors.redBrown} />
            </Pressable>

            <Text style={styles.title}>자주 묻는 질문</Text>
        </View>

        <View style={styles.card}>
            <FlatList
                data = {FAQList}
                keyExtractor={(i) => i.id}
                renderItem={renderItem}
                showsVerticalScrollIndicator={true}
                style={{ flex: 1 }}
                contentContainerStyle={{ paddingBottom: 16 }}
                initialNumToRender={6}
                windowSize={8}
                removeClippedSubviews
            />
        </View>
    </ImageBackground>
  );
}

const CARD_MAX_H = height * 0.8;
const styles = StyleSheet.create({
background: {
    flex: 1,
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
},
header: {
    position: 'absolute',
    left: 16,
    right: 16,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
},
backBtn: {
    position: 'absolute',
    left: 0,
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
},
title: {
    fontSize: 24,
    fontFamily: 'MangoDdobak-B',
    color: colors.redBrown,
    letterSpacing: 0.3,
},
card: {
    position: 'absolute',
    top: 129,
    alignSelf: 'center',
    width: width - 32,
    height: CARD_MAX_H,
    backgroundColor: colors.white,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 4,
    paddingTop: 18,
    marginBottom: 16,
},
answerBox: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 14,
    backgroundColor: colors.white,
},
answerLabel: {
    fontSize: 16,
    color: colors.redBrown,
    fontFamily: 'MangoDdobak-B',
    marginBottom: 6,
  },
  answerText: {
    fontSize: 14,
    fontFamily: 'MangoDdobak-R',
    color: colors.redBrown,
    lineHeight: 20,
  },
  answerDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.gray200,
    widith: '100%',
    marginTop: 4,
  },
});