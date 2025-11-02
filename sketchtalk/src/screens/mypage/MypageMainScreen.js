import React, { useState } from 'react';
import {View, Text, Image, ImageBackground, Dimensions, StyleSheet} from 'react-native';
import colors from '../../constants/colors';
import MypageField from '../../components/mypagefield';
import Popup from '../../components/popup';

const { width, height } = Dimensions.get('window');

export default function MypageMainScreen({ navigation }) {
  const [alarmOn, setAlarmOn] = useState(true);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [withdrawDoneOpen, setWithdrawDoneOpen] = useState(false);

  return (
    <ImageBackground
      source={require('../../assets/background/yellow_bg.png')}
      resizeMode="cover"
      style={styles.background}
    >
      <Image
        source={require('../../assets/logo.png')}
        style={styles.logo}
      />

      <View style={styles.card}>
        {/* 상단 이름/생일 */}
        <View style={styles.headerRow}>
          <Text style={styles.headerName}>김이름</Text>
          <Text style={styles.headerBirth}>2000년 00월 00일</Text>
        </View>

        <View style={styles.headerDivider} />

        <MypageField
          text="개인정보 수정"
          rightType="right"
          onPress={() => navigation.navigate('ProfileEdit')}
        />
        <MypageField
          text="알림 설정"
          rightType="switch"
          switchValue={alarmOn}
          onPress={() => setAlarmOn(v => !v)}
        />
        <MypageField
          text="자주 묻는 질문"
          rightType="right"
          onPress={() => navigation.navigate('FAQ')}
        />
        <MypageField
          text="애플리케이션 정보"
          rightType="right"
          onPress={() => navigation.navigate('AppInfo')}
          divider="thick"
        />

        <MypageField
          text="로그아웃"
          onPress={() => setLogoutOpen(true)}
        />
        <MypageField
          text="회원 탈퇴"
          onPress={() => setWithdrawOpen(true)}
        />
      </View>

      <Popup
        visible={logoutOpen}
        message="로그아웃 하시겠어요?"
        onClose={() => setLogoutOpen(false)}
        secondary={{
          text:'취소',
          variant: 'gray',
          onPress: () => setLogoutOpen(false),
        }}
        primary={{
          text:'확인',
          variant: 'primary',
          onPress: () => {
            setLogoutOpen(false);
            navigation.replace('AuthStackNavigator');
          }
        }}
      />
      <Popup
        visible={withdrawOpen}
        message="정말 탈퇴하시겠어요? 모든 데이터가 삭제되어 복구가 어려워요."
        onClose={() => setWithdrawOpen(false)}
        secondary={{
          text:'취소',
          variant: 'gray',
          onPress: () => setWithdrawOpen(false),
        }}
        primary={{
          text:'확인',
          variant: 'primary',
          onPress: () => {
            setWithdrawOpen(false);
            setTimeout(() => setWithdrawDoneOpen(true), 300);
          }
        }}
      />
      <Popup
        visible={withdrawDoneOpen}
        message="회원탈퇴가 완료되었습니다."
        onClose={() => {
          setWithdrawDoneOpen(false);
          navigation.replace('AuthStackNavigator');
        }}
        primary={{
          text: '확인',
          variant: 'primary',
          onPress: () => {
            setWithdrawDoneOpen(false);
            navigation.replace('AuthStackNavigator');
          }
        }}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    position: 'absolute',
    top: 20,
    left: 20,
    width:100,
    height: 100,
  },
  card: {
    position: 'absolute',
    top: 129,
    alignSelf: 'center',
    width: width - 32,
    height: height * 0.8,
    backgroundColor: colors.white,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 4,
    paddingTop: 18,
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 12,
    paddingTop: 12,
  },
  headerName: {
    fontSize: 30,
    fontFamily: 'MangoDdobak-B',
    color: colors.redBrown,
    letterSpacing: 0.5,
  },
  headerBirth: {
    fontSize: 16,
    fontFamily: 'MangoDdobak-R',
    color: colors.redBrown,
    marginTop: 4,
  },
  headerDivider: {
    height: 8,
    width: '100%',
    backgroundColor: colors.gray200,
  },
});
