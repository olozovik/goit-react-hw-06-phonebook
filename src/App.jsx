import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import toast, { Toaster } from 'react-hot-toast';
import { ContactForm } from './components/ContactForm/ContactForm';
import { ContactList } from './components/ContactList/ContactList';
import { Filter } from './components/Filter/Filter';
import { Wrapper } from 'components/Wrapper/Wrapper';
import { getContactsFromJSON } from './utils/getContactsFromJSON';

const App = () => {
  const [contacts, setContacts] = useState(() =>
    getContactsFromJSON('contacts'),
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleOnSubmit = e => {
    e.preventDefault();
    const name = e.target.elements.name.value;
    const number = e.target.elements.number.value;

    const isContactExisting = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase(),
    );
    if (isContactExisting) {
      toast.error(`${name} is already in contacts.`);
      return;
    }

    const newContact = {
      id: uuidv4(),
      name,
      number,
    };
    setContacts([...contacts, newContact]);
  };

  const handleOnClickDelete = e => {
    const newContactsList = contacts.filter(contact => {
      return contact.name !== e.target.dataset.name;
    });
    setContacts(newContactsList);
  };

  const handleFilterInput = e => {
    const value = e.target.value;
    setFilter(value);
  };

  const contactsToRender = !filter
    ? contacts
    : contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase()),
      );

  const unsuccessfulFiltering = filter && contactsToRender.length === 0;
  const contactsListIsEmpty = !filter && contactsToRender.length === 0;

  return (
    <Wrapper>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleOnSubmit} contacts={contacts} />
      <h2>Contacts</h2>
      <Filter inputValue={filter} onChange={handleFilterInput} />
      <ContactList contacts={contactsToRender} onClick={handleOnClickDelete} />
      {unsuccessfulFiltering && <p>There are no contacts with this name.</p>}
      {contactsListIsEmpty && <p>There are no contacts here.</p>}
      <Toaster />
    </Wrapper>
  );
};

export { App };
