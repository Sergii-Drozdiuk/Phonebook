import { useEditFormValidation } from '../hooks/useEditFormValidation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, updateContact } from '../redux/contacts/operations';
import { clearSelectedContact, setIsEdit, updateContactSuccess } from '../redux/contacts/editSlice';
import { selectContacts, selectedContact } from '../redux/contacts/selectors';
import { PiPenThin, PiUserCircleLight, PiPhoneLight, PiPenFill } from 'react-icons/pi';
import toast from 'react-hot-toast';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export const EditContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const { handleSubmit, reset, editName, editNumber, errorMessage } = useEditFormValidation();
  const { id, name, number } = useSelector(selectedContact);
  const onSubmit = ({ name, number }) => {
    const nameExists = contacts
      .filter(contact => contact.name.trim().toLowerCase() !== name.trim().toLowerCase())
      .some(contact => contact.name.trim().toLowerCase() === name.trim().toLowerCase());
    const numberExists = contacts
      .filter(contact => contact.number.trim().toLowerCase() !== number.trim().toLowerCase())
      .some(contact => contact.number === number);
    if (nameExists) {
      toast.error(`${name}' is already in contacts.`);
    } else if (numberExists) {
      toast.error(`${number}' is already in contacts.`);
    } else {
      const updateContactAction = dispatch(updateContact({ id, name, number }));

      updateContactAction.then(response => {
        if (response.payload) {
          dispatch(updateContactSuccess(response.payload));
          toast.success(`${name} has been successfully updated.`);
          reset();
          dispatch(clearSelectedContact());
          dispatch(setIsEdit(false));
          dispatch(fetchContacts());
        } else {
          toast.error('Error updating contact.');
        }
      });
    }
  };

  return (
    <>
      <h2 className='mb-4 flex items-center justify-center gap-2 text-2xl'>
        <PiPenFill width={24} height={24} />
        Edit contact
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center gap-3'>
        <label className='flex flex-col items-center gap-2'>
          <div className='flex flex-row items-center gap-2'>
            <PiUserCircleLight />
            <TextField
              {...editName}
              defaultValue={name}
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
              {...editNumber}
              defaultValue={number}
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
          <PiPenThin />
          Edit contact
        </Button>
      </form>
    </>
  );
};
