import {
  Text,
  View,
  Dimensions,
  ImageBackground,
  Image,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../constants/colors';
import styled from 'styled-components';
import {useNavigation} from '@react-navigation/native';
import AchievementRow from '../../components/achievementrow';
import CommentText from '../../components/commenttext';
import ConfirmButton from '../../components/confirmbutton';

const {width, height} = Dimensions.get('window');

const diaryDummyData = {
  title: '축구하다가 넘어졌지만 재밌었어!',
  content:
    '오늘 학교에서 친구들이랑 운동장에서 축구를 했다. 나는 열심히 뛰다가 그만 넘어져서 무릎이 좀 아팠다. 그래도 친구들이 걱정해줘서 기분이 좋았고, 계속 같이 놀았다. 골은 못 넣었지만 친구들이랑 뛰어다니는 게 너무 재미있었다. 내일도 또 축구하고 싶다!',
};

const commentDummyData =
  '와~ 다쳐도 즐겁게 놀다니, 너 정말 멋지구나! 내일은 꼭 골도 넣어보자! ⚽😊';

export default function DiaryResultScreen() {
  const navigation = useNavigation();
  function TempNavigateToHome() {
    navigation.navigate('TabNavigator');
  }
  function TempNavigateToEditScreen() {
    navigation.navigate('DiaryEditScreen');
  }
  const [showAchievement, setShowAchievement] = useState(false);
  const [showComment, setShowComment] = useState(true);
  return (
    <Background
      source={require('../../assets/background/yellow_bg.png')}
      resizeMode="cover">
      <DiaryDisplay
        item={diaryDummyData}
        editOnPress={TempNavigateToEditScreen}
      />
      {showAchievement && !showComment && (
        <AchievementDisplay width={width} color={colors.creamWhite} />
      )}
      {showComment && !showAchievement && (
        <CharacterCommentDisplay onPress={TempNavigateToHome} />
      )}
    </Background>
  );
}

const AchievementDisplay = props => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{fontSize: 20}}>도전과제 달성!</Text>
    </View>
    <AchievementRow {...props} />
  </View>
);

const CharacterCommentDisplay = props => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <View
      style={{
        flex: 1.5,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Image
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 5,
        }}
        source={require('../../assets/character/comment_bear.png')}
      />
      <CommentText flex={2} text={commentDummyData} width={width} />
    </View>
    <ConfirmButton
      color={colors.primary}
      text={'홈으로'}
      onPress={props.onPress}
    />
  </View>
);

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
      <DiaryDisplayHeader editOnPress={props.editOnPress} />
      <DiaryArtDisplay />
      <DiaryTextDisplay item={props.item} />
    </View>
  </View>
);

const DiaryDisplayHeader = props => (
  <View
    style={{
      flex: 1.2,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: width * 0.9,
    }}>
    <Text style={{flex: 8, marginLeft: 10, fontSize: 20, marginBottom: 4}}>
      2025년 5월 25일
    </Text>
    <Pressable style={{flex: 1}} onPress={props.editOnPress}>
      <SimpleLineIcons name="pencil" size={20} color={colors.black} />
    </Pressable>
    <Pressable style={{flex: 1}}>
      <Feather name="download" size={22} color={colors.black} />
    </Pressable>
  </View>
);

const DiaryArtDisplay = props => (
  <View
    style={{
      flex: 5,
      justifyContent: 'center',
      alignItems: 'center',
      width: width * 0.9,
      borderColor: colors.black,
      borderTopWidth: 1,
      borderBottomWidth: 1,
    }}>
    <Image
      style={{width: width * 0.9}}
      source={require('../../assets/soccer_diary2.png')}
    />
  </View>
);

const DiaryTextDisplay = props => (
  <View
    style={{
      flex: 5,
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
