import React, { useState, useContext } from 'react';
import axios from 'axios';
import { ChatContext } from '../components/context/ChatProvider.js'
import { Box } from '@chakra-ui/react';
import SideMenu from '../components/chat_component/SideMenu.js';
import ChatBox from '../components/chat_component/ChatBox.js';
import UserList from '../components/chat_component/UserList.js';

const ChatPage = () => {
    const { user } = useContext(ChatContext);

    return (
        <div style={{width: '100%'}}>
            { user && <SideMenu/>}
            <Box
                display='flex'
                flexDirection='column'
                w="100%"
                justifyContent='center'
                bg={'red'}
                >
                { user && <UserList/> }
                { user && <ChatBox/> }
            </Box>

        </div>
    );
}

export default ChatPage
