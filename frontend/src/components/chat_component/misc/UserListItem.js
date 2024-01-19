import { ChatContext } from "../../context/ChatProvider"
import { Avatar, Box, Text } from "@chakra-ui/react";

const UserListItem = ({ user, handleFunction }) => {
    return (
        <Box
            onClick={handleFunction}
            bg="#E8E8E8"
            _hover={{
                background: "#3882AC",
                color: "white"
            }}
            w="100%"
            display="flex"
            alignItems="center"
            color="black"
            borderRadius="lg"
            mb={4}
            p={2}
        >
            <Avatar
                mr={2}
                size="sm"
                name={user.name}
                src={user.pic}
            />
            <Box>
                <Text>{user.name}</Text>
                <Text fontSize="xs">
                    <b>Email : </b> {user.email}
                </Text>
            </Box>
        </Box>
    )
};

export default UserListItem;