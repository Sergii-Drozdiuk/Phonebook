import { Vortex } from 'react-loader-spinner';

export const Loader = () => (
  <div className='z-50 fixed left-1/2 top-1/3 translate-x-1/3 translate-y-1/3'>
    <Vortex
      visible={true}
      height='100'
      width='100'
      ariaLabel='vortex-loading'
      wrapperClass='vortex-wrapper'
      colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
    />
  </div>
);
