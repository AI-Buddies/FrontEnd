import React from 'react';
import {View,Text, Image, ImageBackground,  StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import ConfirmButton from '../../components/confirmbutton';
import colors from '../../constants/colors';

const { width, height } = Dimensions.get('window');

export default function MainScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('../../assets/background/yellow_bg.png')}
      style={{ width, height, flex: 1 }}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* 로고 */}
        <Image
          source={require('../../assets/main_logo.png')}
          style={styles.logo}
        />
        <Text style={styles.mainText}>AI 친구와 대화하며 그림일기 쓰기</Text>

        {/* 시작하기 버튼 */}
        <View style={[styles.startBtnWrapper, {bottom: 100}]}>
          <ConfirmButton
            text = "시작하기"
            color = {colors.primary}
            width = {width * 0.8}
            onPress={() => navigation.navigate('Signup')}
      />
          <View style={styles.footer}>
            <Text style={styles.footerText}>이미 계정이 있나요? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.link}>로그인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // 수직 가운데 정렬
    alignItems: 'center',     // 수평 가운데 정렬
    paddingHorizontal: 24,
  },
  logo: {
    width: 259,
    height: 259,
  },
  mainText: {
    color: colors.redBrown,
    fontFamily: 'MangoDdobak-R',
  },
  // 시작하기 버튼 위치
  startBtnWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  // 로그인
  footer: {
    marginTop: 10,
    flexDirection: 'row',
    marginBottom: 24,
  },
  footerText: {
    color: colors.redBrown,
    fontFamily: 'MangoDdobak-R',
  },
  link: {
    color: colors.primary,
    fontFamily: 'MangoDdobak-B',
  },
});
