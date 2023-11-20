import {
  PiUserCircleMinusDuotone,
  PiUserFocusDuotone,
  PiUserCircleDuotone,
  PiPhoneDuotone,
  PiUserSwitchDuotone,
} from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { selectVisibleContacts } from '../redux/contacts/selectors';
import { delContact } from '../redux/contacts/operations';
import { fetchContacts } from '../redux/contacts/operations';

export const ContactList = () => {
  const dispatch = useDispatch();
  const visibleContacts = useSelector(selectVisibleContacts);
  const [contacts, setContacts] = useState(visibleContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const deleteContact = (id, name) => {
    toast.success(`${name} has been successfully deleted from your contacts`);
    dispatch(delContact(id)).then(() => {
      const updatedContacts = contacts.filter(contact => {
        contact.id !== id;
      });
      setContacts(updatedContacts);
    });
  };

  return (
    <ul className='sm:max-h-[70vh] overflow-y-auto scrollbar-none'>
      {visibleContacts.length ? (
        visibleContacts.map(({ id, name, number }) => (
          <li
            key={id}
            className='mb-2 py-1 border rounded border-grey hover:border-black flex items-center justify-around gap-2'
          >
            <PiUserFocusDuotone style={{ fontSize: '50px' }} />
            <div className='w-3/5'>
              <span className='flex overflow-hidden'>
                <PiUserCircleDuotone style={{ fontSize: '20px', marginRight: '8px' }} /> {name}
              </span>
              <span className='flex overflow-hidden '>
                <PiPhoneDuotone style={{ fontSize: '20px', marginRight: '8px' }} /> {number}
              </span>
            </div>
            <div className='flex flex-col gap-1'>
              <button
                type='button'
                // onClick={}
                className='flex rounded-lg bg-orange-400 border border-grey px-2 py-[2px] hover:bg-orange-500 hover:border-black focus:bg-orange-500'
              >
                <PiUserSwitchDuotone />
              </button>
              <button
                type='button'
                onClick={() => deleteContact(id, name)}
                className='flex rounded-lg bg-red-400 border border-grey px-2 py-[2px] hover:bg-red-500 hover:border-black focus:bg-red-500'
              >
                <PiUserCircleMinusDuotone />
              </button>
            </div>
          </li>
        ))
      ) : (
        <p className='text-center'>Contacts not found</p>
      )}
    </ul>
  );
};
