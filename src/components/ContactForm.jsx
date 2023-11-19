import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import toast from 'react-hot-toast';
import { PiUserCirclePlusLight, PiUserCircleLight, PiPhoneLight } from 'react-icons/pi';
import { selectContacts } from '../redux/contacts/selectors';
import { addContact } from '../redux/contacts/operations';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useContactsFormValidation } from '../hooks/useContactFormValidation';

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
    <form onSubmit={handleSubmit(onSubmit)} className='mb-2 flex flex-col items-center gap-3 py-3'>
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
        {errorMessage('name')}
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
        {errorMessage('number')}
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
  );
};
