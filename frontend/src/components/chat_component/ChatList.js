import UserListItem from "./misc/UserListItem";
import { ChatContext } from "../context/ChatProvider";
import { useContext, useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { Box, Button, Stack, Text, useDisclosure } from '@chakra-ui/react';
import { AddIcon } from "@chakra-ui/icons";
import ChatLoading from "./misc/ChatLoading";
import GroupChatModel from "../group_chat/GroupChatModel";

const ChatList = ({fetchAgain, setFetchAgain}) => {
    const { user, activeChat, setActiveChat, chats, setChats } = useContext(ChatContext);
    const { isOpen:isGroupChatModalOpen, onOpen:onGroupChatModalOpen, onClose:onGroupChatModalClose } = useDisclosure();

    const toast = useToast();

    const fetchChats = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }

            const { data } = await axios.get("/api/chats", config);
            setChats(data);
        } catch (e) {
            toast({
                title: "Error Occured",
                description: "Failed to Load the Chats",
                status: "error",
                duration: "5000",
                isClosable: true,
                position: "top-left"
            });
        }
    }

    useEffect(() => {
        fetchChats();
    }, [fetchAgain])

    return (
        <Box
            display={ { base: activeChat ? "none" : "flex", md: "flex"}}
            flexDir={"column"}
            alignItems={"center"}
            p={3}
            bg={"white"}
            w={{ base: "100%", md:"30%"}}
            borderRadius="lg"
            borderWidth="1px"
        >
            <Box
                display={"flex"}
                flexDir={"row"}
                justifyContent={"space-between"}
                w="100%"
                mx={5}
                mt={4}
                fontFamily={"Work Sans"}
                fontSize={{ base: "28px", md:"30px" }}
            >
                My Chats

                <Button
                    mt={1}
                    rightIcon={<AddIcon/>}
                    _hover={{ bg: "green.300" }}
                    onClick={ onGroupChatModalOpen }
                    >
                    New Group Chat
                </Button>

            </Box>

            <Box
                display="flex"
                flexDir={"column"}
                mt={2}
                p={3}
                bg="#F8F8F8"
                w="100%"
                h="100%"
                borderRadius={"lg"}
                overflowY={"hidden"}
            >
                {chats ? (
                    <Stack overflowY={"scroll"}>
                        { chats.map((chat) => (
                            <Box
                                onClick={() => setActiveChat(chat)}
                                bg={activeChat === chat ? "#3882AC" : "E8E8E8"}
                                color={activeChat === chat ? "white" : "black"}
                                px={3}
                                py={2}
                                borderRadius="lg"
                                key={chat._id}
                            >
                                <Text>
                                    {chat.isGroupChat ? chat.chatName: (
                                        user._id === chat.users[0]._id ? chat.users[1].name : chat.users[0].name
                                    )}
                                </Text>
                            </Box>
                        ))}

                    </Stack>

                ) : (
                    <ChatLoading />
                )}
            </Box>
            
            <GroupChatModel isGroupChatModalOpen={isGroupChatModalOpen} onGroupChatModalClose={onGroupChatModalClose} />
        </Box>
    );
}

export default ChatList