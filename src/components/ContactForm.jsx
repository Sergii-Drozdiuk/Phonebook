import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { PiUserCirclePlusLight, PiUserCircleLight, PiPhoneLight } from 'react-icons/pi';
import { selectContacts } from '../redux/selectors';
import { addContact } from '../redux/operations';

const schema = Yup.object({
  name: Yup.string()
    .min(2, 'Too Short!')
    .matches(
      /^[a-zA-Zа-яА-Я]+([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*$/,
      'Name may contain only letters, apostrophe, dash, and spaces.'
    )
    .required('This is a required field'),
  phone: Yup.string()
    .matches(
      /^\+?\d{1,4}?[ .\-s]?(\(\d{1,3}?\))?([ .\-s]?\d{1,4}){1,4}$/,
      'Phone number must be digits and can contain spaces, dashes, parentheses, and can start with +'
    )
    .required('This is a required field')
    .min(9, 'Please enter at least 9 characters'),
});

export const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const onSubmit = ({ name, phone }) => {
    const nameExists = contacts.some(
      contact => contact.name.trim().toLowerCase() === name.trim().toLowerCase()
    );
    const numberExists = contacts.some(contact => contact.phone === phone);
    if (nameExists) {
      Notify.warning(`${name}' is already in contacts.`);
    } else if (numberExists) {
      Notify.warning(`${phone}' is already in contacts.`);
    } else {
      dispatch(addContact({ id: nanoid(), name, phone }));
      Notify.success(`${name} has been successfully added to your contacts`);
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='mb-2 flex flex-col items-center gap-3 py-3'>
      <label className='flex flex-col items-center gap-2'>
        <div className='flex flex-row items-center gap-2'>
          <PiUserCircleLight />
          <input
            {...register('name')}
            name='name'
            type='text'
            className='rounded-lg pl-2 text-black'
            placeholder='User name'
          />
        </div>
        <p>{errors.name?.message}</p>
      </label>
      <label className='flex flex-col items-center gap-2'>
        <div className='flex flex-row items-center gap-2'>
          <PiPhoneLight />
          <input
            {...register('phone')}
            name='phone'
            type='tel'
            className='rounded-lg pl-2 text-black'
            placeholder='Phone number'
          />
        </div>
        <p>{errors.phone?.message}</p>
      </label>
      <button
        type='submit'
        className='flex items-center justify-center gap-1 rounded-lg bg-emerald-500 px-2 py-[2px] hover:bg-emerald-700 active:bg-emerald-700'
      >
        <PiUserCirclePlusLight />
        Add contact
      </button>
    </form>
  );
};
