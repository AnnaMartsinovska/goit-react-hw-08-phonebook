import React, { useState } from 'react';
import {
  StyledForm,
  StyledText,
  StyledInput,
  StyledButton,
} from './Phonebook.styled';

import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { getContacts } from 'redux/sliceContacts';
import { fetchAddContacts } from 'services/api';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const handleChangeInput = e => {
    const { target } = e;
    const { value, name } = target;

    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const handleOnSubmit = e => {
    e.preventDefault();

    const contact = {
      id: nanoid(),
      name: name.trim(),
      number: number.trim(),
    };

    if (!name.trim()) {
      return;
    }

    handleAddContacts(contact);

    setName('');
    setNumber('');

    e.target.reset();
  };

  const handleAddContacts = contact => {
    const copy = contacts.find(item => item.name === contact.name);

    copy
      ? alert(`${contact.name} is already in contacts.`)
      : dispatch(fetchAddContacts(contact));
  };

  return (
    <StyledForm onSubmit={handleOnSubmit}>
      <StyledText>Name</StyledText>
      <StyledInput
        onChange={handleChangeInput}
        type="text"
        name="name"
        required
        value={name}
      />
      <StyledText>Number</StyledText>
      <StyledInput
        onChange={handleChangeInput}
        type="tel"
        name="number"
        required
        value={number}
      />
      <StyledButton disabled={!name} type="submit">
        Add contact
      </StyledButton>
    </StyledForm>
  );
};
