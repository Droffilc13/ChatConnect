import {
    Box,
    Button,
    FormControl,
    IconButton, 
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    useToast
} from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons';
import { ChatProvider, ChatContext } from '../context/ChatProvider';
import { useContext } from 'react';
import UserTag from '../chat_component/misc/UserTag';
import { useEffect, useState } from 'react';
import axios from 'axios';
import UserListItem from '../chat_component/misc/UserListItem';

const UpdateGroupChatModal = ({fetchAgain, setFetchAgain}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { user, activeChat, setActiveChat } = useContext(ChatContext);
    const [ selectedUsers, setSelectedUsers ] = useState([]);
    const [ groupName, setGroupName ] = useState("");
    const [ searchResults, setSearchResults ] = useState("");
    const [ loading, setLoading ] = useState(false);
    const [ isRenameLoading, setIsRenameLoading ] = useState(false);

    const toast = useToast();

    useEffect(() => {
        setSelectedUsers(activeChat.users);
        setGroupName(groupName);
        console.log("Active Chat:", activeChat);
        console.log("Selected Users:", selectedUsers);
    },[activeChat]);

    const checkIsAdmin = () => {
        console.log(activeChat._id)
        return user._id === activeChat.groupAdmin._id;
    }

    const handleRemoveGroupMember = async (groupMember) => {
        if (!checkIsAdmin()) {
            toast ({
                title: "Only group admin can remove users!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top"
            });
            
            return ;
        }

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                }
            }

            await axios.put(`/api/chats/removefromgroup`, {
                chatId: activeChat._id,
                accessChatUserId: groupMember._id
            }, config).then((req) => {
                setActiveChat(req.data);
                setFetchAgain(!fetchAgain);
                toast ({
                    title: "Successfully removed member!",
                    description: `${groupMember.name} has been removed!`,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom"
                });
            });


        } catch (error) {
            toast ({
                title: "Error occured when removing group member",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top"
            }); 
        }
    }

    // TODO: implement this
    const handleAddGroupMember = async (groupMember) => {
        console.log("group member", groupMember)
        if (!checkIsAdmin()) {
            toast ({
                title: "Only group admin can add users!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top"
            });
            
            return ;
        }

        if (selectedUsers.some(selectedUser => selectedUser._id === groupMember._id)) {
            toast ({
                title: "User already exists!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top"
            });
            return ;
        }

        try {

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                }
            }

            await axios.put(`/api/chats/addtogroup`, {
                chatId: activeChat._id,
                accessChatUserId: groupMember._id
            }, config).then(req => {
                setActiveChat(req.data);
                setFetchAgain(!fetchAgain);
            });
            
            toast ({
                title: "Successfully added member!",
                description: `${groupMember.name} has been added!`,
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            }); 

        } catch (error) {
            toast ({
                title: "Error occured when adding group member",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top"
            }); 
        }
    }

    // TODO: implement this
    const handleSearch = async (query) => {
        if (!query) {
            return ;
        }

        try {
            setLoading(true);

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                }
            }

            const { data } = await axios.get(`/api/user/?search=${query}`, config);
            setLoading(false);
            setSearchResults(data);
            console.log(data);
        } catch (e) {
            toast ({
                title: "User already added",
                description: e.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top"
            })

            setLoading(false);
        }
    } 

    const handleRenameSubmit = async () => {
        if (!checkIsAdmin()) {
            toast ({
                title: "Only group admin can rename the group!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top"
            });
            
            return ;
        }

        try {
            setIsRenameLoading(true);

            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                }
            }

            const { data } = await axios.patch('/api/chats/rename', {
                chatId: activeChat._id,
                name: groupName
            }, config);

            setActiveChat(data);
            setIsRenameLoading(false);
            setFetchAgain(!fetchAgain);

            toast ({
                title: `Successfully renamed group to ${activeChat.chatName}!`,
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });

            return ;
        } catch (error) {
            toast ({
                title: "Error in renaming group!",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top"
            });

            setIsRenameLoading(false);
        }
    }

    return (
        <>
        <IconButton 
            onClick={() => {
                setGroupName(activeChat.chatName)
                onOpen()
            }} 
            icon={<EditIcon/>}
        >
                Open Modal
        </IconButton>

        <Modal 
            isOpen={isOpen} 
            onClose={() => {
                onClose();
                setSearchResults([]);
            }}
        >
            <ModalOverlay />
            <ModalContent>
            <ModalHeader
                textAlign={"center"}
                fontSize={"28px"}
            >
                {activeChat.chatName}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Box
                    display="flex"
                    flexDirection=""
                    p={2}
                    justifyContent="center"
                    flexWrap={"wrap"}
                    fontSize={14}
                    >
                    {selectedUsers?.map(groupMember => (
                        <UserTag key={groupMember._id} user={groupMember} handleDelete={() => handleRemoveGroupMember(groupMember)} />
                        ))}
                </Box>

                <FormControl>
                    <Box
                        display="flex"
                        flexDirection="row"
                    >
                        <Input
                            display="inline-block"                        
                            mb={2}
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                        />
                        <Button 
                            onClick={handleRenameSubmit} 
                            isLoading={isRenameLoading} 
                            backgroundColor="teal"
                            variant="solid"
                            color="white"
                            _hover={{ backgroundColor: 'teal' }}
                        >
                            Rename
                        </Button>
                    </Box>
                </FormControl>
                <FormControl>
                    <Input
                        placeholder="Add more group memebers ..."
                        mb={1}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </FormControl>
                <Box
                    display={"flex"}
                    flexDirection={"column"}
                >
                    {searchResults? searchResults.map(searchResult => (
                        <UserListItem key={searchResult._id} user={searchResult} handleFunction={() => handleAddGroupMember(searchResult)} />
                    )):
                    (<div></div>)}
                </Box>
                
                
            </ModalBody>

            <ModalFooter>
                <Button 
                    colorScheme='red' 
                    mr={3} 
                    onClick={() => {
                        handleRemoveGroupMember(user);
                        onClose();
                        setFetchAgain(!fetchAgain); 
                    }}>
                    Leave Group
                </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    );
}

export default UpdateGroupChatModal