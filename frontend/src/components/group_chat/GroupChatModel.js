import {
    Box,
	Button,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
    Spinner,
    useToast,
    VStack
} from '@chakra-ui/react'
import { useContext, useState, useRef } from 'react'
import * as Yup from 'yup';
import { Field, Formik, Form } from 'formik';
import TextField from '../form_utils/TextField';
import { ChatContext, ChatProvider } from '../context/ChatProvider';
import axios from 'axios';
import UserListItem from '../chat_component/misc/UserListItem';
import { CloseIcon } from '@chakra-ui/icons';

const validationSchema = Yup.object({
  groupName: Yup.string()
    .required('Group name is required')
    .max(50, 'Group name must be at most 50 characters'),

  users: Yup.array()
    .required('At least two users are required')
    .min(2, 'At least two users are required')
});

const GroupChatModel = ({ isGroupChatModalOpen, onGroupChatModalClose }) => {
    const [groupChatName, setGroupChatName] = useState("");
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState  ("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user, chats, setChats } = useContext(ChatContext);

    const toast = useToast();

    const handleAddToGroup = (user) => {
        if (!user) {
            return ;
        }
        if (selectedUsers.filter(selectedUser => selectedUser._id == user._id).length > 0) {
            toast ({
                title: "User already added",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top"
            })
            return ;
        }

        setSelectedUsers([...selectedUsers, user])
    }

    const handleSearch = async (query) => {
        setSearchQuery(query);

        if (!query) {
            return ;
        }

        try {
            setLoading(true);

            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                }
            }

            const { data } = await axios.get(`/api/user?search=${query}`, config);
            setLoading(false);
            setSearchResults(data);
        } catch (e) {
            toast ({
                title: "Failed to search for users",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left"
            })
        }
    }

    const handleSubmit = async () => {
        if (!groupChatName) {
            toast ({
                title: "Give your group chat a name",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            })
            return ;                    
        }

        if (selectedUsers.length < 2) {
            toast ({
                title: "Too few people in group chat",
                description: "Invite 2 or more people to join!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            })
            return ;   
        }
        
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            };
            const { data } = await axios.post('/api/chats/group', {
                name: groupChatName,
                users: JSON.stringify(selectedUsers.map(selectedUser => selectedUser._id))
            }, config);
            
            setChats([data, ...chats]);
            toast ({
                title: `Group Chat ${groupChatName} created successfully!`,
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            }) 
        } catch (error) {
            toast ({
                title: "Failed to create chat!",
                description: error.response.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            }) 
        }
    }

	return (
		<>
		<Modal isOpen={isGroupChatModalOpen} onClose={onGroupChatModalClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader
                    fontSize={{base:"28px", md:"30px"}}
                    fontFamily="Work Sans"
                >
                    Create Group Chat
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                    <Input
                        placeholder="Enter Group Name ..."
                        mb={2}
                        onChange={(e) => setGroupChatName(e.target.value)}
                    />
                    </FormControl>
                    <FormControl>
                    <Input
                        placeholder="Search user names here ..."
                        mb={1}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    </FormControl>
                    <Box
                        display="flex"
                        flexDirection=""
                        p={2}
                        justifyContent="center"
                        flexWrap={"wrap"}
                        fontSize={14}
                    >
                        { selectedUsers?.map((user) => (
                            <Box
                                bg={"purple"}
                                color={"white"}
                                p={2}
                                m={2}
                            >
                                {user.name}
                                <CloseIcon 
                                    onClick={() => {
                                        setSelectedUsers(selectedUsers.filter(selectedUser => selectedUser._id != user._id))
                                    }}
                                    ml={2} 
                                    mb={1} 
                                    boxSize={2}/>
                            </Box>
                        ))}
                    </Box>

                    { loading ? <Spinner /> : (
                        searchResults?.slice(0, 4).map((user) => (
                            <UserListItem
                            key={user._id}
                            user={user}
                            handleFunction={() => 
                                handleAddToGroup(user)
                            }
                            />
                        ))
                        )}
                    <Button 
                        colorScheme='green' mr={3} 
                        onClick={() => {
                            handleSubmit()
                            onGroupChatModalClose()
                        }}
                    >
                        Create
                    </Button>
                </ModalBody>
            </ModalContent>
		</Modal>
		</>
	)
}

export default GroupChatModel
