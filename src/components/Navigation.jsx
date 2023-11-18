import { NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import styled from 'styled-components';

const Link = styled(NavLink)`
  &.active {
    color: orange;
  }
`;

export const Navigation = () => {
  const { isLoggedIn } = useAuth();

  return (
    <nav className='flex gap-3 text-white'>
      <Link to='/' className='hover:scale-105 hover:underline focus:scale-105 focus:underline'>
        Home
      </Link>
      {isLoggedIn && (
        <Link
          to='/contacts'
          className='hover:scale-105 hover:underline focus:scale-105 focus:underline'
        >
          Contacts
        </Link>
      )}
    </nav>
  );
};
