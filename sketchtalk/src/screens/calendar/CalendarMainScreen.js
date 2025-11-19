import {React, useState, useCallback, useEffect} from 'react';
import {
  ImageBackground,
  Dimensions,
  Text,
  View,
  Pressable,
  FlatList,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';
import colors from '../../constants/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import MonthPicker from 'react-native-month-year-picker';
import Modal from 'react-native-modal';
import {
  Calendar,
  CalendarList,
  Agenda,
  LocaleConfig,
} from 'react-native-calendars';
import 'moment/locale/ko';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {useCalendarViewQueryFetch} from './api/CalendarFetch';
import {useListViewQueryFetch} from './api/CalendarFetch';

LocaleConfig.locales['kr'] = {
  monthNames: ['', '', '', '', '', '', '', '', '', '', '', ''],
  monthNamesShort: ['', '', '', '', '', '', '', '', '', '', '', ''],
  dayNames: [
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
    '일요일',
  ],
  dayNamesShort: ['월', '화', '수', '목', '금', '토', '일'],
  today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = 'kr';

const {width, height} = Dimensions.get('window');

const dummyData = [
  {
    diaryId: 1,
    date: new Date(2025, 5, 22),
    title: '축구하다가 넘어졌지만 괜찮아!',
    emotion: 'HAPPY',
    image_url: '',
  },
  {
    diaryId: 2,
    date: new Date(2025, 5, 23),
    title: '축구하다가 넘어졌지만 괜찮아!',
    emotion: 'HAPPY',
    image_url: '',
  },
  {
    diaryId: 3,
    date: new Date(2025, 5, 24),
    title: '축구하다가 넘어졌지만 괜찮아!',
    emotion: 'HAPPY',
    image_url: '',
  },
  {
    diaryId: 4,
    date: new Date(2025, 5, 25),
    title: '축구하다가 넘어졌지만 괜찮아!',
    emotion: 'HAPPY',
    image_url: '',
  },
  {
    diaryId: 5,
    date: new Date(2025, 5, 26),
    title: '축구하다가 넘어졌지만 괜찮아!',
    emotion: 'HAPPY',
    image_url: '',
  },
];

const dummyEmptyData = [
  {
    diaryId: 1,
  },
  {
    diaryId: 2,
  },
  {
    diaryId: 3,
  },
  {
    diaryId: 4,
  },
  {
    diaryId: 5,
  },
  {
    diaryId: 6,
  },
];

const dummyMarkedDates = [
  {
    diaryId: 1,
    date: '2025-06-10',
    emotion: 'HAPPY',
  },
  {
    diaryId: 2,
    date: '2025-06-11',
    emotion: 'HAPPY',
  },
  {
    diaryId: 3,
    date: '2025-06-12',
    emotion: 'HAPPY',
  },
  {
    diaryId: 4,
    date: '2025-06-13',
    emotion: 'HAPPY',
  },
];

export default function CalenderMainScreen({route}) {
  const {calendarDate, calendarListView} = route.params;
  const [date, setDate] = useState(calendarDate);
  const [showYearMonthPicker, setShowYearMonthPicker] = useState(false);
  const [listView, setListView] = useState(calendarListView);
  const [isPreviewVisible, setPreviewVisible] = useState(false);
  const [testIsWaiting, setTestIsWaiting] = useState(false);

  const showPicker = useCallback(value => setShowYearMonthPicker(value), []);

  const onValueChange = useCallback(
    (event, newDate) => {
      const selectedDate = newDate || date;

      showPicker(false);
      setDate(selectedDate);
    },
    [date, showPicker],
  );

  const navigation = useNavigation();
  function TempNavigate(diaryDate) {
    navigation.navigate('DiaryResultStackNavigator', {
      screen: 'DiaryResultScreen',
      params: {
        diaryId: '',
        diaryDate: new Date(diaryDate),
        isCalendar: true,
        calendarDate: date,
        calendarListView: listView,
      },
    });
  }

  //const listViewQuery = useListViewQueryFetch(date)
  //const calendarViewQuery = useCalendarViewQueryFetch(date);

  return (
    <Background
      source={require('../../assets/background/blue_bg.png')}
      resizeMode="cover">
      <Text
        style={{
          fontSize: 25,
          fontFamily: 'MangoDdobak-B',
          flex: 1,
          textAlignVertical: 'bottom',
        }}>
        {/*calendarViewQuery.isLoading
          ? '로딩중...'
          : calendarViewQuery.error.message*/}
        달력
      </Text>
      <CalendarNavigator
        date={date}
        onDatePress={() => showPicker(true)}
        onLeftPress={() =>
          setDate(new Date(moment(date).subtract(1, 'months')))
        }
        onRightPress={() => setDate(new Date(moment(date).add(1, 'months')))}
      />
      {showYearMonthPicker && (
        <MonthPicker
          onChange={onValueChange}
          value={new Date(date)}
          locale="ko"
        />
      )}

      {/*       리스트       */}

      {listView && (
        <View style={{flex: 7, width: width}}>
          <FlatList
            contentContainerStyle={{
              alignItems: 'flex-start',
              justifyContent: 'center',
              marginLeft: Math.floor((width - 172 * 2) / 2),
            }}
            keyExtractor={item => item.diaryId}
            fadingEdgeLength={100}
            data={testIsWaiting ? dummyEmptyData : dummyData}
            renderItem={
              testIsWaiting
                ? () => <CalendarListViewEmptyItem />
                : ({item}) => (
                    <CalendarListViewItem
                      {...item}
                      onPress={() => TempNavigate(item.date)}
                    />
                  )
            }
            numColumns={2}></FlatList>
          {testIsWaiting && (
            <View
              style={{
                position: 'absolute',
                marginTop: 10,
                width: width,
                height: 1080,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <ImageBackground
                source={require('../../assets/character/ellipse.png')}
                style={{
                  width: 280,
                  height: 280,
                  marginBottom: 700,
                  resizeMode: 'contain',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{
                    width: 150,
                    height: 150,
                    resizeMode: 'contain',
                  }}
                  source={require('../../assets/character/writing_bear.png')}
                />
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: 'MangoDdobak-B',
                    lineHeight: 31,
                    fontSize: 24,
                  }}>
                  로딩중...
                </Text>
              </ImageBackground>
            </View>
          )}
        </View>
      )}
      {/*       달력        */}
      {!listView && (
        <View style={{flex: 7}}>
          <Calendar
            initialDate={date}
            hideArrows={true}
            disableMonthChange={true}
            customHeaderTitle={<></>} /* 월 숨기기 */
            disableAllTouchEventsForInactiveDays
            style={{
              marginTop: 10,
              width: width * 0.9,
              height: 380,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.18,
              shadowRadius: 1.0,
              elevation: 1,
            }}
            theme={{
              'stylesheet.calendar.header': {
                dayHeader: {
                  fontFamily: 'MangoDdobak-R',
                  fontSize: 14,
                  color: colors.gray300,
                  fontHeight: 31,
                  marginBottom: 20,
                },
              },
            }}
            dayComponent={({date, state}) => {
              function hasDiary() {
                const array = dummyMarkedDates.some(val =>
                  val.date.includes(date.dateString),
                );
                return array;
              }
              return (
                <CustomDayComponent
                  hasDiary={hasDiary()}
                  date={date}
                  state={state}
                  onPress={() => {
                    setPreviewVisible(true);
                  }}
                />
              );
            }}
          />
          {testIsWaiting && (
            <View
              style={{
                position: 'absolute',
                marginTop: 10,
                width: width * 0.9,
                height: 380,

                backgroundColor: 'rgba(255, 255,255, 0.6)',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <ImageBackground
                source={require('../../assets/character/ellipse.png')}
                style={{
                  width: 280,
                  height: 280,
                  resizeMode: 'contain',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{
                    width: 150,
                    height: 150,
                    resizeMode: 'contain',
                  }}
                  source={require('../../assets/character/writing_bear.png')}
                />
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: 'MangoDdobak-B',
                    lineHeight: 31,

                    fontSize: 24,
                  }}>
                  로딩중...
                </Text>
              </ImageBackground>
            </View>
          )}
        </View>
      )}
      <SwitchViewButton onPress={() => setListView(!listView)} />
      {!listView && (
        <CalendarPreviewModal
          date={moment(new Date()).format('YYYY[년] M[월] D[일]').toString()}
          isVisible={isPreviewVisible}
          onBackdropPress={() => setPreviewVisible(false)}
          onSwipeComplete={() => {
            setPreviewVisible(false);
            TempNavigate(new Date());
          }}
        />
      )}
    </Background>
  );
}

const CalendarPreviewModal = props => (
  <Modal
    isVisible={props.isVisible}
    coverScreen={false}
    animationInTiming={200}
    animationOutTiming={1}
    backdropTransitionOutTiming={1}
    backdropTransitionInTiming={1}
    hideModalContentWhileAnimating={true}
    onBackdropPress={props.onBackdropPress}
    onBackButtonPress={props.onBackdropPress}
    swipeDirection="up"
    swipeThreshold={100}
    onSwipeComplete={props.onSwipeComplete}>
    <View
      style={{
        position: 'absolute',
        width: width,
        height: 1770,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: colors.white,
        alignSelf: 'center',
        alignItems: 'center',
        bottom: -1440,
      }}>
      <View
        style={{
          width: width,
          height: 370,
          alignSelf: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            position: 'absolute',
            width: width * 0.4,
            height: 7,
            top: 10,
            backgroundColor: colors.gray200,
            borderRadius: 20,
          }}
        />
        <Image
          style={{
            flex: 4,
            width: width * 0.9,
            height: 200,
            top: -10,
            alignSelf: 'center',
          }}
          resizeMode="contain"
          source={require('../../assets/soccer_diary.png')}
        />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            width: width * 0.9,
            bottom: 30,
          }}>
          <View style={{flex: 3}}>
            <Text
              style={{
                flex: 1,
                fontFamily: 'MangoDdobak-R',
                fontSize: 14,
                color: colors.gray300,
              }}>
              {props.date}
            </Text>
            <Text
              style={{flex: 1.5, fontFamily: 'MangoDdobak-B', fontSize: 20}}
              numberOfLines={1}>
              축구하다가 넘어졌지만 재미있었어!
            </Text>
          </View>
          <Image
            style={{
              flex: 1,
              width: 80,
              height: 80,
              bottom: 6,
              alignSelf: 'center',
            }}
            resizeMode="contain"
            source={require('../../assets/emotions/emotion_happy.png')}
          />
        </View>
      </View>
    </View>
  </Modal>
);

const CustomDayComponent = props => (
  <View style={{alignItems: 'center', justifyContent: 'center', height: 40}}>
    {props.hasDiary && props.state !== 'disabled' ? (
      <Pressable onPress={props.onPress}>
        <Image
          style={{
            width: 50,
            height: 50,
            alignSelf: 'flex-start',
            justifyContent: 'flex-start',
            marginTop: 5,
          }}
          resizeMode="contain"
          source={require('../../assets/emotions/emotion_happy.png')}></Image>
      </Pressable>
    ) : (
      <Text
        style={{
          textAlign: 'center',
          fontFamily: 'MangoDdobak-R',
          lineHeight: 31,
          color: props.state === 'disabled' ? colors.white : colors.black,
          fontSize: 16,
        }}>
        {props.date.day}
      </Text>
    )}
  </View>
);

const SwitchViewButton = props => (
  <View
    style={{
      position: 'absolute',
      right: 20,
      bottom: 20,
      alignSelf: 'flex-end',
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
        width: 65,
        height: 65,
        backgroundColor: '#F6BC65',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 1,
      }}
      onPress={props.onPress}>
      <SimpleLineIcons name="menu" size={27} color={colors.white} />
    </Pressable>
  </View>
);

const CalendarListViewItem = item => (
  <Pressable
    style={{
      width: 162,
      height: 182,
      textAlign: 'center',
      marginHorizontal: 5,
      marginVertical: 10,
      backgroundColor: colors.creamWhite,
      borderRadius: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }}
    onPress={item.onPress}>
    <ImageBackground
      style={{width: 150, height: 129}}
      resizeMode="contain"
      source={require('../../assets/soccer_diary.png')}>
      <Image
        style={{
          width: 50,
          height: 50,
          position: 'absolute',
          alignSelf: 'flex-end',
        }}
        resizeMode="contain"
        source={require('../../assets/emotions/emotion_happy.png')}
      />
    </ImageBackground>
    <View style={{width: 162, height: 60}}>
      <Text
        style={{
          height: 25,
          marginLeft: 10,
          alignSelf: 'flex-start',
          fontSize: 12,
          fontFamily: 'MangoDdobak-R',
          includeFontPadding: false,
          color: '#d9d9d9',
        }}>
        {moment(item.date).format('LL').toString()}
      </Text>
      <Text
        style={{
          height: 20,
          marginHorizontal: 10,
          fontFamily: 'MangoDdobak-R',
          includeFontPadding: false,
          alignSelf: 'flex-start',
          fontSize: 15,
        }}
        numberOfLines={1}>
        {item.title}
      </Text>
    </View>
  </Pressable>
);

const CalendarListViewEmptyItem = item => (
  <View
    style={{
      width: 162,
      height: 182,
      textAlign: 'center',
      marginHorizontal: 5,
      marginVertical: 10,
      backgroundColor: colors.creamWhite,
      borderRadius: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }}
  />
);

const CalendarNavigator = props => (
  <View
    style={{
      flex: 1,
      flexDirection: 'row',

      alignItems: 'center',
      justifyContent: 'center',
    }}>
    <Pressable
      style={{flex: 1, alignItems: 'flex-end'}}
      onPress={props.onLeftPress}>
      <Entypo name="triangle-left" size={40} color={'#8B8FDE'} />
    </Pressable>
    <Pressable
      style={{
        flex: 1.5,
      }}
      onPress={props.onDatePress}>
      <Text
        style={{
          fontSize: 25,
          fontFamily: 'MangoDdobak-R',
          includeFontPadding: false,
          textAlign: 'center',
          textAlignVertical: 'top',
        }}>
        {moment(props.date).format('YYYY[년] M[월]').toString()}
      </Text>
    </Pressable>
    <Pressable
      style={{flex: 1, alignItems: 'flex-start'}}
      onPress={props.onRightPress}>
      <Entypo name="triangle-right" size={40} color={'#8B8FDE'} />
    </Pressable>
  </View>
);

const Background = styled(ImageBackground)`
  flex: 1;
  width: ${width};
  height: ${height};
  justify-content: center;
  align-items: center;
`;
