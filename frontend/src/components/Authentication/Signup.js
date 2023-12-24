import React from 'react';
import { VStack } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import { Form } from 'react-router-dom';
import { Field, Formik } from 'formik';
import { useState } from 'react';

const Signup = () => {

    const handleSubmit = (values, actions) => {
        alert(JSON.stringify(values, null, 2))
        // actions.resetForm()
    }

    const initialValues = {
        name: "",
        email: "",
        password: "",
        confirm_password: "",
        profile_picture: null
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Incorrect email format').required('Email is required'),
        password: Yup.string().required('Password is required'),
        confirm_password: Yup.string().required('Confirm password is required'),
        profile_picture: Yup.mixed().nullable().test("fileType", "Uploaded profile picture should be .jpg or png", (value) => {
            if (value === null) {
                console.log("Empty profile picture")
            } else {
                console.log(value)
                console.log(value.type)
            }
            
            // if (value === null) {
            //     return false;
            // }

            // const fileType = value.type;
            // return fileType === 'image/png' || fileType === 'image/jpg';
        })
    });

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {formik => (
                <VStack 
                    as='form'
                    onSubmit={formik.handleSubmit}
                >

                    <FormControl isInvalid={formik.errors.name && formik.touched.name} isRequired>
                        <FormLabel>Name</FormLabel>
                        <Field 
                            as={Input} 
                            name="name" 
                            type="text" 
                            placeholder="Name"
                            {...formik.getFieldProps('name')}    
                        />
                        <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={formik.errors.email && formik.touched.email} isRequired>
                        <FormLabel>Email Address</FormLabel>
                        <Field 
                            as={Input} 
                            name="email" 
                            type="email" 
                            placeholder="Email"
                            {...formik.getFieldProps('email')}    
                        />
                        <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={formik.errors.password && formik.touched.password} isRequired>
                        <FormLabel>Password</FormLabel>
                        <Field 
                            as={Input} 
                            name="password" 
                            type="text" 
                            placeholder="Password"
                            {...formik.getFieldProps('password')}    
                        />
                        <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={formik.errors.confirm_password && formik.touched.confirm_password} isRequired>
                        <FormLabel>Confirm Password</FormLabel>
                        <Field 
                            as={Input} 
                            name="confirm_password" 
                            type="text" 
                            placeholder="Confirm Password"
                            {...formik.getFieldProps('confirm_password')}    
                        />
                        <FormErrorMessage>{formik.errors.confirm_password}</FormErrorMessage>
                    </FormControl>

                    <FormControl>
                        <FormLabel>Profile Picture</FormLabel>
                        <Field 
                            name="profile_picture"
                            type="file"
                            onChange={(event) => {
                                const selectedFile = event.currentTarget.files[0];
                                formik.setFieldValue('profile_picture', selectedFile)
                            }}
                            {...formik.getFieldProps('profile_picture')}
                        />
                        <FormErrorMessage>{formik.errors.profile_picture}</FormErrorMessage>
                    </FormControl>

                    
                    <Button type="submit">
                        Create Account
                    </Button>
                </VStack>
            )}
            
        </Formik>
    );
}

export default Signup
