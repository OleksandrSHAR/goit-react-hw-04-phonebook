import { nanoid } from 'nanoid';
import { Forms } from './Phonebook/Form/Form';
import { ContactList } from './Phonebook/Contactlist/ContactList';
import { Filter } from './Phonebook/Filter/Filter';
import { GlobalStyle } from 'components/GlobalStyle';
import { Wrap, Titel } from './App.style';
import { useState, useEffect, useMemo } from 'react';
import { toast } from 'react-hot-toast';
const userContacts = () => {
  const saveCont = localStorage.getItem('contacts');
  if (saveCont !== null) {
    return JSON.parse(saveCont);
  } else {
    return [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ];
  }
};
export const App = () => {
  const [contacts, setContacts] = useState(userContacts);
  const [filter, setFilter] = useState('');

  const submitContact = (values, { resetForm }) => {
    const { name, number } = values;
    const newContacts = {
      name: name,
      number: number,
      id: nanoid(),
    };
    if (
      contacts.find(
        contact =>
          contact.name.toLowerCase() === newContacts.name.toLowerCase() ||
          contact.number.toLowerCase() === newContacts.number.toLowerCase()
      )
    ) {
      return (
        toast.error(` Contact ${name} was already entered earlier`), resetForm()
      );
    } else {
      setContacts(prevState => [...prevState, newContacts]);
      resetForm();
    }
  };
  const onDeletContacts = id => {
    setContacts(contacts.filter(contacts => contacts.id !== id));
  };

  const filterForm = e => {
    setFilter(e.currentTarget.value);
  };
  const filterContacts = useMemo(() => {
    return contacts.filter(contacts =>
      contacts.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [filter, contacts]);
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);
  return (
    <Wrap>
      <Titel>Phonebook</Titel>
      <Forms submitContact={submitContact} />
      <Titel>Contacts</Titel>
      <Filter filter={filter} filterForm={filterForm} />
      <ContactList contacts={filterContacts} onDelete={onDeletContacts} />
      <GlobalStyle />
    </Wrap>
  );
};
