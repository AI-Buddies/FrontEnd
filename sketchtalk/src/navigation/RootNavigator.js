// src/navigation/RootNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthStackNavigator from './AuthStackNavigator';
import TabNavigator from './TabNavigator';
import CalendarStackNavigator from './CalendarStackNavigator';
import MypageStackNavigator from './MypageStackNavigator';
import DiaryStackNavigator from './DiaryStackNavigator';
import ChallengeStackNavigator from './ChallengeStackNavigator';

const Nav = createNativeStackNavigator();

const RootNavigator = () => (
  <Nav.Navigator initialRouteName="AuthStackNavigator" screenOptions={{ headerShown: false }}>
    <Nav.Screen name="AuthStackNavigator" component={AuthStackNavigator} />
    <Nav.Screen name="TabNavigator" component={TabNavigator} />
    <Nav.Screen name="CalendarStackNavigator" component={CalendarStackNavigator} />
    <Nav.Screen name="MypageStackNavigator" component={MypageStackNavigator} />
    <Nav.Screen name="DiaryStackNavigator" component={DiaryStackNavigator} />
    <Nav.Screen name="ChallengeStackNavigator" component={ChallengeStackNavigator} />
  </Nav.Navigator>
);

export default RootNavigator;
