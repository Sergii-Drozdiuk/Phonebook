import { PiMagnifyingGlassLight } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';
import { changeFilter } from '../redux/filterSlice';
import { selectFilter } from '../redux/selectors';

export const Filter = () => {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  return (
    <label className='mb-2 flex flex-col items-center gap-2'>
      <div className='flex flex-row items-center gap-2'>
        <PiMagnifyingGlassLight />
        <input
          value={filter}
          placeholder='Find contacts by name'
          type='text'
          onChange={e => dispatch(changeFilter(e.target.value))}
          className='rounded-lg pl-2 text-black'
        ></input>
      </div>
    </label>
  );
};
