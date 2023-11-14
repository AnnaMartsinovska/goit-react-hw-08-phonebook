import { StyledInput } from './Phonebook.styled';
import { useDispatch, useSelector } from 'react-redux';
import { filterContacts, getFilter } from 'components/redux/sliceFilter';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);

  return (
    <StyledInput
      onChange={e => dispatch(filterContacts(e.target.value))}
      name="filter"
      placeholder="Enter filter value"
      value={filter}
    />
  );
};
