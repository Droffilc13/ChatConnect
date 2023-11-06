import { Button, FormControl, FormLabel, Input, VStack, Heading, FormErrorMessage } from "@chakra-ui/react";
import { Formik } from 'formik';
import * as Yup from 'yup';

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
                    <Heading> Login </Heading>

                    <FormControl isInvalid={formik.errors.email && formik.touched.email}>
                        <FormLabel>Email Address</FormLabel>
                        <Input 
                            name="email" 
                            type="email" 
                            value={formik.values.email} 
                            placeholder="Email Address"
                            {...formik.getFieldProps("email")}
                        />
                        <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={formik.errors.password && formik.touched.password}>
                        <FormLabel>Password</FormLabel>
                        <Input 
                            name="password" 
                            type="password" 
                            value={formik.values.password}
                            placeholder="Password"
                            {...formik.getFieldProps("password")} 
                        />
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
