import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MypageMainScreen from '../screens/mypage/MypageMainScreen';
import FAQScreen from '../screens/mypage/FAQScreen';
import AppInfoScreen from '../screens/mypage/AppInfoScreen';
import ProfileEditScreen from '../screens/mypage/ProfileEditScreen';

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
        <Stack.Screen name="FAQ" component={FAQScreen}/>
        <Stack.Screen name="AppInfo" component={AppInfoScreen}/>
        <Stack.Screen name="ProfileEdit" component={ProfileEditScreen}/>
    </Stack.Navigator>
);


export default MypageStackNavigator;