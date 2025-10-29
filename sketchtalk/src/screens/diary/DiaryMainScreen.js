import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  Dimensions,
  Text,
  Pressable,
  View,
  TextInput,
} from 'react-native';
import {styled} from 'styled-components/native';
import colors from '../../constants/colors';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
//api
import {useDiaryChatFetch} from './api/useDiaryChatFetch';
import {useDiaryInitialFetch} from './api/useDiaryInitialFetch';

const {width, height} = Dimensions.get('window');

const dummyData = [];

export default function DiaryMainScreen() {
  const navigation = useNavigation();
  function TempNavigate() {
    navigation.navigate('DiaryTextInProgressScreen');
  }

  //const {initdata, error, isFetching, isLoading} = useDiaryChatFetch(dialog);
  const [userDialog, setUserDialog] = useState('');
  useEffect(() => {
    //AddMessage(initdata.data.reply, true);
    AddMessage('첫 메시지야', true);
  });

  function AddMessage(dialog, isAI) {
    const messageArraySize = dummyData.size();
    dummyData.push({id: messageArraySize, isAI: isAI, text: dialog});
  }

  function FetchMessage() {
    AddMessage(userDialog, false);
    //const {data, error, isFetching, isLoading} = useDiaryChatFetch(dialog);
    //AddMessage(data.data.reply, true);
    AddMessage('답변이야', true);
  }

  return (
    <Background
      source={require('../../assets/background/yellow_bg.png')}
      resizeMode="cover">
      <CharacterImage />
      <MessageList
        data={dummyData.reverse()}
        contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}
        renderItem={({item}) => MessageItem({item})}
        keyExtractor={item => item.id}
        inverted={true}
        fadingEdgeLength={100}
      />
      <MicButton />
      <TextBar onPress={FetchMessage()} />
    </Background>
  );
}

const CharacterImage = () => (
  <View
    style={{
      flex: 5,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Image source={require('../../assets/character/bear.png')} />
  </View>
);

const MessageList = styled.FlatList`
  flex: 5;
  width: ${width};
`;

const MicButton = () => (
  <View
    style={{
      flex: 1.5,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
    }}>
    <Pressable
      style={{
        borderRadius: Math.round(158) / 2,
        width: 79,
        height: 79,
        backgroundColor: '#F6BC65',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 1,
      }}>
      {({pressed}) => (
        <SimpleLineIcons
          name="microphone"
          size={33}
          color={pressed ? '#FF6947' : colors.white}
        />
      )}
    </Pressable>
  </View>
);

const TextBar = props => (
  <View
    style={{
      flex: 1,
      width: width * 0.9,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
    }}>
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.creamWhite,
        borderRadius: 32,
        height: 46,
        elevation: 1,
      }}>
      <TextInput
        value={userDialog}
        onChangeText={setUserDialog}
        style={{
          flex: 6,
          textAlign: 'left',
          color: colors.black,
          paddingLeft: 12,
          fontSize: 16,
          height: 46,
          paddingBottom: 12,
        }}
      />
      <Pressable
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={props.onPress}>
        <SimpleLineIcons name="arrow-up-circle" size={25} color="red" />
      </Pressable>
    </View>
  </View>
);

function MessageItem({item}) {
  return item.isAI ? (
    <View
      style={{
        alignItems: 'flex-start',
        width: width * 0.9,
        marginBottom: 10,
        paddingRight: 65,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
      }}>
      <View
        style={{
          backgroundColor: colors.creamWhite,
          paddingVertical: 7,
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          borderBottomRightRadius: 18,
          elevation: 1,
        }}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: 'MangoDdobak-R',
            lineHeight: 25,
            textAlign: 'left',
            paddingHorizontal: 10,
            marginBottom: 2,
            color: colors.black,
          }}>
          {item.text}
        </Text>
      </View>
    </View>
  ) : (
    <View
      style={{
        alignItems: 'flex-end',
        width: width * 0.9,
        marginBottom: 10,
        paddingLeft: 65,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
      }}>
      <View
        style={{
          backgroundColor: colors.primary,
          paddingVertical: 7,
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          borderBottomLeftRadius: 18,
          elevation: 1,
        }}>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'left',
            fontFamily: 'MangoDdobak-R',
            lineHeight: 25,
            paddingHorizontal: 10,
            marginBottom: 2,
            color: colors.white,
          }}>
          {item.text}
        </Text>
      </View>
    </View>
  );
}

const Background = styled(ImageBackground)`
  flex: 1;
  width: ${width};
  height: ${height};
  justify-content: center;
  align-items: center;
`;
