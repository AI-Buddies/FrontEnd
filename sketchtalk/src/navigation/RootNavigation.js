import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import home_screen from '../screens/home_screen';
import TabNavigator from './TabNavigator';

const Nav = createNativeStackNavigator();

const RootNavigator = () => (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <Nav.Navigator
            initialRouteName="TabNavigator"
            screenOptions={{ headerShown: false }}>
            <Nav.Screen name="home_screen" component={home_screen} />
            <Nav.Screen name="TabNavigator" component={TabNavigator} />
            <Nav.Screen
                name="IntroStackNavigator"
                component={IntroStackNavigator}
                initialParams={{ screen: 'LoginScreen' }}
            />
        </Nav.Navigator>
    </GestureHandlerRootView>
);
export default RootNavigator;
