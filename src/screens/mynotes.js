import React,{ useState, useCallback, useEffect } from 'react';
import { RefreshControl, StyleSheet, SafeAreaView, ScrollView, Text, View, Button, TouchableOpacity } from 'react-native';
import { useQuery, gql } from '@apollo/client'
import styled from 'styled-components/native';

import NoteFeed from '../components/NoteFeed';
import Loading from '../components/Loading';


const GET_MY_NOTES = gql`
    query me {
        me {
            id 
            username
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
    }
`;

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }


const MyNotes = props => {

  const [refreshing, setRefreshing] = useState(false);
  const { data, loading, error } = useQuery(GET_MY_NOTES);
    
  const onRefresh = () => {
      setRefreshing(true);
      wait(3000).then(() => setRefreshing(false));     
    };
    


  if (loading) return <Loading />
  if (error) return <Text>Error!</Text>
  if(data.me.notes.length !== 0) {
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
        <NoteFeed notes={data.me.notes} navigation={props.navigation}/>
        </ScrollView>
    )} else {
    return <Text>No notes yet</Text>
}

};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 100
    },
    scrollView: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

MyNotes.navigationOptions = {
  title: 'My Notes'
};

export default MyNotes;