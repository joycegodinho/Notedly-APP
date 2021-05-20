import React, { useState, useCallback, useEffect } from 'react';
import { RefreshControl, StyleSheet, SafeAreaView, ScrollView, Text, View, Button, TouchableOpacity } from 'react-native';
import { useQuery, gql } from '@apollo/client'
import styled from 'styled-components/native';

import NoteFeed from '../components/NoteFeed';
import Loading from '../components/Loading';




const GET_NOTES = gql`
    query notes {
        notes {
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
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
const Feed = props => {

  const [refreshing, setRefreshing] = useState(false);
  
  
  const onRefresh = () => {
    
    
    setRefreshing(true);
    wait(3000).then(() => setRefreshing(false));
     
  };
  
  const { data, loading, error, refetch } = useQuery(GET_NOTES);

  if (error) return <Text>Error!</Text>
  return (
         
    <ScrollView
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
        />
      }
    >
 

    <NoteFeed notes={data.notes} title="Feed" navigation={props.navigation} />
  
        
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'pink',
    
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Feed.navigationOptions = {
  title: 'Feed'
};

export default Feed;