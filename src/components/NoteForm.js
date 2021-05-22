import React, {  useState } from 'react';
import { Text, View, Button, TextInput, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { gql, useQuery, useMutation } from '@apollo/client';

const FormView = styled.View`
    padding: 10px;
    padding-top:20px
`;

const StyledInput = styled.TextInput`
    font-size: 18px;
    padding: 0px;
    width: 90%;
    height: 70%;
    text-align-vertical: top;
`
const FormButton = styled.TouchableOpacity`
    background: #0077E7;
    width: 40%;
    padding: 8px;
    margin-left: 30%;
    border-radius: 25;
`
const ButtonText = styled.Text`
    text-align: center;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
`

const NoteLayout = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
`

const ImageLayout = styled.View`
  
    width: 60px;
    margin-left:10px
    height: auto; 
`

const ContentLayout = styled.View`
    width: 85%; 
    height: auto; 
    
`

const StyledImage = styled.Image`
    width: 45px; 
    height: 45px; 
    border-radius: 45;

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
    if(loading) return <Text>Loading</Text>
    if(error) return <Text>Error</Text>
    

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

            <NoteLayout>

                <ImageLayout>
                    <StyledImage source={require('../images/profile-placeholder.jpg')} /> 
                </ImageLayout>

                <ContentLayout>
                    {props.formType ==='Edit' ? (
                        <StyledInput onChangeText={setContent} 
                            value={content}
                            defaultValue={data.note.content.toString()}
                                            
                        />
                    ):(
                        <StyledInput onChangeText={setContent} 
                            value={content}
                            placeholder="Type your MarkUp note..."                    
                        />
                    )}
                </ContentLayout>


            </NoteLayout>
            
 

            <FormButton onPress={handleSubmit}>
                <ButtonText>Submit</ButtonText>
            </FormButton>

        </FormView>
        )
}

export default NoteForm;