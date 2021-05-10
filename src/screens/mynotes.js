import React from 'react';
import { Text, View, Image } from 'react-native';
import styled from 'styled-components/native';

const StyledView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`

const H1 = styled.Text`
    font-size: 48px;
    font-weight: bold;
`
const P = styled.Text`
    margin: 24px 0;
    font-size: 18px;
    
`


const MyNotes = () => {
  return (
    <StyledView>
      <H1>My Notes</H1>
      <P>This is my notes</P>
    </StyledView>
  );
};

MyNotes.navigationOptions = {
  title: 'My Notes'
};

export default MyNotes;