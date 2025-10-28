import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '../screens/main/MainScreen';
import LoginScreen from '../screens/main/LoginScreen';
import SignupScreen from '../screens/main/SignupScreen';
import SignupInfoScreen from '../screens/main/SignupInfoScreen';

const Stack = createNativeStackNavigator();

export default function AuthStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Main">
      {/* 홈 */}
      <Stack.Screen name="Main" component={MainScreen} />
      {/* 로그인 / 회원가입 */}
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="SignupInfo" component={SignupInfoScreen} />
    </Stack.Navigator>
  );
}
