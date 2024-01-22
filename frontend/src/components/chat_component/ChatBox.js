import { Box, Skeleton, Stack } from "@chakra-ui/react";
import { ChatContext } from "../context/ChatProvider";
import { useContext } from "react";
import SingleChat from "../chat_boxes/SingleChat";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
    const { activeChat, setActiveChat } = useContext(ChatContext)

    return (
        <Box
            display={ { base: activeChat ? "flex" : "none", md: "flex"}}
            flexDir={"column"}
            alignItems={"center"}
            p={3}
            bg={"white"}
            w={{ base: "100%", md:"70%"}}
            mx={4}
            borderRadius="lg"
            borderWidth="1px"
        >
            <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        </Box>
    );
}

export default ChatBox