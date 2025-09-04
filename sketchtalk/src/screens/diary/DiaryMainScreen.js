import React from 'react';
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

const {width, height} = Dimensions.get('window');

const dummyData = [
  {
    key: 0,
    isAI: false,
    text: '오늘 친구들이랑 같이 축구를 했는데 너무 재밌었어!',
  },
  {
    key: 1,
    isAI: true,
    text: '우 와 ~',
  },
  {
    key: 2,
    isAI: false,
    text: '오늘 친구들이랑 같이 축구를 했는데 너무 재밌었어!',
  },
  {
    key: 3,
    isAI: true,
    text: '오늘 친구들이랑 같이 축구를 했는데 너무 재밌었어!',
  },
  {
    key: 4,
    isAI: false,
    text: '오늘 친구들이랑 같이 축구를 했는데 너무 재밌었어!',
  },
  {
    key: 5,
    isAI: true,
    text: '오늘 친구들이랑 같이 축구를 했는데 너무 재밌었어!',
  },
];

export default function DiaryMainScreen() {
  return (
    <Background
      source={require('../../assets/background/yellow_bg.png')}
      resizeMode="cover">
      <CharacterImage />
      <MessageList
        data={dummyData}
        contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}
        renderItem={({item}) => MessageItem({item})}
        keyExtractor={item => item.id}
        inverted={true}
      />
      <MicButton />
      <TextBar />
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
    <Image source={require('../../assets/test.png')} />
  </View>
);

const MessageList = styled.FlatList`
  flex: 5;
  width: ${width};
`;

const MicButton = () => (
  <View style={{flex: 1.5}}>
    <Pressable
      style={{
        borderRadius: Math.round(158) / 2,
        width: 79,
        height: 79,
        backgroundColor: '#F6BC65',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={() => {}}>
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

const TextBar = () => (
  <View style={{flex: 1, width: width * 0.9}}>
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.creamWhite,
        borderRadius: 32,
        height: 46,
      }}>
      <TextInput
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
        onPress={() => alert('Yaay!')}>
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
      }}>
      <View
        style={{
          backgroundColor: colors.creamWhite,
          paddingVertical: 10,
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          borderBottomRightRadius: 18,
        }}>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'left',
            paddingHorizontal: 10,
            marginBottom: 3,
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
      }}>
      <View
        style={{
          backgroundColor: colors.primary,
          paddingVertical: 10,
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          borderBottomLeftRadius: 18,
        }}>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'left',
            paddingHorizontal: 10,
            marginBottom: 3,
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
