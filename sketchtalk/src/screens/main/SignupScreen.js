import React, { useRef, useState, useMemo } from 'react';
import {SafeAreaView, View, Dimensions, Text, Image, ImageBackground, StyleSheet, FlatList} from 'react-native';
import InputField from '../../components/inputfield'
import colors from '../../constants/colors';
import ConfirmButton from '../../components/confirmbutton';
import Popup from '../../components/popup';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

export default function SignupScreen({ navigation }){
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  const [idCheckOpen, setIdCheckOpen] = useState(false);
  const [idOpen, setIdOpen] = useState(false);
  const [idChecker, setIDchecker] = useState(false);
  const [idCheckStatus, setIdCheckStatus] = useState(''); // 'error' | 'success'
  const [idCheckMsg, setIdCheckMsg] = useState('');
  const [checking, setChecking] = useState(false);

  // 유효성
  const idValid = useMemo(() => id.trim().length >= 4, [id]);
  const pwValid = useMemo(() => password.length >= 6, [password]);
  const pwSame  = useMemo(() => password && passwordCheck && password === passwordCheck, [password, passwordCheck]);

  const checkID = async () => {
    if(!idValid){
      setIDchecker(true);
      setIdCheckOpen(true);
      setIdCheckStatus('error');
      setIdCheckMsg('4자 이상 입력해주세요.');
      return;
    }

    try {
      setChecking(true);

      const res = await axios.get('https://sketch-talk.com/user/id/availability', {
        params: {
          loginId: id.trim(),
        },
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      console.log('ID CHECK RESPONSE:', res?.data); //응답 확인용

      const { isSuccess, message, data } = res?.data ?? {};
      if (!isSuccess) throw new Error(message || '중복확인 실패');

      const available = data?.isAvailable ?? false;

      setIDchecker(true);

      if (available) {
        setIdCheckStatus('success');
        setIdCheckMsg('사용 가능한 아이디입니다.');
      } else {
        setIdCheckStatus('error');
        setIdCheckMsg('이미 사용중인 아이디입니다.');
      }

    } catch (e) {
      console.log('ID CHECK ERROR:', e?.response?.data || e.message || e);

      setIDchecker(true);
      setIdCheckStatus('error');
      setIdCheckMsg('중복확인 중 오류 발생');
    } finally {
      setChecking(false);
    }
  };


  const goNext = () => {
    if (!idValid) return setIdCheckOpen(true);
    if (!pwValid) return setIdCheckOpen(true);
    if (!pwSame)  return setIdCheckOpen(true);

    if (idCheckStatus !== 'success'){
      setIdCheckStatus('error');
      setIdOpen(true);
      return;
    }

    navigation.navigate('SignupInfo', {
      userId: id.trim(),
      password,
    });
  };

  const flatRef = useRef(null);
  const focusScrollTo = (index) => {
    flatRef.current?.scrollToIndex?.({index, animated: true});
  };

  const listData = [{ key: 'content' }];

  const renderContent = () => (
    <View style={styles.container}>
      <Image
        source={require('../../assets/main_logo.png')}
        style={styles.logo}
      />

      <View style={styles.signupCard}>
        <Text style={styles.title}>회원가입</Text>

        <InputField
          label="아이디"
          placeholder="아이디"
          value={id}
          onChangeText={(t) => {
            setId(t);
            setIDchecker(false);
            setIdCheckStatus('');
            setIdCheckMsg('');
          }}
          keyboardType="ascii-capable"
          rightButtonText="중복확인"
          onRightPress={checking ? undefined : checkID}
          helperVisible={idChecker}
          helperStatus={idCheckStatus || 'default'}
          helperText={idCheckMsg}
        />

        <InputField
          label="비밀번호"
          placeholder="비밀번호"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          helperVisible={!!password && !pwValid}
          helperStatus="error"
          helperText="6자 이상 입력해주세요."
        />

        <InputField
          label="비밀번호 확인"
          placeholder="비밀번호"
          value={passwordCheck}
          onChangeText={setPasswordCheck}
          secureTextEntry
          helperVisible={!!passwordCheck && !pwSame}
          helperStatus="error"
          helperText="비밀번호가 일치하지 않습니다."
        />
      </View>
    </View>
  );

    return(
        <SafeAreaView style={{flex: 1}}>
          <ImageBackground source={require('../../assets/background/yellow_bg.png')}
            style={{ width, height, flex: 1 }}
            resizeMode="cover">
            
            <FlatList
              data={listData}
              keyExtractor={(item) => item.key}
              renderItem={renderContent}
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
            />
            
            <View style={styles.button}>
              <ConfirmButton
                text = "다음"
                color = {colors.primary}
                width = {width * 0.8}
                marginBottom = {10}
                onPress={goNext}
                disabled={!(pwValid && pwSame)}
              />
            </View>

          <Popup
            visible={idCheckOpen}
            message="아이디 또는 비밀번호가 일치하지 않습니다. 다시 확인해주세요."
            onClose={() => setIdCheckOpen(false)}
            primary={{
            text: '확인',
            variant: 'primary',
            onPress: () => setIdCheckOpen(false),
            }}
          />
          <Popup
            visible={idOpen}
            message="아이디를 확인해주세요."
            onClose={() => setIdOpen(false)}
            primary={{
            text: '확인',
            variant: 'primary',
            onPress: () => setIdOpen(false),
            }}
          />
          </ImageBackground>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  logo: {
    width: 177,
    height: 177,
    marginTop : 72,
  },
  signupCard: {
    width: width * 0.85,
    backgroundColor: colors.white,
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal:16, 
    marginTop: 16,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
  },
  title: {
  fontSize: 30,
  fontFamily: 'MangoDdobak-B',
  textAlign: 'center',
  marginBottom: 30,
  color: colors.redBrown,
},
  button: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 100,
    alignItems: 'center',
    zIndex: 20,
    elevation: 20,
  },
  scrollContent: {
    flexGrow: 1,
    allignItems: 'center',
    paddingBottom: 200,
  },
});
