import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchContacts } from 'services/api';
import { ContactList } from '../ContactList';
import { StyledTitle, StyledText } from '../Phonebook.styled';
import { Filter } from '../Filter';

const Contacts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <StyledTitle>Contacts</StyledTitle>
      <StyledText>Find contacts by name</StyledText>
      <Filter />
      <ContactList />
    </>
  );
};

export default Contacts;
