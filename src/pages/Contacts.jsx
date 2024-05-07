import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { selectError, selectIsLoading } from '../redux/contacts/selectors';
import { ContactForm } from '../components/ContactForm';
import { EditContactForm } from '../components/EditContactForm';
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
  const isEdit = useSelector(state => state.edit.isEdit);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className='m-auto min-h-[calc(100vh-112px)] sm:flex sm:justify-center sm:gap-2'>
      {isLoading && <Loader />}
      <div className='min-w-[280px] rounded-lg border bg-white bg-clip-border p-3 w-full'>
        <ContactForm />
        {isEdit && <EditContactForm />}
      </div>
      <div className='mt-2 min-w-[280px] rounded-lg border bg-white bg-clip-border p-3 max-[768px]:min-h-[calc(100vh-415px)] w-full sm:mt-0'>
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
