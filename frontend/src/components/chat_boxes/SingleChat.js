import { ChatProvider, ChatContext } from "../context/ChatProvider"
import { useContext, useEffect, useState } from 'react';
import { Box, Button, FormControl, Input, IconButton, Spinner, Text, Tooltip, useToast } from "@chakra-ui/react";
import { ArrowBackIcon, ViewIcon, EditIcon } from "@chakra-ui/icons";
import UpdateGroupChatModal from "../group_chat/UpdateGroupChatModal";
import axios from "axios";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
    const { user, activeChat, setActiveChat } = useContext(ChatContext);
    const { messages, setMessages } = useState([]);
    const { loading, setLoading } = useState(false);
    const [ newMessage, setNewMessage ] = useState("");
    const toast = useToast();

    const fetchMessages = async () => {
        if (!activeChat) {
            return ;
        }

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            };

            setLoading(true);

            const { data } = await axios.get(`api/messages/${activeChat._id}`, config);

            setMessages(data);
            setLoading(false);
        } catch (error) {

        }
    }

    const sendMessage = async (e) => {
        if (!(e.key == "Enter" && newMessage)) {
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`
                }
            }

            setNewMessage("");
            const { data } = await axios.post('/api/messages/', {
                messageContent: newMessage,
                chatId: activeChat._id,
            }, config);

            setNewMessage("");
            console.log(messages)
            setMessages([...messages, data])
        } catch(error) {
            toast({
                title: "Error Occured",
                description: "Failed to send message" + error.messages,
                status: "error",
                duration: "5000",
                isClosable: true,
                position: "bottom"
            });
        }
    }

    // useEffect(
    //     fetchMessages, [activeChat]
    // )

    const messageHandler = (e) => {
        setNewMessage(e.target.value);
        console.log(newMessage)
    }

    return (
        <>
            { activeChat ? (
                <>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        width="100%"
                        px={4}
                        pt={4}
                    >
                        <div>
                            <Text
                                fontSize={{ base: "28px", md: "30px"}}
                                w="100%"
                                fontFamily="Work sans"
                                d="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                >
                                <IconButton
                                    display={{base:"inline" , md:"none"}}
                                    icon={<ArrowBackIcon/>}
                                    onClick={() => setActiveChat("")}
                                    />
                                {activeChat.isGroupChat ? (
                                    activeChat.chatName
                                    ) : (
                                        activeChat.users[0]._id == user._id ? activeChat.users[1].name : activeChat.users[0].name
                                    )}
                            </Text>
                        </div>
                        <div>
                            <UpdateGroupChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
                        </div>
                    </Box>
                    <Box
                        d="flex"
                        flexDir="column"
                        alignItems="flex-end"
                        p={3}
                        bg="#E8E8E8"
                        w="100%"
                        h="100%"
                        borderRadius={"lg"}
                        overflowY="hidden"
                    >
                        {loading ? (
                            <Spinner
                                size="xl"
                                w={20}
                                h={20}
                                alignSelf="center"
                                margin="auto"
                            />
                        ):

                            
                            <FormControl onKeyDown={sendMessage} isRequired mt={3}>
                                <Input
                                    variant="filled"
                                    bg="#E0E0E0"
                                    placeholder="Enter a message..."
                                    onChange={messageHandler}
                                />
                            </FormControl>
                        }
                    </Box>
                </>
            ) : (
                <Box
                    d="flex"
                    alignItems="center"
                    justifyContent="center"
                    h="100%"
                >
                    <Text fontSize="36px" fontFamily="Work sans">
                        Click on your contacts to start a conversation!
                    </Text>
                </Box>
            )}
        </>
    );
}

export default SingleChat;