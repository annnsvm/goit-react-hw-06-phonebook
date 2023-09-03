import { useState } from 'react';
import { getContacts } from 'redux/selectors';
import { nanoid } from 'nanoid';
import css from '../ContactForm/ContactForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contactsSlice';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const nameInputId = nanoid();
  const numberInputId = nanoid();

  const handleChange = event => {
    const { name, value } = event.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    const contact = {
      name,
      number,
      id: nanoid(),
    };

    const isExist = contacts?.find(
      contact =>
        contact?.name?.toLowerCase().trim() === name.toLowerCase().trim()
    );
    if (isExist) {
      alert(`${name} is already in contacts.`);
      return;
    }

    dispatch(addContact(contact));
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <label htmlFor={nameInputId} className={css.label}>
        Name
        <input
          className={css.input}
          type="text"
          value={name}
          onChange={handleChange}
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          id={nameInputId}
        />
        Number
        <input
          className={css.input}
          type="tel"
          value={number}
          onChange={handleChange}
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          id={numberInputId}
        />
      </label>
      <button type="submit" className={css.button}>
        Add contact
      </button>
    </form>
  );
}
