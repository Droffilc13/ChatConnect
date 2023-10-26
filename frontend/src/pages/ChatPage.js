import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ChatPage = () => {
    const [chats, setChats] = useState([])

    const fetchChats = async () => {
        try {
            const { data } = await axios.get("/api/chats")
            console.log(data)
            setChats(data)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(`Axios Error: ${error}`)
            } else {
                console.log(`Unexpected Error: ${error}`)
            }
        }
        
    };

    useEffect(() => {
        fetchChats();
    }, [])

  return (
    <div>
        {chats.map(x => <div key={x._id}> {x.chatName} </div>)}

    </div>
  )
}

export default ChatPage
