import { useDispatch } from 'react-redux';
import { logOut } from '../redux/auth/operations';
import { useAuth } from '../hooks/useAuth';
import Avatar from '@mui/material/Avatar';

export const UserMenu = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  function stringToColor(string) {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        width: 24,
        height: 24,
      },
      children: `${name.split(' ')[0][0]}`,
    };
  }

  return (
    <div className='flex items-center gap-3 text-white'>
      <p className='hidden sm:block'>Welcome, {user.name}</p>

      <Avatar {...stringAvatar(user.name)} />

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
