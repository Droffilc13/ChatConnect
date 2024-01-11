import { Button, InputGroup, FormControl, FormLabel, Input, VStack, Heading, FormErrorMessage, InputLeftElement, InputRightElement, useToast } from "@chakra-ui/react";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { AtSignIcon, LockIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    const initialValues = {
        email: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Email Address is required').email("Incorrect email format"),
        password: Yup.string().required('Password is required').min(1, 'Password is too short').max(12, 'Password is too long'),
    });

    const handleSubmit = async (values, actions) => {
        console.log("HEYO")
        setIsLoading(true);
        if (!values.email || !values.password) {
            toast({
                title: "Please fill out all the fields",
                status: "warning",
                duration: 5000,
                isCloseable: true,
                position: "bottom"
            })
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                },
            }
            console.log("To backend");
            const { data } = await axios.post(
                "/api/user/login",
                { email: values.email, 
                  password: values.password },
                config
            )
            console.log("Finsih")

            toast({
                title: "Login Successful",
                status: "success",
                duration: 5000,
                isCloseable: true,
                position: "bottom"
            });
            localStorage.setItem("userInfo", JSON.stringify(data));
            setIsLoading(false);
            navigate("/chats")
        } catch (error) {
            toast({
                title: "Error Occured",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isCloseable: true,
                position: "bottom"
            })
            setIsLoading(false);
        }
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

                    <Button type="submit" width="100%" colorScheme="teal" isLoading={isLoading}>
                        Login
                    </Button>
                    <Button width="100%" colorScheme="red" onClick={() => {
                        formik.setFieldValue('email', 'guest@example.com');
                        formik.setFieldValue('password', 1234);
                    }}>
                        Get Guest Credentials
                    </Button>
                </VStack>
            )}
        </Formik>
    )  
};

export default Login;
