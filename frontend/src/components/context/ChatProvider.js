import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [activeChat, setActiveChat] = useState();
    const [chats, setChats] = useState();

    const navigate = useNavigate();

    const checkTokenValidity = () => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        setUser(userInfo);

        if (!userInfo) {
            navigate('/')
        }
    };

    useEffect(checkTokenValidity, [navigate]);

    return (
        <ChatContext.Provider value={{ user, setUser, activeChat, setActiveChat, chats, setChats }}>
            {children}
        </ChatContext.Provider>
    );
}

export { ChatProvider, ChatContext };