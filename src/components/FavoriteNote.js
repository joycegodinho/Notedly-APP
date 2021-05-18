import React, {  useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { gql, useQuery, useMutation } from '@apollo/client';

const TOGGLE_FAVORITE = gql`
  mutation toggleFavorite($id:ID!) {
    toggleFavorite(id: $id) {
      id
      favoriteCount
    }
  }
`;


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



const FavoriteNote =  props => {
    const [count, setCount] = useState(props.favoriteCount);
    const [favorited, setFavorited] = useState(props.me.favorites.filter(note => note.id === props.noteId).length > 0);
    const [toggleFavorite] = useMutation(TOGGLE_FAVORITE, {variables: {id: props.noteId}, 
      refetchQueries: [{ query: GET_MY_FAVORITES}] 
    });

    return(
        <View>
            {favorited ? (
                <TouchableOpacity onPress={() => {toggleFavorite(); setFavorited(false); setCount(count - 1)}}><Text><MaterialCommunityIcons name="heart" size={16}/>{count}</Text></TouchableOpacity>
            ) : (
                <TouchableOpacity onPress={() => {toggleFavorite(); setFavorited(true); setCount(count + 1)}}><Text><MaterialCommunityIcons name="heart-outline" size={16}/>{count}</Text></TouchableOpacity>
            )}
    
        </View>
    );
};

export default FavoriteNote;