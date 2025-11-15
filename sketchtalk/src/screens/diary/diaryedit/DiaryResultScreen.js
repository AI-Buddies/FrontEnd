import {
  Text,
  View,
  Dimensions,
  ImageBackground,
  Image,
  Pressable,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../../constants/colors';
import styled from 'styled-components';
import {useNavigation} from '@react-navigation/native';
import CommentText from '../../../components/commenttext';
import ConfirmButton from '../../../components/confirmbutton';
import Modal from 'react-native-modal';
import moment from 'moment';
import AchievementRow from '../../../components/achievementrow';
import CommentTextDownload from '../../../components/commenttextdownload';
import ViewShot from 'react-native-view-shot';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {useDiaryConfirmArtFetch} from '../api/DiaryFetch';
import {useDiaryViewQueryFetch} from '../../calendar/api/CalendarFetch';

const {width, height} = Dimensions.get('window');

const diaryDummyData = {
  title: '축구하다가 넘어졌지만 재밌었어!',
  content:
    '오늘 학교에서 친구들이랑 운동장에서 축구를 했다. 나는 열심히 뛰다가 그만 넘어져서 무릎이 좀 아팠다. 그래도 친구들이 걱정해줘서 기분이 좋았고, 계속 같이 놀았다. 골은 못 넣었지만 친구들이랑 뛰어다니는 게 너무 재미있었다. 내일도 또 축구하고 싶다!',
};

const commentDummyData =
  '와~ 다쳐도 즐겁게 놀다니, 너 정말 멋지구나! 내일은 꼭 골도 넣어보자! ⚽😊';

const achievementDummyData = [
  {title: '축구', description: '축구가 언급되는 일기 작성'},
  {title: '야구', description: '야구가 언급되는 일기 작성'},
  {title: '농구', description: '농구가 언급되는 일기 작성'},
];

export default function DiaryResultScreen({route}) {
  const navigation = useNavigation();
  function TempNavigateToHome() {
    navigation.navigate('TabNavigator');
  }
  function TempNavigateToCalendar() {
    navigation.navigate('TabNavigator', {
      screen: 'CalendarStackNavigator',
      params: {screen: 'CalendarMainScreen', params: {...route.params}},
    });
  }
  function TempNavigateToEditScreen() {
    navigation.navigate('DiaryEditScreen', {
      content: 'content',
      ...route.params,
    });
  }
  const [tutorialModalVisible, setTutorialModalVisible] = useState(!isCalendar);
  const [achievementModalVisible, setAchievementModalVisible] = useState(false);
  const [downloadEventModalVisible, setDownloadEventModalVisible] =
    useState(false);
  //0: not downloading
  //1: downloading
  //2: download complete
  //3: download failed
  const [downloadStatus, setDownloadStatus] = useState(0);
  const [achievementIndex, setAchievementIndex] = useState(0);
  const {diaryDate, isCalendar, diaryId, image_url, confirmArt} = route.params;

  const {isPending, isError, data, error} =
    isCalendar && confirmArt
      ? useDiaryConfirmArtFetch('diaryId', 'image_url')
      : useDiaryViewQueryFetch('diaryId');

  // 다운로드 기능
  const captureRef = useRef();

  const getPhotoUri = async () => {
    const uri = await captureRef.current.capture();
    console.log('👂👂 Image saved to', uri);
    return uri;
  };

  const downloadDiary = async () => {
    setDownloadStatus(1);
    setDownloadEventModalVisible(true);
    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'External Storage Write Permission',
        message: 'App needs write permission',
      },
    );
    if (!status === 'granted') {
      setDownloadStatus(3);
      return;
    }

    const uri = await getPhotoUri();
    const result = await CameraRoll.save(uri);
    console.log('🐤result', result);
    setDownloadStatus(2);
  };

  return (
    <Background
      source={require('../../../assets/background/yellow_bg.png')}
      resizeMode="cover">
      <DiaryDisplay
        item={diaryDummyData}
        date={diaryDate}
        editOnPress={TempNavigateToEditScreen}
        downloadOnPress={downloadDiary}
        showTutorial={tutorialModalVisible}
        tutorialOnPress={() => setTutorialModalVisible(false)}
      />
      <CharacterCommentDisplay
        onPress={isCalendar ? TempNavigateToCalendar : TempNavigateToHome}
        isCalendar={isCalendar}
      />
      {achievementDummyData !== undefined && (
        <AchievementModal
          isVisible={achievementModalVisible}
          achievementIndex={achievementIndex}
          onBackdropPress={() => {
            achievementDummyData[achievementIndex + 1] !== undefined
              ? setAchievementIndex(achievementIndex + 1)
              : setAchievementModalVisible(false);
          }}
        />
      )}
      <ViewShot
        ref={captureRef}
        options={{
          fileName: moment(diaryDate)
            .format('YYYY[년] M[월] D[일] [그림일기]')
            .toString(),
          format: 'png',
          quality: 0.9,
        }}
        style={{position: 'absolute', marginTop: 2000, marginRight: 0}}>
        <Background
          source={require('../../../assets/background/diary_bg_happy.png')}
          resizeMode="contain">
          <View
            style={{
              width: width * 0.8,
              marginLeft: 25,
              flex: 1,
            }}>
            <DownloadDiaryDisplay item={diaryDummyData} date={diaryDate} />
            <DownloadCharacterCommentDisplay />
          </View>
        </Background>
      </ViewShot>
      {downloadEventModalVisible && (
        <DownloadEventModal
          isVisible={downloadEventModalVisible}
          downloadStatus={downloadStatus}
          confirmOnPress={() => {
            setDownloadEventModalVisible(false);
            setDownloadStatus(0);
          }}
        />
      )}
    </Background>
  );
}

const AchievementModal = props => (
  <Modal
    isVisible={props.isVisible}
    statusBarTranslucent={true}
    backdropOpacity={0.9}
    animationInTiming={600}
    animationOutTiming={1}
    backdropTransitionInTiming={600}
    backdropTransitionOutTiming={1}
    onBackdropPress={props.onBackdropPress}
    style={{alignItems: 'center', justifyContent: 'center'}}>
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
      }}>
      <Text
        style={{
          flex: 1,
          color: colors.creamWhite,
          fontFamily: 'MangoDdobak-B',
          fontSize: 24,
          textAlignVertical: 'center',
        }}>
        도전과제 달성!
      </Text>
      <AchievementRow
        width={width}
        color={colors.creamWhite}
        title={achievementDummyData[props.achievementIndex].title}
        description={achievementDummyData[props.achievementIndex].description}
      />
      <Text
        style={{
          flex: 1,
          color: colors.creamWhite,
          fontFamily: 'MangoDdobak-R',
          fontSize: 16,
          textAlignVertical: 'center',
        }}>
        화면을 눌러 계속
      </Text>
    </View>
  </Modal>
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
          marginLeft: 5,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        source={require('../../../assets/character/comment_bear.png')}
      />

      <CommentText flex={2} text={commentDummyData} width={width} />
    </View>

    <ConfirmButton
      color={colors.primary}
      text={props.isCalendar ? '달력으로' : '홈으로'}
      onPress={props.onPress}
    />
  </View>
);

const DownloadCharacterCommentDisplay = props => (
  <View
    style={{
      flex: 1,
      width: width * 0.8,
      marginLeft: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 105,
    }}>
    <View
      style={{
        flex: 1.5,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          height: 130,
          marginBottom: 22,
        }}>
        <Image
          style={{
            flex: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          resizeMode="contain"
          source={require('../../../assets/character/comment_bear.png')}
        />
        <Text
          style={{
            flex: 1,
            fontSize: 14,
            fontFamily: 'MangoDdobak-B',
            includeFontPadding: false,
          }}>
          또리의 말
        </Text>
      </View>
      <CommentTextDownload
        flex={2}
        text={commentDummyData}
        width={width * 0.75}
        height={120}
      />
    </View>
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
      <DiaryDisplayHeader
        editOnPress={props.editOnPress}
        downloadOnPress={props.downloadOnPress}
        date={props.date}
      />
      <DiaryArtDisplay
        tutorialOnPress={props.tutorialOnPress}
        showTutorial={props.showTutorial}
      />
      <DiaryTextDisplay item={props.item} />
    </View>
  </View>
);

const DownloadDiaryDisplay = props => (
  <View
    style={{
      flex: 10,
      alignItems: 'center',
      justifyContent: 'center',
      width: width * 0.8,
      marginTop: 50,
    }}>
    <View
      style={{
        height: 500,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          width: width * 0.8,
          marginBottom: 7,
          marginTop: -7,
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginLeft: 10,
            marginTop: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              flex: 1.5,
              fontSize: 15,
              fontFamily: 'MangoDdobak-B',
              includeFontPadding: false,
              marginBottom: -1,
            }}>
            {moment(props.date).format('YYYY[년] M[월] D[일]').toString()}
          </Text>
          <View style={{flex: 1, marginTop: 5, marginRight: 15}}>
            <Image
              style={{
                width: 35,
                height: 35,
              }}
              resizeMode="contain"
              source={require('../../../assets/emotions/emotion_happy.png')}
            />
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 3.5,
          justifyContent: 'center',
          alignItems: 'center',
          width: width * 0.7,
          borderColor: colors.black,
        }}>
        <Image
          style={{width: 270, height: 180}}
          source={require('../../../assets/soccer_diary2.png')}
        />
        {props.showTutorial && (
          <ButtonTutorialPopup tutorialOnPress={props.tutorialOnPress} />
        )}
      </View>
      <View
        style={{
          flex: 5,
          justifyContent: 'flex-start',
          alignItems: 'center',
          width: width * 0.7,
          marginTop: 5,
        }}>
        <View style={{position: 'absolute'}}>
          <NotebookLine lineWidth={width * 0.8} lineHeight={30} />
          <NotebookLine lineWidth={width * 0.8} lineHeight={30} />
          <NotebookLine lineWidth={width * 0.8} lineHeight={30} />
          <NotebookLine lineWidth={width * 0.8} lineHeight={30} />
          <NotebookLine lineWidth={width * 0.8} lineHeight={30} />
          <NotebookLine lineWidth={width * 0.8} lineHeight={30} />
          <NotebookLine lineWidth={width * 0.8} lineHeight={30} />
        </View>
        <Text
          style={{
            fontSize: 12,
            fontFamily: 'MangoDdobak-B',
            includeFontPadding: false,
            justifyContent: 'flex-start',
            width: width * 0.8 - 2,
            paddingHorizontal: 10,
            lineHeight: 30,
          }}>
          제목 : {props.item.title}
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontFamily: 'MangoDdobak-R',
            includeFontPadding: false,
            justifyContent: 'flex-start',
            paddingHorizontal: 10,
            width: width * 0.8 - 2,
            lineHeight: 30,
          }}>
          {props.item.content}
        </Text>
      </View>
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
    <View
      style={{
        flex: 4.2,
        flexDirection: 'row',
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          flex: 2.5,
          fontSize: 20,
          fontFamily: 'MangoDdobak-B',
          includeFontPadding: false,
          marginBottom: -1,
        }}>
        {moment(props.date).format('YYYY[년] M[월] D[일]').toString()}
      </Text>
      <View style={{flex: 1, marginTop: 5}}>
        <Image
          style={{
            width: 50,
            height: 50,
          }}
          resizeMode="contain"
          source={require('../../../assets/emotions/emotion_happy.png')}
        />
      </View>
    </View>
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Pressable style={{flex: 1}} onPress={props.editOnPress}>
        <SimpleLineIcons name="pencil" size={20} color={colors.black} />
      </Pressable>
      <Pressable style={{flex: 1}} onPress={props.downloadOnPress}>
        <Feather name="download" size={22} color={colors.black} />
      </Pressable>
    </View>
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
      source={require('../../../assets/soccer_diary2.png')}
    />
    {props.showTutorial && (
      <ButtonTutorialPopup tutorialOnPress={props.tutorialOnPress} />
    )}
  </View>
);

const ButtonTutorialPopup = props => (
  <View
    style={{
      position: 'absolute',
      backgroundColor: colors.creamWhite,
      zIndex: 100,
      elevation: 100,
      width: 240,
      height: 110,
      borderColor: colors.black,
      borderWidth: 1,
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 90,
      marginLeft: 75,
    }}>
    <View
      style={{
        width: 230,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}>
      <SimpleLineIcons name="pencil" size={20} color={colors.black} />
      <Text
        style={{
          fontSize: 16,
          fontFamily: 'MangoDdobak-R',
          includeFontPadding: false,
          marginTop: 0,
        }}>
        을 눌러 일기를 수정하거나
      </Text>
    </View>
    <View
      style={{
        width: 230,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}>
      <Feather name="download" size={20} color={colors.black} />
      <Text
        style={{
          fontSize: 16,
          fontFamily: 'MangoDdobak-R',
          includeFontPadding: false,
          marginTop: 0,
        }}>
        을 눌러 다운로드할 수 있어!
      </Text>
    </View>
    <ConfirmButton
      color={colors.primary}
      height={35}
      width={71}
      flex={1.3}
      fontSize={16}
      text={'확인'}
      onPress={props.tutorialOnPress}
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
        fontFamily: 'MangoDdobak-B',
        includeFontPadding: false,
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
        fontFamily: 'MangoDdobak-R',
        includeFontPadding: false,
        justifyContent: 'flex-start',
        paddingHorizontal: 10,
        width: width * 0.9 - 2,
        lineHeight: 30,
      }}>
      {props.item.content}
    </Text>
  </View>
);

const DownloadEventModal = props => (
  <Modal
    isVisible={props.isVisible}
    animationIn="none"
    animationInTiming={1}
    animationOutTiming={1}
    onBackdropPress={props.onBackdropPress}>
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
          <View style={{flex: 1}} />
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'MangoDdobak-R',
              includeFontPadding: false,
              flex: 1,
              marginTop: 15,
            }}>
            {props.downloadStatus === 1 && '다운로드 중...'}
            {props.downloadStatus === 2 && '일기를 다운로드했어요!'}
            {props.downloadStatus === 3 && '저장장치 권한을 허용해 주세요.'}
          </Text>
          <View style={{flex: 1, flexDirection: 'row'}}>
            {props.downloadStatus !== 1 && (
              <ConfirmButton
                color={colors.primary}
                width={138}
                height={37}
                fontSize={14}
                text={'확인'}
                onPress={props.confirmOnPress}
              />
            )}
          </View>
        </View>
      </View>
    </View>
  </Modal>
);

const Background = styled(ImageBackground)`
  flex: 1;
  width: ${width};
  height: ${height};
  justify-content: center;
  align-items: center;
`;

const NotebookLine = ({
  lineWidth = width * 0.9,
  lineHeight = 30.4,
  ...props
}) => (
  <View
    style={{
      height: lineHeight,
      alignSelf: 'center',
      width: lineWidth - 12,
      borderTopColor: '#0000',
      borderLeftColor: '#0000',
      borderRightColor: '#0000',
      borderBottomColor: colors.gray200,
      borderWidth: 1,
    }}
  />
);
