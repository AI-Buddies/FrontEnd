import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from "../constants/colors";

import HomeScreen from "../screens/home_screen";
import CalendarStackNavigator from "./CalendarStackNavigator.js";
import DiaryStackNavigator from './DiaryStackNavigator.js';
import MypageStackNavigator from './MypageStackNavigator.js';
import ChallengeStackNavigator from './ChallengeStackNavigator.js';

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
    <Tab.Navigator>
        <Tab.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
                tabBarLabel: "홈 화면",
                headerShown: false,
            }}
        />
        <Tab.Screen name="CalendarStackNavigator" component={CalendarStackNavigator} options={{
            tabBarLabel: "달력",
            headerShown: false,
        }} />
        <Tab.Screen name="DiaryStackNavigator" component={DiaryStackNavigator} options={{
            tabBarLabel: "일기작성",
            headerShown: false,
        }} />
        <Tab.Screen name="ChallengeStackNavigator" component={ChallengeStackNavigator} options={{
            tabBarLabel: "도전과제",
            headerShown: false,
        }} />
        <Tab.Screen name="MypageStackNavigator" component={MypageStackNavigator} options={{
            tabBarLabel: "마이페이지",
            headerShown: false,
        }} />
    </Tab.Navigator>

);

export default TabNavigator;
