import React from 'react';
import { Text, View, Button } from 'react-native';
import { useQuery, gql } from '@apollo/client'
import styled from 'styled-components/native';

import NoteFeed from '../components/NoteFeed';
import Loading from '../components/Loading';


const GET_MY_NOTES = gql`
    query me {
        me {
            id 
            username
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
    }
`;


const MyNotes = props => {
  const { data, loading, error } = useQuery(GET_MY_NOTES);

  if (loading) return <Loading />
  if (error) return <Text>Error!</Text>
  if(data.me.notes.length !== 0) {
    return <NoteFeed notes={data.me.notes} navigation={props.navigation}/>
} else {
    return <Text>No notes yet</Text>
}

};

MyNotes.navigationOptions = {
  title: 'My Notes'
};

export default MyNotes;