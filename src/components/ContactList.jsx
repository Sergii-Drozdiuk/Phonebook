import {
  PiUserCircleMinusDuotone,
  PiUserRectangleDuotone,
  PiUserCircleDuotone,
  PiPhoneDuotone,
  PiUserSwitchDuotone,
} from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { selectVisibleContacts } from '../redux/contacts/selectors';
import { delContact } from '../redux/contacts/operations';
import { fetchContacts } from '../redux/contacts/operations';

export const ContactList = () => {
  const dispatch = useDispatch();
  const visibleContacts = useSelector(selectVisibleContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const deleteContact = (id, name) => {
    toast.success(`${name} has been successfully deleted from your contacts`);
    return dispatch(delContact(id));
  };

  return (
    <ul className='sm:max-h-[70vh] overflow-y-auto scrollbar-none'>
      {visibleContacts.length ? (
        visibleContacts.map(({ id, name, number }) => (
          <li
            key={id}
            className='mb-2 py-1 border border-black flex items-center justify-around gap-2'
          >
            <PiUserRectangleDuotone style={{ fontSize: '50px' }} />
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
                className='flex rounded-lg bg-orange-300 border border-black px-2 py-[2px] hover:bg-orange-500 active:bg-orange-500'
              >
                <PiUserSwitchDuotone />
              </button>
              <button
                type='button'
                onClick={() => deleteContact(id, name)}
                className='flex rounded-lg bg-rose-300 border border-black px-2 py-[2px] hover:bg-rose-500 active:bg-rose-500'
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
