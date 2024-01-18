import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  VStack,
  Center,
} from '@chakra-ui/react';

const Signup2 = () => {
    const [isLoading, setIsLoading] = useState(false);

  return (
    <Formik
      initialValues={{
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        profilePicture: null,
      }}
      validate={(values) => {
        const errors = {};
        if (!values.username) {
          errors.username = 'Required';
        }
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        if (!values.password) {
          errors.password = 'Required';
        }
        if (values.password !== values.confirmPassword) {
          errors.confirmPassword = 'Passwords do not match';
        }
        const acceptedFormats = ['image/jpeg', 'image/jpg', 'image/png']; // Add more formats if needed
        if (values.profilePicture && !acceptedFormats.includes(values.profilePicture.type)) {
            errors.profilePicture = 'Invalid file format. Please upload a JPEG, PNG, or JPG file.';
        }
        console.log(errors);
        return errors;
      }}
      onSubmit={(values) => {
        // Handle form submission logic here
        setIsLoading(true);
        console.log(values);
        setTimeout(() => setIsLoading(false), 5000);
      }}
    >
      {(formik) => (
        <Form>
          <VStack spacing={4} align="start">
            <Field name="username">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.username && form.touched.username}>
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <Input {...field} id="username" placeholder="Username" />
                  <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="email">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.email && form.touched.email}>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input {...field} id="email" placeholder="Email" />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="password">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.password && form.touched.password}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input {...field} id="password" type="password" placeholder="Password" />
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="confirmPassword">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.confirmPassword && form.touched.confirmPassword}>
                  <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                  <Input {...field} id="confirmPassword" type="password" placeholder="Confirm Password" />
                  <FormErrorMessage>{form.errors.confirmPassword}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="profilePicture">
            {({ form }) => (
                <FormControl isInvalid={form.errors.profilePicture && form.touched.profilePicture}>
                <FormLabel htmlFor="profilePicture">Profile Picture</FormLabel>
                <Input
                    type="file"
                    id="profilePicture"
                    accept="image/*"
                    onChange={(event) => {
                    form.setFieldValue('profilePicture', event.currentTarget.files[0]);
                    }}
                />
                <FormErrorMessage>{form.errors.profilePicture}</FormErrorMessage>
                </FormControl>
            )}
            </Field>


            <Button alignItems="center" colorScheme="teal" type="submit" isLoading={isLoading}>
              Sign Up
            </Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

export default Signup2;
