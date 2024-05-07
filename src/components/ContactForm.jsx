import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { PiUserCirclePlusLight, PiUserCircleLight, PiPhoneLight } from 'react-icons/pi';
import { selectContacts } from '../redux/contacts/selectors';
import { addContact } from '../redux/contacts/operations';
import { useContactsFormValidation } from '../hooks/useContactFormValidation';
import toast from 'react-hot-toast';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export const ContactForm = () => {
  const dispatch = useDispatch();

  const contacts = useSelector(selectContacts);
  const { handleSubmit, reset, registerName, registerNumber, errorMessage } =
    useContactsFormValidation();

  const onSubmit = ({ name, number }) => {
    const nameExists = contacts.some(
      contact => contact.name.trim().toLowerCase() === name.trim().toLowerCase()
    );
    const numberExists = contacts.some(contact => contact.number === number);
    if (nameExists) {
      toast.error(`${name}' is already in contacts.`);
    } else if (numberExists) {
      toast.error(`${number}' is already in contacts.`);
    } else {
      dispatch(addContact({ id: nanoid(), name, number }));
      toast.success(`${name} has been successfully added to your contacts`);
      reset();
    }
  };

  return (
    <>
      <h1 className='mb-4 flex items-center justify-center gap-2 text-2xl'>
        <img src='./phonebook.svg' width={24} height={24} alt='logo' loading='lazy' />
        Phonebook
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center gap-3'>
        <label className='flex flex-col items-center gap-2'>
          <div className='flex flex-row items-center gap-2'>
            <PiUserCircleLight />
            <TextField
              {...registerName}
              name='name'
              type='text'
              className='rounded-lg pl-2 text-black'
              label='User name'
            />
          </div>
          <span className='text-red-500 text-center'>{errorMessage('name')}</span>
        </label>
        <label className='flex flex-col items-center gap-2'>
          <div className='flex flex-row items-center gap-2'>
            <PiPhoneLight />
            <TextField
              {...registerNumber}
              name='number'
              type='tel'
              className='rounded-lg pl-2 text-black'
              label='Phone number'
            />
          </div>
          <span className='text-red-500 text-center'>{errorMessage('number')}</span>
        </label>
        <Button
          type='submit'
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
          className='flex items-center justify-center gap-1'
        >
          <PiUserCirclePlusLight />
          Add contact
        </Button>
      </form>
    </>
  );
};
