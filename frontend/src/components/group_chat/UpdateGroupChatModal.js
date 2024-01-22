import {
    Button,
    IconButton, 
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure
} from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons';
import { ChatProvider, ChatContext } from '../context/ChatProvider';
import { useContext } from 'react';

const UpdateGroupChatModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { activeChat, setActiveChat } = useContext(ChatContext);

    return (
        <>
        <IconButton onClick={onOpen} icon={<EditIcon/>}>Open Modal</IconButton>

        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>{activeChat.chatName}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                This is the group chat modal
            </ModalBody>

            <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onClose}>
                    Close
                </Button>
                <Button variant='ghost'>Secondary Action</Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    );
}

export default UpdateGroupChatModal