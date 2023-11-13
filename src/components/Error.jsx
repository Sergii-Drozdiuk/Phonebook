import { useSelector } from 'react-redux';
import { selectError } from '../redux/selectors';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const Error = () => {
  const error = useSelector(selectError);
  Notify.warning(`${error.message}`);
  return (
    <div>
      <p className='text-lg text-red-500'>Something went wrong, try reload the page.</p>
    </div>
  );
};
