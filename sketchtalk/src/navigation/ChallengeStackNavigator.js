import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ChallengeMainScreen from '../screens/challenge/ChallengeMainScreen';
import ChallengeInfoScreen from '../screens/challenge/ChallengeInfo';

const Stack = createNativeStackNavigator();

const ChallengeStackNavigator = () => (
    <Stack.Navigator
        screenOptions={{
            headerShown: false,
        }}>
        <Stack.Screen
            name="ChallengeMainScreen"
            component={ChallengeMainScreen}
            options={{ title: '도전과제' }}
        />
        <Stack.Screen name="ChallengeInfo" component={ChallengeInfoScreen} />
    </Stack.Navigator>
);


export default ChallengeStackNavigator;