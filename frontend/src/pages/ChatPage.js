import React, { useState, useContext } from 'react';
import axios from 'axios';
import { ChatContext } from '../components/context/ChatProvider.js'

const ChatPage = () => {
    const { user } = useContext(ChatContext);
    console.log(user)
    return (
        <h1>Hello {user.name}</h1>
    );
}

export default ChatPage
