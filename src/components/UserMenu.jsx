import { useDispatch } from 'react-redux';
import { logOut } from '../redux/auth/operations';
import { useAuth } from '../hooks/useAuth';

export const UserMenu = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  return (
    <div className='flex gap-3 text-white'>
      <p>Welcome, {user.name}!</p>
      <button
        type='button'
        onClick={() => dispatch(logOut())}
        className='hover:scale-105 hover:underline focus:scale-105 focus:underline active:text-orange'
      >
        Logout
      </button>
    </div>
  );
};
