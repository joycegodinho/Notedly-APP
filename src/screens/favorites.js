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


const Favorites = () => {
  return (
    <StyledView>
      <H1>Favorites</H1>
      <P>This is my favorites</P>
    </StyledView>
  );
};
Favorites.navigationOptions = {
  title: 'Favorites'
};

export default Favorites;