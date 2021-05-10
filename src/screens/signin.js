import React from 'react';
import { Text, View, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';

import UserForm from '../components/UserForm'

const SignIn = props => {

    const storeToken = () => {
        SecureStore.setItemAsync('token', 'abc').then( 
            props.navigation.navigate('App')
        )
    }
    return (
        <View>
            <UserForm />
        </View>
        );
}

SignIn.navigationOptions = {
    title: 'Sign In'
};

export default SignIn;