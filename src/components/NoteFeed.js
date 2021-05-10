import React from 'react';
import { FlatList, View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

import Note from './Note';

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
    return (
        <View>
            <FlatList 
                data={props.notes}
                keyExtractor={({ id }) => id.toString()}
                ItemSeparatorComponent={() => <Separator />}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => 
                            props.navigation.navigate('Note', { id: item.id })
                        }
                    >
                        <FeedView>
                            <Note note={item} />
                        </FeedView>
                    </TouchableOpacity>

                )}
            />
        </View>
        )
};


export default NoteFeed;
