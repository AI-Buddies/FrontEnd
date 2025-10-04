import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import TabNavigator from './TabNavigator';
import CalendarStackNavigator from './CalendarStackNavigator.js';
import MypageStackNavigator from './MypageStackNavigator.js';
import DiaryStackNavigator from './DiaryStackNavigator.js';
import DiaryResultStackNavigator from './DiaryResultStackNavigator.js';
import ChallengeStackNavigator from './ChallengeStackNavigator.js';

const Nav = createNativeStackNavigator();

const RootNavigator = () => (
  <Nav.Navigator
    initialRouteName="TabNavigator"
    screenOptions={{headerShown: false}}>
    <Nav.Screen name="TabNavigator" component={TabNavigator} />
    <Nav.Screen
      name="CalendarStackNavigator"
      component={CalendarStackNavigator}
    />
    <Nav.Screen name="MypageStackNavigator" component={MypageStackNavigator} />
    <Nav.Screen name="DiaryStackNavigator" component={DiaryStackNavigator} />
    <Nav.Screen
      name="DiaryResultStackNavigator"
      component={DiaryResultStackNavigator}
    />
    <Nav.Screen
      name="ChallengeStackNavigator"
      component={ChallengeStackNavigator}
    />
  </Nav.Navigator>
);
export default RootNavigator;
