import {Text, View, Dimensions, ImageBackground, Image} from 'react-native';
import React from 'react';
import ConfirmText from '../../components/confirmtext';
import ConfirmButton from '../../components/confirmbutton';
import colors from '../../constants/colors';
import styled from 'styled-components';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

export default function DiaryConfirmTextScreen() {
  const navigation = useNavigation();
  function TempNavigate() {
    navigation.navigate('DiaryChooseArtstyleScreen');
  }
  return (
    <Background
      source={require('../../assets/background/yellow_bg.png')}
      resizeMode="cover">
      <CharacterImage />
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
    <Image source={require('../../assets/character/writing_bear.png')} />
  </View>
);

const DiaryDisplay = props => (
  <View
    style={{
      flex: 3,
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: width * 0.9,
      backgroundColor: colors.creamWhite,
      marginVertical: 10,
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
    <View style={{position: 'absolute'}}>
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
      제목 : {props.item.title}
    </Text>
    <Text
      style={{
        fontSize: 14,
        justifyContent: 'flex-start',
        paddingHorizontal: 10,
        width: width * 0.9 - 2,
        lineHeight: 30,
      }}>
      {props.item.content}
    </Text>
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
