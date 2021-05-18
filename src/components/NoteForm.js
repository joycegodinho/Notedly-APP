import React, {  useState } from 'react';
import { Text, View, Button, TextInput, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

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
const NoteForm = props => {

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
            <StyledInput onChangeText={text => setContent(text)} 
                       value={content} 
                                                
            />
            <FormButton onPress={handleSubmit}>
                <ButtonText>Submit</ButtonText>
            </FormButton>

        </FormView>
        )
}

export default NoteForm;