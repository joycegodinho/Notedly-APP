import React from 'react';
import { Text, View, Button } from 'react-native';
import { gql, useQuery, useMutation } from '@apollo/client';

import NoteForm from '../components/NoteForm';
import Loading from '../components/Loading';

const EDIT_NOTE = gql`
  mutation updateNote($id: ID!, $content: String!) {
    updateNote(id: $id, content: $content) {
      id
      content
      favoriteCount
      favoritedBy {
        id
        username
      }
      author {
        username
        id
      }
    }
  }
`;

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

const EditNote = props => {
    const id = props.navigation.getParam('id');
    
    const [editNote, { loading, error }] = useMutation(EDIT_NOTE, { variables: { id },
        refetchQueries: [{ query: GET_MY_NOTES },{ query: GET_NOTES}] 
    });
    
    if(loading) return <Loading />
    return (
    <React.Fragment>
        {error && <Text>Error!</Text>}
        <NoteForm action={editNote} id={id} formType='Edit' navigation={props.navigation} />
    </React.Fragment>
    )
}

export default EditNote;