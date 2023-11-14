import React, { useEffect } from 'react';
import {
  getContacts,
  selectLoading,
  selectError,
} from 'components/redux/sliceContacts';
import { StyledList, StyledEl } from './Phonebook.styled';
import { useDispatch, useSelector } from 'react-redux';
import { getFilter } from 'components/redux/sliceFilter';
import { fetchDeleteContacts } from 'services/api';
import { PulseLoader } from 'react-spinners';

export const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  const inlineStyle = { marginLeft: '15px', cursor: 'pointer' };

  const handleDelete = id => {
    dispatch(fetchDeleteContacts(id));
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    if (error) {
      return error.message;
    }
  }, [error]);

  if (loading) {
    return <PulseLoader color="#36d7b7" />;
  }
  if (filteredContacts?.length) {
    return (
      <StyledList>
        {filteredContacts.map(contact => (
          <StyledEl key={contact.id}>
            {contact.name} : {contact.phone}
            <button
              onClick={() => handleDelete(contact.id)}
              style={inlineStyle}
            >
              Delete
            </button>
          </StyledEl>
        ))}
      </StyledList>
    );
  }
};
