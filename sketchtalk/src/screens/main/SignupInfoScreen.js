import React, {useState} from 'react';
import {SafeAreaView, View, Dimensions, Text, Image, ImageBackground, StyleSheet, Platform} from 'react-native';
import InputField from '../../components/inputfield'
import colors from '../../constants/colors';
import ConfirmButton from '../../components/confirmbutton';
import DateTimePicker from '@react-native-community/datetimepicker';
import FormScrollContainer from '../../components/layout/formScrollContainer'; 

const { width, height } = Dimensions.get('window');

export default function SignupInfoScreen({ navigation }){
    const [name, setName] = useState('');
    const [bd, setBd] = useState('');
    const [pickerDate, setPickerDate] = useState(new Date(2000,1,1));
    const [showPicker, setShowPicker] = useState(false);

    const openPicker = () => setShowPicker(true);
    const onChangeDate = (event, selectedDate) => {
      if (!selectedDate) {
        if (Platform.OS === 'android') setShowPicker(false);
        return;
      } setPickerDate(selectedDate);

      const yyyy = selectedDate.getFullYear();
      const mm = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const dd = String(selectedDate.getDate()).padStart(2, '0');
      setBd(`${yyyy}년 ${mm}월 ${dd}일`);

      if (Platform.OS === 'android') setShowPicker(false);
    }

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

              <View style={styles.signupCard}>

              <Text style={styles.title}>회원가입</Text>

              <InputField
                label="이름"
                placeholder="이름"
                value={name}
                onChangeText={setName}
                keyboardType = "default"
                onFocus={scrollToEnd} 
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
          )}</FormScrollContainer>
            
            <View style={styles.button}>
            <ConfirmButton
            text = "회원가입"
            color = {colors.primary}
            width = {width * 0.8}
            marginBottom = {10}
            onPress={() => navigation.navigate('Main')}
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
