import { Box } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

const UserTag = ({ user, handleDelete}) => {
    return (
        <Box
            bg={"purple"}
            color={"white"}
            px={2}
            py={1}
            m={2}
            borderRadius={"48px"}
            alignItems="center"
        >
            {user.name}
            <CloseIcon 
                onClick={() => handleDelete(user)}
                ml={2} 
                mb={1}
                color="red.400"
                borderRadius="full"
                boxSize={4}/>
        </Box>    
    );
    
}

export default UserTag;