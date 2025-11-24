import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import CalendarMainScreen from '../screens/calendar/CalendarMainScreen';

const Stack = createNativeStackNavigator();

const CalendarStackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen
      name="CalendarMainScreen"
      component={CalendarMainScreen}
      options={{title: '달력 홈'}}
      initialParams={{
        calendarListView: false,
        calendarDate: new Date(),
      }}
    />
  </Stack.Navigator>
);

export default CalendarStackNavigator;
