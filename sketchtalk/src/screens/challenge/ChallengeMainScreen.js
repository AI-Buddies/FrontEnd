import React from 'react';
import styled from 'styled-components/native';
import colors from '../../constants/colors';

export default function ChallengeMainScreen() {
    return (
        <Container>
            <Message>도전과제 메인 화면</Message>
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
