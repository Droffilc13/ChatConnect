import {
    Button,
    Image,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';

const ProfileModal = ({isProfileOpen, onProfileClose, user}) => {
    return (
        <>

        <Modal size="lg" isOpen={isProfileOpen} onClose={onProfileClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader 
                fontSize={"40px"} 
                fontFamily={"Work Sans"}
                textAlign={"center"}
            >
                <div>{ user.name }</div>
            </ModalHeader>
            <ModalCloseButton color={"ghost"}/>
            <ModalBody
                display={"flex"}
                alignItems={"center"} 
                justifyContent={"center"}
            >
                <Image
                    borderRadius="full"
                    boxSize="150px"
                    src={user.pic}
                    alt={user.name}
                />
            </ModalBody>

            <ModalFooter>
                <Button 
                    mr={3}
                    bg="white"
                    alignContent={"right"} 
                    onClick={onProfileClose}
                >
                    Close
                </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
        </>
  )
}

export default ProfileModal;