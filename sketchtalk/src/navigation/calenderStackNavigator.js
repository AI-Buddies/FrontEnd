import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CalenderMainScreen from '../screens/calender/calender_main_screen';

const Stack = createNativeStackNavigator();

const CalenderStackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: true,
    }}>
    <Stack.Screen
      name="CalenderMainScreen"
      component={CalenderMainScreen}
      options={{ title: '달력 홈' }}
    />
  </Stack.Navigator>
);


export default CalenderStackNavigator;