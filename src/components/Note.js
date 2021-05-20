import React from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Markdown from 'react-native-markdown-renderer';
import { format } from 'date-fns';


const NoteView = styled.ScrollView`
    padding: 10px;
`




const Note = ({ note }) => {
    const noteDate = format(new Date(note.createdAt), 'MM/dd/yyyy')
    const currentDate = format(new Date(), 'MM/dd/yyyy')
    return (
        <NoteView>
            <Text> 
                Note by {note.author.username} {' '}
                {currentDate === noteDate ? (
                    format(new Date(note.createdAt), 'H:mm')
                ): (
                    format(new Date(note.createdAt), 'H:mm MM/dd/yyyy')
                )}
                
            </Text>
            <Markdown>{note.content}</Markdown>

        </NoteView>
    )
}

export default Note;