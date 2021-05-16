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


const EditNote = props => {
    const id = props.navigation.getParam('id');
    const [data, { loading, error }] = useMutation(EDIT_NOTE, { variables: { id }});
    if(loading) return <Loading />
    return (
    <React.Fragment>
        {error && <Text>Error!</Text>}
        <NoteForm action={data} navigation={props.navigation} />
    </React.Fragment>
    )
}

export default EditNote;