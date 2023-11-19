import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

const schema = yup.object({
  name: yup
    .string()
    .trim()
    .min(2, 'Too Short!')
    .matches(
      /^[a-zA-Zа-яА-Я]+([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*$/,
      'Name may contain only letters, apostrophe, dash, and spaces.'
    )
    .required('Name is required'),
  email: yup.string().trim().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .trim()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

export const useRegisterFormValidation = () => {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({ reValidateMode: 'onChange', resolver: yupResolver(schema) });

  const errorMessage = field =>
    errors[field] && <small className='text-red-500 mt-1'>{errors[field]?.message}</small>;

  const registerName = register('name');

  const registerEmail = register('email');

  const registerPassword = register('password');

  return { handleSubmit, reset, registerName, registerEmail, registerPassword, errorMessage };
};
