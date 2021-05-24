import React, { useState, useCallback } from 'react';
import { RefreshControl, SafeAreaView, ScrollView, FlatList, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { gql, useQuery, useMutation } from '@apollo/client';

import Note from './Note';
import FavoriteNote from './FavoriteNote';
import DeleteNote from './DeleteNote'

const GET_ME = gql`
  query me {
    me {
      id
      favorites {
        id
      }
    }
  }
`;

const notes = [
    { id: 0, content: 'note 00'},
    { id: 1, content: 'note 01'},
    { id: 2, content: 'note 02'},
    { id: 3, content: 'note 03'},
    { id: 4, content: 'note 04'},
    { id: 5, content: 'note 05'},
    { id: 6, content: 'note 06'},
    { id: 7, content: 'note 07'},
    { id: 8, content: 'note 08'},
    { id: 9, content: 'note 09'}
];

const AddButtom = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    width: 55px;
    position: absolute;
    bottom: 30px;
    right: 20px;
    height: 55px;

    background-color: #82B7DC;
    background-color: #82B7DC;
    border-radius: 100px;
    color: #000000;
    border: 1px solid #B8B8B9;
    elevation: 6;
 
    


`

const FeedView = styled.View`
    height: 100px;
    overflow: hidden;
    margin-bottom: 10px;
    
`;

const Separator = styled.View`
    height: 1px;
    width: 100%;
    background-color: #ced0ce
`

const LinkOptions = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 30%;
    margin-left:80px;
    color: #616161;
    
`;

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

const NoteFeed = props => {

    const [refreshing, setRefreshing] = useState(false);
    
      
    const onRefresh = () => {
        setRefreshing(true);
        wait(3000).then(() => setRefreshing(false));     
      };

    const { loading, error, data } = useQuery(GET_ME);
    if (loading) return <Text>Loading...</Text>
    if(error) return <Text>Error</Text>

    return (
        <View>
            <FlatList 
                data={props.notes}
                keyExtractor={({ id }) => id.toString()}
                ItemSeparatorComponent={() => <Separator />}
                refreshing={refreshing}
                onRefresh={onRefresh}
                renderItem={({ item }) => (

                        <FeedView>
                            <Note note={item} />

                            <LinkOptions>

                                {data.me.id === item.author.id ? (
                                    <TouchableOpacity 
                                        onPress={() => 
                                            props.navigation.navigate('Note', { id: item.id })
                                        }
                                    >
                                        <MaterialCommunityIcons color='#616161' name="note-outline" size={18}/>
                                    </TouchableOpacity>
                                ): null}
                                
                                {data.me.id === item.author.id ? (
                                    <TouchableOpacity
                                        onPress={() => 
                                            props.navigation.navigate('Edit', { id: item.id })
                                        } 
                                    >
                                        <MaterialCommunityIcons color='#616161' name="pencil-outline" size={18}/>
                                    </TouchableOpacity>
                                ): null}

                                {data.me.id === item.author.id ? (
                                    <DeleteNote noteId={item.id} navigation={props.navigation} />
                                ): null}

                                {data.me.id && props.title !== 'Favorites' ? (
                                <FavoriteNote me={data.me} noteId={item.id} favoriteCount={item.favoriteCount} />
                                ) : null}                            
                            
                            </LinkOptions>

                        </FeedView> 

                )}

            />
         
         
            {props.title === 'Feed' && (
                <AddButtom
                    onPress={() => 
                    props.navigation.navigate('New')
                    }
                >
                    <MaterialCommunityIcons color='#FFFFFF' name="pencil-plus-outline" size={32}/>
                </AddButtom>
            )}
  
        </View>
        )
};

export default NoteFeed;
