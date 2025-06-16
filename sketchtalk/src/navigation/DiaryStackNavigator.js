import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DiaryMainScreen from '../screens/diary/DiaryMainScreen';

const Stack = createNativeStackNavigator();

const DiaryStackNavigator = () => (
    <Stack.Navigator
        screenOptions={{
            headerShown: false,
        }}>
        <Stack.Screen
            name="DiaryMainScreen"
            component={DiaryMainScreen}
            options={{ title: '일기작성' }}
        />
    </Stack.Navigator>
);


export default DiaryStackNavigator;