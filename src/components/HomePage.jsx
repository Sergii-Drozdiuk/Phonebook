import Link from '@mui/material/Link';
import homeImage from '../Images/Bg.webp';

export const HomePage = () => {
  return (
    <div>
      <img src={homeImage} alt='Welcome' />
      <p className='mt-3 text-l text-center'>
        Already have an account?
        <Link href='/login' variant='body2' sx={{ mx: 1 }}>
          Sign in
        </Link>
        or
        <Link href='/register' variant='body2' sx={{ mx: 1 }}>
          register.
        </Link>
      </p>
    </div>
  );
};
