import React, { useRef, useState } from 'react';
import {SafeAreaView, View, Dimensions, Text, Image, ImageBackground, StyleSheet, Platform} from 'react-native';
import InputField from '../../components/inputfield'
import colors from '../../constants/colors';
import ConfirmButton from '../../components/confirmbutton';
import DateTimePicker from '@react-native-community/datetimepicker';
import { registerUser } from '../../api/auth';
import Popup from '../../components/popup';

const { width, height } = Dimensions.get('window');

function formatBirth(dateObj){
  const yyyy = dateObj.getFullYear();
  const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
  const dd = String(dateObj.getDate()).padStart(2, '0');
  return { view: `${yyyy}년 ${mm}월 ${dd}일`, api: `${yyyy}-${mm}-${dd}` };
}

export default function SignupInfoScreen({ navigation, route }){
  const { userId, password } = route?.params ?? {}; 
  
  const [name, setName] = useState('');
  const [bd, setBd] = useState('');
  const [pickerDate, setPickerDate] = useState(new Date(2000,1,1));
  const [showPicker, setShowPicker] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const openPicker = () => setShowPicker(true);
  const onChangeDate = (event, selectedDate) => {
    if (!selectedDate) {
      setShowPicker(false);
      return;
    }
    setPickerDate(selectedDate);
    const f = formatBirth(selectedDate);
    setBd(f.view);
    setShowPicker(false);
  }

  const flatRef = useRef(null);
  const focusScrollTo = (index) => {
    flatRef.current?.scrollToIndex?.({index, animated: true});
  };

  const canSubmit = !!userId && !!password && name.trim().length >= 1 && !!bd;
  const onSubmit = async () => {
    if (!canSubmit) {
      setPopupOpen(true);
      return;
    }
    try {
      setLoading(true);
      const birth = formatBirth(pickerDate).api;
      const payload = { userId, password, name, birth };

      const data = await registerUser(payload);

      if(canSubmit) navigation.navigate('Main')
    } catch (e){
      setPopupOpen(true);
      console.log('register error:', e);
      return;
    } finally {
      setLoading(false);
    }
  };

    return(
        <SafeAreaView style={{flex: 1}}>
          <ImageBackground source={require('../../assets/background/yellow_bg.png')}
            style={{ width, height, flex: 1 }}
            resizeMode="cover">

            <View style={styles.container}>
              <Image
                source={require('../../assets/main_logo.png')}
                style={styles.logo}/>

              <View style={styles.signupCard}>

              <Text style={styles.title}>회원가입</Text>

              <InputField
                label="이름"
                placeholder="이름"
                value={name}
                onChangeText={setName}
                keyboardType = "default"
                onFocus={() => focusScrollTo(0)} 
              />

              <InputField
                label="생년월일"
                placeholder="2000년 01월 01일"
                value={bd}
                onPressIn={openPicker}
                showSoftInputOnFocus={false}
                keyboardType= "numeric"
              />
              {showPicker &&(
              <DateTimePicker
                value={pickerDate}
                mode="date"
                display={Platform.OS === 'android' ? 'calendar' : 'spinner'}
                maximumDate={new Date()}
                onChange={onChangeDate}
              />
              )}
                </View>
              </View>
            
            <View style={styles.button}>
            <ConfirmButton
            text = {loading ? '가입 중' : '회원가입'}
            color = {colors.primary}
            width = {width * 0.8}
            marginBottom = {10}
            onPress={loading ? undefined : onSubmit}
      />
            </View>
            <Popup
              visible={popupOpen}
              message="회원가입 중 오류가 발생했습니다. 다시 시도하여주세요."
              onClose={() => setPopupOpen(false)}
              primary={{
                text: '확인',
                variant: 'primary',
                onPress: () => setPopupOpen(false),
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
});
