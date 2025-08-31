import React from 'react';
import {ImageBackground, Dimensions, Text, Pressable, View} from 'react-native';
import {styled} from 'styled-components/native';
import colors from '../../constants/colors';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {Image} from 'react-native';

const {width, height} = Dimensions.get('window');

export default function DiaryMainScreen() {
  return (
    <Background
      source={require('../../assets/background/yellow_bg.png')}
      resizeMode="cover">
      <CharacterImage/>
      <MessageList
        data={[
          {key: '테스트'},
          {key: '테스트'},
          {key: '테스트'},
          {key: '테스트'},
          {key: '테스트'},
          {key: '테스트'},
          {key: '테스트'},
          {key: '테스트'},
          {key: '테스트'},
          {key: '테스트'},
        ]}
        renderItem={({item}) => <Text>{item.key}</Text>}
        keyExtractor={item => item.id}
      />
      <MicButton />
    </Background>
  );
}

const CharacterImage = () => (
  <View
    style={{
      flex: 1,
      width: 79,
      height: 79,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Image source={require('../../assets/test.png')} />
  </View>
);

const MessageList = styled.FlatList`
  flex: 1;
`;

const MicButton = () => (
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
        size={24}
        color={pressed ? '#FF6947' : colors.white}
      />
    )}
  </Pressable>
);

const Message = styled.Text`
  font-size: 16px;
  color: ${colors.primary};
`;

const Background = styled(ImageBackground)`
  flex: 1;
  width: ${width}px;
  height: ${height}px;
  justify-content: center;
  align-items: center;
`;
