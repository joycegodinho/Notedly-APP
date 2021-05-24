import React, {useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Text, View, Button } from 'react-native';

import Loading from '../components/Loading';

const AuthLoading = props => {
    const checkLoginState = async () => {
        const userToken = await SecureStore.getItemAsync('token');

        props.navigation.navigate(userToken ? 'App' : 'Auth');
    }

    useEffect(() => {
        checkLoginState();
    })
    return (
        <Text></Text>
    )
};

export default AuthLoading;