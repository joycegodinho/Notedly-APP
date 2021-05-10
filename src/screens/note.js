import React from 'react';
import { Text, View, Image } from 'react-native';
import styled from 'styled-components/native';
import { useQuery, gql } from '@apollo/client';

import Note from '../components/Note';
import Loading from '../components/Loading'

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

const GET_NOTE = gql`
    query note($id: ID!) {
        note(id: $id) {
            id
            createdAt
            content
            favoriteCount 
            author {
                username
                id
            }
        }
    }
`;


const NoteScreen = props => {

  const id = props.navigation.getParam('id')  
  const { data, loading, error } = useQuery(GET_NOTE, {variables: {id}});

  if (loading) return <Loading />
  if (error) return <Text>Error!</Text>

  return (
    <Note note={data.note} />
  );
};

export default NoteScreen;