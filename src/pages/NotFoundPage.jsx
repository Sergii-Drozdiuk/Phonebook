import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className='mt-3 text-center'>
      Sorry, this page does not exist. Please follow this link to the
      <Link to='/'>
        <span className='text-blue-500'> home page</span>
      </Link>
      .
    </div>
  );
}
