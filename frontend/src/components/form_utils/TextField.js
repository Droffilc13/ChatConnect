import { Field } from 'formik';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from '@chakra-ui/react';

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

export default TextField;