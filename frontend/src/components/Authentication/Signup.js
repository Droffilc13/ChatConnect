import { useState } from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  VStack,
  Center,
  useToast
} from '@chakra-ui/react';
import * as Yup from 'yup';
import { Field, Formik, Form } from 'formik';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const TextField = ({ name, label, type, placeholder }) => {
    return (
        <Field name={name}>
            {({ field, form }) => (
                <FormControl isInvalid={ form.errors[name] && form.touched[name] }>
                    <FormLabel htmlFor={name}>{label}</FormLabel>
                    <Input {...field} id={name} type={type} placeholder={placeholder || label }/>
                    <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
                </FormControl>
            )}
        </Field>
    );
}

const Signup = () => {
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    const postDetails = (pics , setFieldValue) => {
        setIsLoading(true);
        if (pics == undefined) {
            toast({
                title: "Please select an image",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            })
            return;
        }

        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "chattertown");
            data.append("cloud_name", "deolnyeuf");
            fetch("https://api.cloudinary.com/v1_1/deolnyeuf/image/upload", {
                method:'post',
                body:data,
            }).then((res) => res.json())
            .then((data) => {
                setFieldValue('profile_picture', data.url.toString());
                console.log(data);
                setIsLoading(false);
            }).catch((err) => {
                console.log(err);
                setIsLoading(false);
            })
        } else {
            toast({
                title: "Please select a supported image format (JPEG / PNG/ JPG)",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            })
        }
    }

    return (
        <Formik
            initialValues={{
                username: "",
                email: "",
                password: "",
                confirm_password: "",
                profile_picture: null,
            }}
            validate={ (values) => {
                const errors = {};

                if (!values.username) {
                    errors.username = 'Required';
                }

                console.log(errors)
                return errors;
            }}
            onSubmit={ async (values) => {
                setIsLoading(true);
                if (!values.username || !values.email || !values.password || !values.confirm_password) {
                    console.log(values);
                    console.log(values.name );
                    toast ({
                        title: "Please fill out all the required fields",
                        status: "warning",
                        duration: 5000,
                        isClosable: true,
                        position: "bottom"
                    })
                    setIsLoading(false);
                    return;
                }
                
                try  {
                    const config = {
                        headers: {
                            "Content-type": "application/json",
                        }
                    };
                    const data = await axios.post("/api/user", {
                        username: values.username, 
                        email: values.email, 
                        password: values.password, 
                        pics: values.pics}, 
                        config);
                    console.log(data)
                    toast ({
                        title: "Registration Successful",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                        position: "bottom"
                    })
                    
                    localStorage.setItem("userInfo", JSON.stringify(data));
                    navigate('/chats')
                } catch (error) {
                    toast({
                        title: "Error occured!",
                        description: error.response.data.message,
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                        position: "bottom",
                    })
                }
                setIsLoading(false);
            }}
        >
        
        {(formik) => (
            <Form>
                <VStack spacing={4} align="start">
                    <TextField name="username" label="Username" type="text" />
                    <TextField name="email" label="Email" type="text" />
                    <TextField name="password" label="Password" type="password" />
                    <TextField name="confirm_password" label="Confirm Password" type="password" />
                    <Field name="profile_picture">
                        {({ form }) => (
                            <FormControl isInvalid={form.errors.profile_picture && form.touched.profile_picture}>
                                <Input
                                    type="file"
                                    id="profile_picture"
                                    accept="image/*"
                                    onChange={(event) => {
                                        postDetails(event.target.files[0], formik.setFieldValue);
                                    }}
                                />
                            </FormControl>
                        )}
                    </Field>
                    <Button type="submit" isLoading={isLoading}>
                        Sign Up
                    </Button>
                </VStack>
            </Form>
        )}
        
        </Formik>
    )
}

export default Signup;