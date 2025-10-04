import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import DiaryMainScreen from '../screens/diary/DiaryMainScreen';
import DiaryConfirmTextScreen from '../screens/diary/DiaryConfirmTextScreen';
import DiaryChooseArtstyleScreen from '../screens/diary/DiaryChooseArtstyleScreen';
import DiaryConfirmArtScreen from '../screens/diary/DiaryConfirmArtScreen';
import DiaryTextInProgressScreen from '../screens/diary/DiaryTextInProgressScreen';
import DiaryArtInProgressScreen from '../screens/diary/DiaryArtInProgressScreen';

const Stack = createNativeStackNavigator();

const DiaryStackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen
      name="DiaryMainScreen"
      component={DiaryMainScreen}
      options={{title: '일기작성'}}
    />
    <Stack.Screen
      name="DiaryConfirmTextScreen"
      component={DiaryConfirmTextScreen}
      options={{title: '일기작성'}}
    />
    <Stack.Screen
      name="DiaryChooseArtstyleScreen"
      component={DiaryChooseArtstyleScreen}
      options={{title: '일기작성'}}
    />
    <Stack.Screen
      name="DiaryConfirmArtScreen"
      component={DiaryConfirmArtScreen}
      options={{title: '일기작성'}}
    />
    <Stack.Screen
      name="DiaryTextInProgressScreen"
      component={DiaryTextInProgressScreen}
      options={{title: '일기작성'}}
    />
    <Stack.Screen
      name="DiaryArtInProgressScreen"
      component={DiaryArtInProgressScreen}
      options={{title: '일기작성'}}
    />
  </Stack.Navigator>
);

export default DiaryStackNavigator;
