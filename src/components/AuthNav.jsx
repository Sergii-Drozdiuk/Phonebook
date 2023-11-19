import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Link = styled(NavLink)`
  &.active {
    color: orange;
  }
`;

export const AuthNav = () => {
  return (
    <div className='flex items-center gap-3'>
      <Link
        to='/register'
        className={
          'text-white hover:scale-105 hover:text-orange-400 hover:underline focus:scale-105  focus:text-orange-400 focus:underline'
        }
      >
        Register
      </Link>
      <Link
        to='/login'
        className={
          'text-white hover:scale-105 hover:text-orange-400 hover:underline focus:scale-105  focus:text-orange-400 focus:underline'
        }
      >
        Login
      </Link>
    </div>
  );
};
