import { Button, FormControl, FormLabel, Input, VStack, Heading, FormErrorMessage } from "@chakra-ui/react";
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Login = () => {
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().required('Email Address is required').email("Incorrect email format"),
            password: Yup.string().required('Password is required').min(4, 'Password is too short').max(12, 'Password is too long'),
        }),
        onSubmit: (values, actions) => {
            alert(JSON.stringify(values, null, 29))
            actions.resetForm();
        },

    })

    return (
        <VStack
            as="form"
            justifyContent={"center"}    
            onSubmit={formik.handleSubmit}
        >
            <Heading> Login </Heading>

            <FormControl isInvalid={formik.errors.email && formik.touched.username}>
                <FormLabel>Email Address</FormLabel>
                <Input 
                    name="email" 
                    type="email" 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email} 
                    placeholder="Email Address"/>
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={formik.errors.password && formik.touched.password}>
                <FormLabel>Password</FormLabel>
                <Input 
                    name="password" 
                    type="password" 
                    onChange={formik.handleChange} 
                    onBlur={formik.handleBlur}
                    value={formik.values.password} 
                    placeholder="Password" />
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
            </FormControl>

            <Button type="submit">
                Login
            </Button>
        </VStack>
    )
    
}

export default Login;