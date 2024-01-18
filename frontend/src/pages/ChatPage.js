import React, { useState, useContext } from 'react';
import axios from 'axios';
import { ChatContext } from '../components/context/ChatProvider.js'
import { Box } from '@chakra-ui/react';
import SideMenu from '../components/chat_component/SideMenu.js';
import ChatBox from '../components/chat_component/ChatBox.js';
import UserList from '../components/chat_component/ChatList.js';

const ChatPage = () => {
    const { user } = useContext(ChatContext);

    return (
        <div style={{width: '100%'}}>
            { user && <SideMenu/>}
            <Box
                display='flex'
                flexDirection='row'
                w="100%"
                h="91vh"
                mt={2}
                ml={2}
                justifyContent='space-between'
                >
                { user && <UserList/> }
                { user && <ChatBox/> }
            </Box>

        </div>
    );
}

export default ChatPage
