import { useSelector } from 'react-redux';
import { selectError } from '../redux/contacts/selectors';
import toast from 'react-hot-toast';

export const Error = () => {
  const error = useSelector(selectError);
  toast.warning(`${error.message}`);
  return (
    <div>
      <p className='text-lg text-red-500'>Something went wrong, try reload the page.</p>
    </div>
  );
};
