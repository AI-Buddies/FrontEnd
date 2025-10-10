import {
  Text,
  View,
  Dimensions,
  ImageBackground,
  Image,
  Pressable,
  TextInput,
  Modal,
} from 'react-native';
import {React, useEffect, useState} from 'react';
import colors from '../../../constants/colors';
import styled from 'styled-components';
import {useNavigation} from '@react-navigation/native';
import ConfirmButton from '../../../components/confirmbutton';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import moment from 'moment';

const {width, height} = Dimensions.get('window');

const dummyData = {
  title: '축구하다가 넘어졌지만 재밌었어!',
  content:
    '오늘 학교에서 친구들이랑 운동장에서 축구를 했다. 나는 열심히 뛰다가 그만 넘어져서 무릎이 좀 아팠다. 그래도 친구들이 걱정해줘서 기분이 좋았고, 계속 같이 놀았다. 골은 못 넣었지만 친구들이랑 뛰어다니는 게 너무 재미있었다. 내일도 또 축구하고 싶다!',
};

export default function DiaryEditScreen({route}) {
  const [value, onChangeText] = useState(dummyData.content);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  function TempNavigateToResultScreen() {
    navigation.navigate('DiaryResultScreen', {...route.params});
  }
  function TempNavigateToRedrawScreen() {
    navigation.navigate('DiaryArtRedrawScreen', {...route.params});
  }
  const {date, isCalendar} = route.params;

  return (
    <Background
      source={require('../../../assets/background/yellow_bg.png')}
      resizeMode="cover">
      <DiaryDisplay
        title={dummyData.title}
        content={value}
        onChangeText={text => onChangeText(text)}
        date={date}
      />
      <ConfirmButton
        text={'저장'}
        color={colors.primary}
        onPress={() => setModalVisible(true)}
      />
      <ConfirmRedrawPopup
        modalVisible={modalVisible}
        closeOnPress={() => setModalVisible(false)}
        yesOnPress={() => {
          setModalVisible(false);
          TempNavigateToRedrawScreen();
        }}
        noOnPress={() => {
          setModalVisible(false);
          TempNavigateToResultScreen();
        }}
      />
    </Background>
  );
}

const ConfirmRedrawPopup = props => (
  <Modal
    transparent={true}
    animationIn="none"
    animationInTiming={1}
    animationOutTiming={1}
    visible={props.modalVisible}>
    <View
      style={{
        height: height,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          width: width,
          height: height,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          position: 'absolute',
        }}
      />
      <View
        style={{
          backgroundColor: 'white',
          width: 327,
          height: 223,
          mixBlendMode: 'normal',
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: 300,
            height: 203,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Pressable
            style={{flex: 1, alignSelf: 'flex-end'}}
            onPress={props.closeOnPress}>
            <EvilIcons name="close" size={37} color={colors.black} />
          </Pressable>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'MangoDdobak-R',
              includeFontPadding: false,
              flex: 1,
              marginTop: 15,
            }}>
            수정된 일기로 그림을 다시 만들까요?
          </Text>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <ConfirmButton
              color={colors.primary}
              width={138}
              height={37}
              fontSize={14}
              text={'네, 만들어주세요!'}
              onPress={props.yesOnPress}
            />
            <ConfirmButton
              color={'#C6C6C6'}
              width={138}
              height={37}
              fontSize={14}
              text={'괜찮아요!'}
              onPress={props.noOnPress}
            />
          </View>
        </View>
      </View>
    </View>
  </Modal>
);

const DiaryDisplay = props => (
  <View
    style={{
      flex: 3,
      alignItems: 'center',
      justifyContent: 'center',
      width: width * 0.9,
      marginTop: 100,
    }}>
    <View
      style={{
        height: 370,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.creamWhite,
        borderRadius: 10,
        borderColor: colors.black,
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
        elevation: 1,
      }}>
      <DiaryDisplayHeader date={props.date} />
      <DiaryTextDisplay
        title={props.title}
        content={props.content}
        onChangeText={props.onChangeText}
      />
    </View>
  </View>
);

const DiaryDisplayHeader = props => (
  <View
    style={{
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: width * 0.9,
      borderColor: colors.black,
      borderBottomWidth: 1,
    }}>
    <Text
      style={{
        flex: 8,
        marginLeft: 10,
        fontSize: 20,
        fontFamily: 'MangoDdobak-B',
        includeFontPadding: false,
      }}>
      {moment(props.date).format('YYYY[년] M[월] D[일]').toString()}
    </Text>
  </View>
);

const DiaryTextDisplay = props => (
  <View
    style={{
      flex: 8.5,
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: width * 0.9,
      marginTop: 5,
    }}>
    <View style={{position: 'absolute'}}>
      <NotebookLine />
      <NotebookLine />
      <NotebookLine />
      <NotebookLine />
      <NotebookLine />
      <NotebookLine />
      <NotebookLine />
      <NotebookLine />
      <NotebookLine />
      <NotebookLine />
    </View>
    <View
      style={{
        flexDirection: 'row',
        alignSelf: 'flex-end',
        width: width * 0.9 - 2,
      }}>
      <Text
        style={{
          fontSize: 14,
          fontFamily: 'MangoDdobak-B',
          includeFontPadding: false,
          justifyContent: 'flex-end',
          paddingLeft: 9,
          marginBottom: 1,
          lineHeight: 30,
        }}>
        제목 :
      </Text>
      <TextInput
        multiline={false}
        editable
        textAlignVertical="top"
        maxLength={20}
        style={{
          fontSize: 14,
          fontFamily: 'MangoDdobak-B',
          includeFontPadding: false,
          justifyContent: 'flex-start',
          paddingRight: 9,
          lineHeight: 30,
          marginVertical: -10,
        }}>
        {props.title}
      </TextInput>
    </View>
    <TextInput
      multiline
      editable
      textAlignVertical="top"
      maxLength={200}
      onChangeText={props.onChangeText}
      value={props.content}
      style={{
        fontSize: 14,
        fontFamily: 'MangoDdobak-R',
        includeFontPadding: false,
        justifyContent: 'flex-start',
        paddingHorizontal: 10,
        width: width * 0.9 - 2,
        lineHeight: 30,
        marginTop: -10,
      }}></TextInput>
  </View>
);

const Background = styled(ImageBackground)`
  flex: 1;
  width: ${width};
  height: ${height};
  justify-content: center;
  align-items: center;
`;

const NotebookLine = () => (
  <View
    style={{
      height: 30.4,
      width: width * 0.9 - 12,
      borderTopColor: '#0000',
      borderLeftColor: '#0000',
      borderRightColor: '#0000',
      borderBottomColor: colors.gray200,
      borderWidth: 1,
    }}
  />
);
