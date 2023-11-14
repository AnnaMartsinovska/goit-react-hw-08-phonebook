import React, { useEffect } from 'react';
import {
  StyledTitle,
  StyledText,
  StyledWrap,
} from './Phonebook/Phonebook.styled';
import { ContactForm } from './Phonebook/ContactForm';
import { ContactList } from './Phonebook/ContactList';
import { Filter } from './Phonebook/Filter';
import { useDispatch } from 'react-redux';
import { fetchContacts } from 'services/api';

const Phonebook = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <StyledWrap>
      <StyledTitle>Phonebook</StyledTitle>
      <ContactForm />
      <StyledTitle>Contacts</StyledTitle>
      <StyledText>Find contacts by name</StyledText>
      <Filter />
      <ContactList />
    </StyledWrap>
  );
};

export const App = () => {
  return (
    <div>
      <Phonebook />
    </div>
  );
};
