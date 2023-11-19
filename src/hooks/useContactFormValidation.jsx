import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object({
  name: yup
    .string()
    .min(2, 'Too Short!')
    .matches(
      /^[a-zA-Zа-яА-Я]+([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*$/,
      'Name may contain only letters, apostrophe, dash, and spaces.'
    )
    .required('Name is required'),
  number: yup
    .string()
    .matches(
      /^\+?\d{1,4}?[ .\-s]?(\(\d{1,3}?\))?([ .\-s]?\d{1,4}){1,4}$/,
      'Phone number must be digits and can contain spaces, dashes, parentheses, and can start with +'
    )
    .required('Phone number is required')
    .min(9, 'Please enter at least 9 digits'),
});

export const useContactsFormValidation = () => {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({ reValidateMode: 'onChange', resolver: yupResolver(schema) });

  const errorMessage = field =>
    errors[field] && <small className='p-error mt-2'>{errors[field]?.message}</small>;

  const registerName = register('name');

  const registerNumber = register('number');

  return { handleSubmit, reset, registerName, registerNumber, errorMessage };
};
