import React, {useState} from 'react';
import {SafeAreaView, View, Dimensions, Text, Image, ImageBackground, StyleSheet} from 'react-native';
import InputField from '../../components/inputfield'
import colors from '../../constants/colors';
import ConfirmButton from '../../components/confirmbutton';
import FormScrollContainer from '../../components/layout/formScrollContainer'; 

const { width, height } = Dimensions.get('window');

export default function SignupScreen({ navigation }){
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

    return(
        <SafeAreaView style={{flex: 1}}>
          <ImageBackground source={require('../../assets/background/yellow_bg.png')}
            style={{ width, height, flex: 1 }}
            resizeMode="cover">
          
          <FormScrollContainer contentStyle={{ alignItems: 'center' }}>
            {({scrollNearBottom, scrollToEnd}) =>(
            <View style={styles.container}>
              <Image
                source={require('../../assets/main_logo.png')}
                style={styles.logo}/>

            <View style={styles.signupCard}>
            <Text style={styles.title}>회원가입</Text>

            {/* 아이디 중복확인 */}
            <InputField
              label="아이디"
              placeholder="아이디"
              value={id}
              onChangeText={setId}
              keyboardType="ascii-capable"
              rightButtonText="중복확인"
              helperVisible={true}
              helperStatus="error"
              onRightPress={() => {}}
              helperText="이미 사용중인 아이디입니다."
              onFocus={scrollToEnd}
            />

            <InputField
              label="비밀번호"
              placeholder="비밀번호"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              onFocus={scrollToEnd}
            />
            <InputField
              label="비밀번호 확인"
              placeholder="비밀번호"
              secureTextEntry
              onFocus={()=>scrollNearBottom(100)}
            />

              </View>
            </View>
          )}</FormScrollContainer>

          <View style={styles.button}>
              <ConfirmButton
                text = "다음"
                color = {colors.primary}
                width = {width * 0.8}
                marginBottom = {10}
                onPress={() => navigation.navigate('SignupInfo')}
              />
            </View>
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
});
