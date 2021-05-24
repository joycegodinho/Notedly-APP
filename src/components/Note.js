import React from 'react';
import { ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import styled from 'styled-components/native';
import Markdown from 'react-native-markdown-renderer';
import { format } from 'date-fns';


const NoteView = styled.ScrollView`
    padding: 10px;
    color: #FFFFFF
`


const NoteLayout = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
`

const ImageLayout = styled.View`
  
    width: 60px;
    margin-left:10px
    height: auto; 
`

const ContentLayout = styled.View`
    width: 85%; 
    height: auto; 
    
`

const StyledImage = styled.Image`
    width: 45px; 
    height: 45px; 
    border-radius: 45;

`

const StyledName = styled.Text`
    font-size: 17;
    font-weight: bold;
`

const StyledTime = styled.Text`
    color: #616161;
    margin-left:30px
    
`

const ViewName = styled.View`
    margin-left:0px;
    
`

const ViewTime = styled.View`
    margin-right:0px;
    width: 15%; 
`

const Note = ({ note }) => {

    const noteDate = format(new Date(note.createdAt), 'MM/dd/yyyy')
    const currentDate = format(new Date(), 'MM/dd/yyyy')

    return (
        <NoteView>
            <NoteLayout>
                <ImageLayout>

                <StyledImage source={require('../images/profile-placeholder.jpg')} />

                </ImageLayout>

                <ContentLayout>

                    <Text> 
                        <ViewName>
                            <StyledName>
                                {note.author.username} {' '}
                            </StyledName>
                        </ViewName>

                        <ViewTime>
                            <StyledTime>
                                {currentDate === noteDate ? (
                                    format(new Date(note.createdAt), 'H:mm')
                                ): (
                                    format(new Date(note.createdAt), 'H:mm MM/dd/yyyy')
                                )}
                            </StyledTime>

                        </ViewTime>

                        

                    
                    </Text>
                    <Markdown>{note.content}</Markdown>

                </ContentLayout>
            </NoteLayout>


        </NoteView>
    )
}

export default Note;