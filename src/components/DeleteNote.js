import React,{ useState, useCallback, useEffect } from 'react';
import { RefreshControl, StyleSheet, SafeAreaView, ScrollView, Text, View, Button, TouchableOpacity } from 'react-native';
import { useMutation, gql } from '@apollo/client';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const GET_NOTES = gql`
    query NoteFeed($cursor: String) {
        noteFeed(cursor: $cursor) {
            cursor
            hasNextPage
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

const DELETE_NOTE = gql`
  mutation deleteNote($id:ID!) {
    deleteNote(id: $id)
  }
`;

const DeleteNote = props => {
  const [deleteNote] = useMutation(DELETE_NOTE, {
    variables: {
      id: props.noteId
    },
    refetchQueries: [{ query: GET_MY_NOTES, GET_NOTES }]
  });

 

  return (
    <TouchableOpacity
        onPress={() => {deleteNote(); props.navigation.navigate('MyNotes')}
        } 
    >
        <MaterialCommunityIcons name="circle-off-outline" size={17}/>
    </TouchableOpacity>
  )
};

export default DeleteNote;