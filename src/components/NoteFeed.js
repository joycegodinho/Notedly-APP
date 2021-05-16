import React from 'react';
import { FlatList, View, TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { gql, useQuery, useMutation } from '@apollo/client';

import Note from './Note';
import FavoriteNote from './FavoriteNote'

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
    border-width: 1px;
    border-color: rgba(0,0,0,0.2);
    justify-content: center;
    align-items: center;
    width: 70px;
    position: absolute;
    bottom: 10px;
    right: 10px;
    height: 70px;
    background-color: #fff;
    border-radius: 100px;
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

const NoteFeed = props => {
    const { loading, error, data } = useQuery(GET_ME);
    if (loading) return <Text>Loading...</Text>
    if(error) return <Text>Error</Text>
    return (
        <View>
            <FlatList 
                data={props.notes}
                keyExtractor={({ id }) => id.toString()}
                ItemSeparatorComponent={() => <Separator />}
                renderItem={({ item }) => (

                        <FeedView>
                            <Note note={item} />
                                <TouchableOpacity
                                    onPress={() => 
                                        props.navigation.navigate('Note', { id: item.id })
                                    }
                                >
                                    <Text>Note</Text>
                                </TouchableOpacity>

                                {data.me.id === item.author.id && (
                                    <TouchableOpacity
                                        onPress={() => 
                                            props.navigation.navigate('Edit', { id: item.id })
                                        } 
                                    >
                                        <Text>Edit</Text>
                                    </TouchableOpacity>
                                )}

                                {data.me.id ? (
                                <FavoriteNote me={data.me} noteId={item.id} favoriteCount={item.favoriteCount} />
                                ) : null}
                        </FeedView>
                    

                )}
            />
            {props.title === 'Feed' && (
                <AddButtom
                    onPress={() => 
                    props.navigation.navigate('New')
                    }
                >
                    <MaterialCommunityIcons name="plus" size={48}/>
                </AddButtom>
            )}

        </View>
        )
};


export default NoteFeed;
