import { useState } from 'react';
import { Box, Button, Text, Tooltip } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const SideMenu = () => {
    // const [search, setSearch] = useState("")
    // const [searchResult, setSearchResult] = useState([])
    // const [loading, setLoading] = useState(false);
    // const [loadingChat, setLoadingChat] = useState();

    return (
        <>
            <Box
                width='100%'
                padding={4}
                bg={'red.200'}
            >
                <Tooltip 
                    label="Search users to chat"
                >
                    <Button>
                        <SearchIcon />
                        <Text>Search Users</Text>
                    </Button>
                </Tooltip>
            </Box>
        </>
    );

}

export default SideMenu