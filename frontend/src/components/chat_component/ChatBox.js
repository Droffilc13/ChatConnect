import { Box, Skeleton, Stack } from "@chakra-ui/react";
import { ChatContext } from "../context/ChatProvider";
import { useContext } from "react";

const ChatBox = () => {
    const { activeChat, setActiveChat } = useContext(ChatContext)

    return (
        <Box
            display={ { base: activeChat ? "flex" : "none", md: "flex"}}
            flexDir={"column"}
            alignItems={"center"}
            p={3}
            bg={"white"}
            w={{ base: "100%", md:"70%"}}
            m={2}
            borderRadius="lg"
            borderWidth="1px"
        >
            <Box>
                My Chats
            </Box>

        </Box>
    );
}

export default ChatBox