import React from 'react';

import css from '../ContactList/ContactList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/contactsSlice';
import { getContacts, getFilter } from 'redux/selectors';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const getVisibleContact = () => {
    return contacts?.filter(contact =>
      contact?.name?.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const visibleContact = getVisibleContact();

  return (
    <ul className={css.list}>
      {visibleContact.map(({ id, name, number }) => (
        <li key={id} className={css.item}>
          {name + ' : ' + number}
          <button
            type="button"
            name="delete"
            onClick={() => dispatch(deleteContact(id))}
            className={css.button}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
