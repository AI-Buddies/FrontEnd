import {React, useState, useCallback} from 'react';
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
import {
  Calendar,
  CalendarList,
  Agenda,
  LocaleConfig,
} from 'react-native-calendars';
import 'moment/locale/ko';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

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
    id: 1,
    date: new Date(2025, 5, 22),
    title: '축구하다가 넘어졌지만 괜찮아!',
  },
  {
    id: 2,
    date: new Date(2025, 5, 22),
    title: '축구하다가 넘어졌지만 괜찮아!',
  },
  {
    id: 3,
    date: new Date(2025, 5, 22),
    title: '넘어졌지만 괜찮아!',
  },
  {
    id: 4,
    date: new Date(2025, 6, 22),
    title: '축구하다가 넘어졌지만 괜찮아!',
  },
  {
    id: 5,
    date: new Date(2025, 5, 22),
    title: '축구하다가 넘어졌지만 괜찮아!',
  },
];

const dummyMarkedDates = [
  {date: '2025-06-10'},
  {date: '2025-06-22'},
  {date: '2025-06-29'},
  {date: '2025-06-30'},
  {date: '2025-11-30'},
  ,
];

export default function CalenderMainScreen({route}) {
  const {calendarDate, calendarListView} = route.params;
  const [date, setDate] = useState(calendarDate);
  const [showYearMonthPicker, setShowYearMonthPicker] = useState(false);
  const [listView, setListView] = useState(calendarListView);

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
        diaryDate: new Date(diaryDate),
        isCalendar: true,
        calendarDate: date,
        calendarListView: listView,
      },
    });
  }

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
      <View style={{flex: 7}}>
        {listView && (
          <FlatList
            contentContainerStyle={{
              alignItems: 'flex-start',
              justifyContent: 'center',
            }}
            keyExtractor={item => item.id}
            fadingEdgeLength={100}
            data={dummyData}
            renderItem={({item}) => (
              <CalendarItem {...item} onPress={() => TempNavigate(item.date)} />
            )}
            numColumns={2}></FlatList>
        )}
        {!listView && (
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
                const array = dummyMarkedDates.filter(obj =>
                  Object.values(obj).some(val => val.includes(date.dateString)),
                );
                return !array === undefined || !array.length == 0;
              }
              return (
                <CustomDayComponent
                  hasDiary={hasDiary()}
                  date={date}
                  state={state}
                />
              );
            }}
          />
        )}
      </View>
      <SwitchViewButton onPress={() => setListView(!listView)} />
    </Background>
  );
}

const CustomDayComponent = props => (
  <View style={{alignItems: 'center', justifyContent: 'center', height: 40}}>
    {props.hasDiary && props.state !== 'disabled' ? (
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

const CalendarItem = item => (
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
