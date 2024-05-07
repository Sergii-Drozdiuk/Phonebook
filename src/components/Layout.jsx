import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AppBar } from './AppBar';
import { Suspense } from 'react';
import { Footer } from './Footer';

export const Layout = () => {
  return (
    <div className='min-w-[280px] px-2 min-[425px]:w-[365px] sm:w-auto sm:max-w-[730px] m-auto'>
      <AppBar />
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
      <Footer />
      <Toaster position='top-right' reverseOrder={false} />
    </div>
  );
};
