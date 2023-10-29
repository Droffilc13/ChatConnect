import React from 'react';
import { Container, Box, Text } from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

const HomePage = () => {

  return (
    <Container maxWidth='xl' centreContent>
      <Box        
        d='flex'
        justifyContent="center"
        padding={3}
        fontFamily="Arial"
        background={"white"}
        m = "40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize='3xl' fontFamily='work sans' color='black' align="center">ChatConnect</Text>
      </Box>
      <Box 
        background="white"
        padding={4}
        w="100%"
        borderRadius="1g"
        borderWidth="1px"
      >
        <Tabs variant='soft-rounded'>
          <TabList marginBottom='1em'>
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>{1}</TabPanel>
            <TabPanel>{2}</TabPanel>
          </TabPanels>
        </Tabs>

      </Box>
    </Container>
  )
}

export default HomePage;
