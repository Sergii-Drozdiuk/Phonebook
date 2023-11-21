import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { selectError, selectIsLoading } from '../redux/contacts/selectors';
import { ContactForm } from '../components/ContactForm';
import { Filter } from '../components/Filter';
import { ContactList } from '../components/ContactList';
import { Loader } from '../components/Loader';
import { Error } from '../components/Error';
import { fetchContacts } from '../redux/contacts/operations.jsx';
import { PiAddressBookFill } from 'react-icons/pi';

export default function Contacts() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className='m-auto sm:flex sm:justify-center sm:gap-2'>
      {isLoading && <Loader />}
      <div className='min-w-[240px] rounded-lg border p-3 min-[375px]:w-[365px]'>
        <h1 className='mb-4 flex items-center justify-center gap-2 text-2xl'>
          <img src='./phonebook.svg' width={24} height={24} alt='logo' />
          Phonebook
        </h1>
        <ContactForm />
      </div>
      <div className='min-w-[240px] rounded-lg border p-3 mt-2 min-[375px]:w-[365px] sm:mt-0'>
        <h2 className='mb-4 flex items-center justify-center gap-2 text-2xl'>
          <PiAddressBookFill width={24} height={24} />
          Contacts
        </h2>
        {error && <Error />}
        <Filter />
        <ContactList />
      </div>
    </div>
  );
}
