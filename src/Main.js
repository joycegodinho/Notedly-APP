import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import getEnvVars from '../config';

const { API_URI } = getEnvVars();
const uri = API_URI;
const cache = new InMemoryCache();

const client = new ApolloClient({ uri, cache })

import Screens from './screens'

const Main = () => {
  return (
      <ApolloProvider client={client}>
          <Screens />
      </ApolloProvider>
    
  );
};

export default Main;