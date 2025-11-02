import React, {useState} from 'react';
import {SafeAreaView, View, Dimensions, Text, Image, ImageBackground, StyleSheet} from 'react-native';
import InputField from '../../components/inputfield'
import colors from '../../constants/colors';
import ConfirmButton from '../../components/confirmbutton';
import FormScrollContainer from '../../components/layout/formScrollContainer';

const { width, height } = Dimensions.get('window');

export default function AuthScreen({navigation}){
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

    return(
        <SafeAreaView style={{flex: 1}}>
          <ImageBackground source={require('../../assets/background/yellow_bg.png')}
            style={{ width, height, flex: 1 }}
            resizeMode="cover">

            <FormScrollContainer contentStyle={{ alignItems: 'center' }}>
              {({scrollToEnd}) => (
            <View style={styles.container}>
              <Image
                source={require('../../assets/main_logo.png')}
                style={styles.logo}/>

            <View style={styles.loginCard}>

            <Text style={styles.loginTitle}>로그인</Text>

            <InputField
              label="아이디"
              placeholder="아이디"
              value={id}
              onChangeText={setId}
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
          </View>
                </View>
                )}</FormScrollContainer> 
                <View style={styles.button}>
            <ConfirmButton
            text = "로그인"
            color = {colors.primary}
            width = {width * 0.8}

            onPress={() => navigation.replace('TabNavigator')} // 누르면 TabNavigator로 이동
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
  loginCard: {
    width: width * 0.85,
    backgroundColor: colors.white,
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal:16, 
    marginTop: 16,
    // 카드 그림자
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
  },
  loginTitle: {
  fontSize: 30,
  fontFamily: 'MangoDdobak-B',
  textAlign: 'center',
  marginBottom: 20,
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
