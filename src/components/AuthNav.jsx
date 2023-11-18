import { NavLink } from 'react-router-dom';

export const AuthNav = () => {
  return (
    <div className='flex items-center gap-3'>
      <NavLink to='/register' className={'text-white'}>
        Register
      </NavLink>
      <NavLink to='/login' className={'text-white'}>
        Log In
      </NavLink>
    </div>
  );
};
