import React, {  useState } from 'react';
import { Text, View, Button, TextInput, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { gql, useQuery, useMutation } from '@apollo/client';
const FormView = styled.View`
    padding: 10px;
`;

const StyledInput = styled.TextInput`
    border: 1px solid gray;
    font-size: 18px;
    padding: 8px;
    margin-bottom: 24px;
    width: 80%;
    height: 60%
`
const FormButton = styled.TouchableOpacity`
    background: #0077cc;
    width: 100%;
    padding: 8px;
`
const ButtonText = styled.Text`
    text-align: center;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
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

const NoteForm = props => {
    const id = props.id
    const { loading, error, data } = useQuery(GET_NOTE, { variables: { id }});
    const [content, setContent] = useState();
    

    const handleSubmit = () => {
        props.action({
            variables: {
                content: content
            }
        })
        props.navigation.navigate('Feed')
    }

    return (
        <FormView>
            {props.formType ==='Edit' ? (
                <StyledInput onChangeText={setContent} 
                    value={content}
                    defaultValue={data.note.content.toString()}
                                     
                />
            ):(
                <StyledInput onChangeText={setContent} 
                    value={content}                    
                />
            )}

            <FormButton onPress={handleSubmit}>
                <ButtonText>Submit</ButtonText>
            </FormButton>

        </FormView>
        )
}

export default NoteForm;