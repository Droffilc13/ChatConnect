import { Button, InputGroup, FormControl, FormLabel, Input, VStack, Heading, FormErrorMessage, InputLeftElement, InputRightElement } from "@chakra-ui/react";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { AtSignIcon, LockIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useState } from 'react';

const Login = () => {
    const initialValues = {
        email: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Email Address is required').email("Incorrect email format"),
        password: Yup.string().required('Password is required').min(4, 'Password is too short').max(12, 'Password is too long'),
    });

    const handleSubmit = (values, actions) => {
        alert(JSON.stringify(values, null, 2))
        actions.resetForm();
    }

    const [isVisible, setIsVisible] = useState(false);

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {formik => (
                <VStack   
                    as="form"
                    justifyContent={"center"}    
                    onSubmit={formik.handleSubmit}
                >
                    <FormControl isInvalid={formik.errors.email && formik.touched.email}>
                        <FormLabel>Email Address</FormLabel>
                        <InputGroup>
                            <InputLeftElement><AtSignIcon/></InputLeftElement>
                            <Input 
                                name="email" 
                                type="email" 
                                value={formik.values.email} 
                                placeholder="Email Address"
                                {...formik.getFieldProps("email")}
                            />
                        </InputGroup>
                        <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={formik.errors.password && formik.touched.password}>
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                            <InputLeftElement><LockIcon/></InputLeftElement>
                            <Input 
                                name="password" 
                                type={isVisible ? "text": "password"} 
                                value={formik.values.password}
                                placeholder="Password"
                                {...formik.getFieldProps("password")} 
                                />
                            <InputRightElement>
                                <Button onClick={() => {setIsVisible(!isVisible)}}>
                                    {isVisible ? <ViewIcon/> : <ViewOffIcon/>}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                    </FormControl>

                    <Button type="submit">
                        Login
                    </Button>
                </VStack>
            )}
        </Formik>
    )  
};

export default Login;
