import React from 'react';
import { Text, View, Button } from 'react-native';
import { useQuery, gql } from '@apollo/client'
import styled from 'styled-components/native';

import NoteFeed from '../components/NoteFeed';
import Loading from '../components/Loading';

const GET_MY_FAVORITES = gql`
    query me {
        me {
            id 
            username
            favorites {
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

const Favorites = props => {
  const { data, loading, error } = useQuery(GET_MY_FAVORITES);

  if (loading) return <Loading />
  if (error) return <Text>Error!</Text>
  if(data.me.favorites.length !== 0) {
    return <NoteFeed notes={data.me.favorites} navigation={props.navigation}/>
} else {
    return <Text>No notes yet</Text>
}
};
Favorites.navigationOptions = {
  title: 'Favorites'
};

export default Favorites;