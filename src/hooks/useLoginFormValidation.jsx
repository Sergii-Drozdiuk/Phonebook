import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object({
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

export const useLoginFormValidation = () => {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({ reValidateMode: 'onChange', resolver: yupResolver(schema) });

  const errorMessage = field =>
    errors[field] && <small className='text-red-500 mt-1'>{errors[field]?.message}</small>;

  const registerEmail = register('email');

  const registerPassword = register('password');

  return { handleSubmit, reset, registerEmail, registerPassword, errorMessage };
};
