import {
  Text,
  View,
  Dimensions,
  ImageBackground,
  Image,
  Pressable,
  TextInput,
} from 'react-native';
import React from 'react';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../constants/colors';
import styled from 'styled-components';
import {useNavigation} from '@react-navigation/native';
import ConfirmButton from '../../components/confirmbutton';

const {width, height} = Dimensions.get('window');

const dummyData = {
  title: '축구하다가 넘어졌지만 재밌었어!',
  content:
    '오늘 학교에서 친구들이랑 운동장에서 축구를 했다. 나는 열심히 뛰다가 그만 넘어져서 무릎이 좀 아팠다. 그래도 친구들이 걱정해줘서 기분이 좋았고, 계속 같이 놀았다. 골은 못 넣었지만 친구들이랑 뛰어다니는 게 너무 재미있었다. 내일도 또 축구하고 싶다!',
};

export default function DiaryEditScreen() {
  const navigation = useNavigation();
  function TempNavigate() {
    navigation.navigate('DiaryChooseArtstyleScreen');
  }
  const [value, onChangeText] = React.useState(dummyData.content);
  return (
    <Background
      source={require('../../assets/background/yellow_bg.png')}
      resizeMode="cover">
      <DiaryDisplay
        title={dummyData.title}
        content={value}
        onChangeText={text => onChangeText(text)}
      />
      <ConfirmButton text={'저장'} width={width} color={colors.primary} />
    </Background>
  );
}

const CharacterImage = () => (
  <View
    style={{
      flex: 3,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 19,
    }}>
    <Image source={require('../../assets/character/question_bear.png')} />
  </View>
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
        height: 500,
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
      <DiaryDisplayHeader />
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
    <Text style={{flex: 8, marginLeft: 10, fontSize: 20, marginBottom: 4}}>
      2025년 5월 25일
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
      <NotebookLine />
      <NotebookLine />
      <NotebookLine />
      <NotebookLine />
    </View>
    <Text
      style={{
        fontSize: 14,
        justifyContent: 'flex-start',
        width: width * 0.9 - 2,
        paddingHorizontal: 10,
        lineHeight: 30,
      }}>
      제목 : {props.title}
    </Text>
    <TextInput
      multiline
      editable
      textAlignVertical="top"
      onChangeText={props.onChangeText}
      value={props.content}
      style={{
        fontSize: 14,
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
