import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import styled from 'styled-components/native';


const LoadingWrap = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`

const Loading = () => {
    return (
        <LoadingWrap>
            <ActivityIndicator size="large" color="black" />
        </LoadingWrap>
    )
}

export default Loading;