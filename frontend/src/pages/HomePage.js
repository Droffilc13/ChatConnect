import { Container, Box, Text, Flex } from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import Login from '../components/Authentication/Login';
import Signup from '../components/Authentication/Signup';

const HomePage = () => {

  return (
    <Container maxWidth='xl' centrecontent="true">
      <Box background={"white"} textAlign="center" p="4" m="40px 0 15px 0" borderRadius="10px"> ChatterTown </Box>
      <Box background="white">
        <Tabs variant="soft-rounded" colorScheme="blue">
          <TabList>
            <Tab w="50%">Login</Tab>
            <Tab w="50%">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  )
}

export default HomePage;
