import { ChatProvider, ChatContext } from "../context/ChatProvider"
import { useContext, useState } from 'react';
import { Box, Button, IconButton, Text, Tooltip } from "@chakra-ui/react";
import { ArrowBackIcon, ViewIcon, EditIcon } from "@chakra-ui/icons";
import UpdateGroupChatModal from "../group_chat/UpdateGroupChatModal";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
    const { user, activeChat, setActiveChat } = useContext(ChatContext);

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
                        justifyContent={"flex-end"}
                        p={3}
                        bg="#E8E8E8"
                        w="100%"
                        h="100%"
                        borderRadius={"lg"}
                        overflowY="hidden"
                    >
                        <div>Hello</div>
                        <div>How are you?</div>
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