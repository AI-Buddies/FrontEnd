import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabNavigator from './TabNavigator';
import CalenderStackNavigator from './calenderStackNavigator.js';

const Nav = createNativeStackNavigator();

const RootNavigator = () => (
    <Nav.Navigator initialRouteName='TabNavigator' screenOptions={{ headerShown: false }}>
        <Nav.Screen name="TabNavigator" component={TabNavigator} />
        <Nav.Screen name="CalenderStackNavigator" component={CalenderStackNavigator} />
    </Nav.Navigator>
);
export default RootNavigator;
