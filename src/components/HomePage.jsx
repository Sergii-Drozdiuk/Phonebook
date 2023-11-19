import { Link } from 'react-router-dom';
import homeImage from '../Images/Bg.webp';

export const HomePage = () => {
  return (
    <div>
      <img src={homeImage} alt='Welcome' />
      <p className='mt-3 text-l text-center'>
        Already have an account?
        <Link to='/login' className='text-blue-500 mx-2'>
          Sign In
        </Link>
        or
        <Link href='/register' className='text-blue-500 mx-2'>
          register.
        </Link>
      </p>
    </div>
  );
};
