import React, { useState, useCallback } from 'react';
import { RefreshControl, SafeAreaView, ScrollView, Text, View, Button, TouchableOpacity } from 'react-native';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from 'apollo-link-context';
import * as SecureStore from 'expo-secure-store';

import getEnvVars from '../config';

const { API_URI } = getEnvVars();
const uri = API_URI;
const cache = new InMemoryCache();
const httpLink = createHttpLink({ uri })

const authLink = setContext( async (_, { headers }) => {
  return { 
      headers: {
          ...headers,
          authorization: (await SecureStore.getItemAsync('token') || '')
      }
  };
});

const client = new ApolloClient ({
  link: authLink.concat(httpLink),
  cache,
  resolvers: {}
});


import Screens from './screens'

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const Main = () => {

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(3000).then(() => setRefreshing(false));
    
  }, []);

  return (
      <ApolloProvider client={client}>
        <Screens /> 
      </ApolloProvider>
    
  );
};

export default Main;