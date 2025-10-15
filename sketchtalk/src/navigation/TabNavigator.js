import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import colors from '../constants/colors';

import HomeScreen from '../screens/home_screen';
import CalendarStackNavigator from './CalendarStackNavigator.js';
import DiaryStackNavigator from './DiaryStackNavigator.js';
import MypageStackNavigator from './MypageStackNavigator.js';
import ChallengeStackNavigator from './ChallengeStackNavigator.js';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{
        tabBarLabel: '홈 화면',
        headerShown: false,
        tabBarLabelStyle: {
          fontFamily: 'MangoDdobak-R',
        },
        tabBarActiveTintColor: colors.primary,
        tabBarIcon: ({color}) => (
          <SimpleLineIcons name="pencil" size={16} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="CalendarStackNavigator"
      component={CalendarStackNavigator}
      options={{
        tabBarLabel: '달력',
        headerShown: false,
        tabBarLabelStyle: {
          fontFamily: 'MangoDdobak-R',
        },
        tabBarActiveTintColor: colors.primary,
        tabBarIcon: ({color}) => (
          <Feather name="calendar" size={16} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="ChallengeStackNavigator"
      component={ChallengeStackNavigator}
      options={{
        tabBarLabel: '도전과제',
        headerShown: false,
        tabBarLabelStyle: {
          fontFamily: 'MangoDdobak-R',
        },
        tabBarActiveTintColor: colors.primary,
        tabBarIcon: ({color}) => (
          <SimpleLineIcons name="star" size={16} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="MypageStackNavigator"
      component={MypageStackNavigator}
      options={{
        tabBarLabel: '마이페이지',
        headerShown: false,
        tabBarLabelStyle: {
          fontFamily: 'MangoDdobak-R',
        },
        tabBarActiveTintColor: colors.primary,
        tabBarIcon: ({color}) => (
          <Feather name="user" size={16} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default TabNavigator;
