import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from "../constants/colors";

import HomeScreen from "../screens/home_screen";
import CalenderStackNavigator from "./calenderStackNavigator.js";

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
        <Tab.Screen name="CalenderStackNavigator" component={CalenderStackNavigator} options={{
            tabBarLabel: "달력 화면",
            headerShown: false,
        }} />
    </Tab.Navigator>

);

export default TabNavigator;
