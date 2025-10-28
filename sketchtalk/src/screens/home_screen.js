import React from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import colors from '../constants/colors';
import {Pressable} from 'react-native';

export default function HomeScreen() {
  const navigation = useNavigation();
  return (
    <Container>
      <Pressable onPress={() => navigation.navigate('DiaryStackNavigator')}>
        <Message>홈 화면</Message>
      </Pressable>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Message = styled.Text`
  font-size: 16px;
  color: ${colors.primary};
`;
