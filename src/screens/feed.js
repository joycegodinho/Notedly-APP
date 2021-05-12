import React from 'react';
import { Text, View, Button, TouchableOpacity } from 'react-native';
import { useQuery, gql } from '@apollo/client'
import styled from 'styled-components/native';

import NoteFeed from '../components/NoteFeed';
import Loading from '../components/Loading';



const GET_NOTES = gql`
    query notes {
        notes {
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



const Feed = props => {
  const { data, loading, error } = useQuery(GET_NOTES);

  if (loading) return <Loading />
  if (error) return <Text>Error!</Text>
  return (
    <NoteFeed notes={data.notes} title="Feed" navigation={props.navigation} />
    

  );
};

Feed.navigationOptions = {
  title: 'Feed'
};

export default Feed;