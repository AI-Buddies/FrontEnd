import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import DiaryEditScreen from '../screens/diary/diaryedit/DiaryEditScreen';
import DiaryArtRedrawScreen from '../screens/diary/diaryedit/DiaryArtRedrawScreen';

const Stack = createNativeStackNavigator();

const DiaryEditStackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen
      name="DiaryEditScreen"
      component={DiaryEditScreen}
      options={{title: '일기수정'}}
    />
    <Stack.Screen
      name="DiaryArtRedrawScreen"
      component={DiaryArtRedrawScreen}
      options={{title: '일기수정'}}
    />
  </Stack.Navigator>
);

export default DiaryEditStackNavigator;
