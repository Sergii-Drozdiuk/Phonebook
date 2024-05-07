import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { logOut } from '../redux/auth/operations';

export const HomePage = () => {
  const { isLoggedIn } = useAuth();
  const dispatch = useDispatch();
  return (
    <div className="flex min-h-[calc(100vh-112px)] flex-col justify-between bg-[url('/Phone_with_phonebook.png')] bg-contain bg-center bg-no-repeat p-4">
      <div>
        <h1 className='m-auto text-center max-[767px]:text-2xl max-[375px]:text-xl min-[768px]:text-3xl'>
          This is PhoneBook app for your contacts.
        </h1>
        <p className='m-auto mt-3 text-center max-[767px]:text-xl max-[375px]:text-lg min-[768px]:text-2xl'>
          Keep your contacts safe!
        </p>
      </div>
      <div>
        {!isLoggedIn ? (
          <p className='m-auto mt-3 text-center max-[767px]:text-xl max-[375px]:text-lg min-[768px]:text-2xl'>
            Please
            <Link to='/register' className='mx-2 text-blue-500 hover:underline focus:underline'>
              register
            </Link>
            to get started use this app. <br /> Already have an account?
            <Link to='/login' className='mx-2 text-blue-500 hover:underline focus:underline'>
              Sign In!
            </Link>
          </p>
        ) : (
          <p className='mt-3 text-center max-[767px]:text-xl max-[375px]:text-lg min-[768px]:text-2xl'>
            Would you like to log in to another account?
            <button
              type='button'
              onClick={() => dispatch(logOut())}
              className='mx-2 text-blue-500 hover:underline focus:underline'
            >
              Logout
            </button>
          </p>
        )}
      </div>
    </div>
  );
};
