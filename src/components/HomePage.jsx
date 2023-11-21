import { Link } from 'react-router-dom';
import homeImage from '../Images/Bg.webp';
import { useAuth } from '../hooks/useAuth';

export const HomePage = () => {
  const { isLoggedIn } = useAuth();
  return (
    <div className='relative'>
      <img src={homeImage} alt='Welcome' loading='lazy' className='w-full h-full' />
      {!isLoggedIn ? (
        <p className='mt-3 text-white sm:text-xl text-center absolute bottom-0.5 sm:bottom-2 left-5 max-[800px]:text-sm max-[405px]:text-xs max-[375px]:text-[10px]'>
          Already have an account?
          <Link to='/login' className='text-blue-500 mx-2'>
            Sign In
          </Link>
          or
          <Link to='/register' className='text-blue-500 mx-2'>
            register.
          </Link>
        </p>
      ) : (
        ''
      )}
    </div>
  );
};
