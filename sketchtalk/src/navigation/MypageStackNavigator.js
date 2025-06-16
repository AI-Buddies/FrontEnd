import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MypageMainScreen from '../screens/mypage/MypageMainScreen';

const Stack = createNativeStackNavigator();

const MypageStackNavigator = () => (
    <Stack.Navigator
        screenOptions={{
            headerShown: false,
        }}>
        <Stack.Screen
            name="MypageMainScreen"
            component={MypageMainScreen}
            options={{ title: '마이페이지' }}
        />
    </Stack.Navigator>
);


export default MypageStackNavigator;