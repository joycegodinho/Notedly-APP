import React, {  useState } from 'react';
import { Text, View, Button, TextInput, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

const FormView = styled.View`
    padding: 10px;
`;

const StyledInput = styled.TextInput`
    border: 1px solid gray;
    border-radius: 5px;
    font-size: 18px;
    padding: 8px;
    margin-bottom: 24px;
`
const FormLabel = styled.Text`
    font-size: 18px;
    font-weight: bold;
`
const FormButton = styled.TouchableOpacity`
    background: #0077cc;
    width: 100%;
    padding: 8px;
    border-radius: 5px;
`
const ButtonText = styled.Text`
    text-align: center;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
`

const SignUp = styled.TouchableOpacity`
    margin-top: 20px;
`

const Link = styled.Text`
    color: #0077cc;
    font-weight: bold;
`

const UserForm = props => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [username, setUsername] = useState();
    

    const handleSubmit = () => {
        props.action({
            variables: {
                email: email,
                password: password,
                username: username
            }
        })
    }

    return (
        <FormView>
            <FormLabel>Email</FormLabel>
            <StyledInput onChangeText={text => setEmail(text)} 
                       value={email} 
                       textContentType="emailAddress"
                       autoCompleteType="email"
                       autoFocus={true}
                       autoCapitalize="none"
            />
            {props.formType === 'signUp' && (
                <View>
                    <FormLabel>Username</FormLabel>
                    <StyledInput onChangeText={text => setUsername(text)} 
                            value={username} 
                            textContentType="username"
                            autoCapitalize="none"
                    />
                </View>
            )}

            <FormLabel>Password</FormLabel>
            <StyledInput onChangeText={text => setPassword(text)} 
                       value={password} 
                       textContentType="password"
                       secureTextEntry={true}
                       autoCapitalize="none"
            />

            <FormButton onPress={handleSubmit}>
                <ButtonText>Submit</ButtonText>
            </FormButton>

            {props.formType === 'signIn' && (
                <SignUp onPress={() => props.navigation.navigate('SignUp')}>
                    <Text><Text>Need an account? </Text><Link>Sign Up</Link></Text>
                    
                </SignUp>
            )}

        </FormView>
        )
}

export default UserForm;