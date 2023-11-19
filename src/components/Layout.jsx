import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AppBar } from './AppBar';
import { Suspense } from 'react';

export const Layout = () => {
  return (
    <div className='min-w-[240px] min-[375px]:w-[365px] sm:w-auto sm:max-w-[730px] m-auto'>
      <AppBar />
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
      <Toaster position='top-right' reverseOrder={false} />
    </div>
  );
};
