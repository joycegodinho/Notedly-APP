import React from 'react';
import { Text, View, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const SignIn = props => {
    return (
        <View>
            <Button title="Sign In" />
        </View>
        );
}

SignIn.navigationOptions = {
    title: 'Sign In'
};

export default SignIn;