import { useEffect, useState, useRef } from 'react';
import { nanoid } from 'nanoid';
import style from './App.module.css';

import IContact from '../interfaces/Contact.interface';

import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import Notification from './Notification/Notification';

const CONTACTS: string = 'contacts';

export default function App() {
  const [contacts, setContacts] = useState<IContact[]>(() => {
    const localContacts = window.localStorage.getItem(CONTACTS);
    return localContacts ? JSON.parse(localContacts) : [];
  });
  const [filter, setFilter] = useState<string>('');
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    window.localStorage.setItem(CONTACTS, JSON.stringify(contacts));
  }, [contacts]);

  const creationContact = (name: string, number: string) => {
    const contact: IContact = {
      name: name,
      number: number,
      id: nanoid(),
    };

    if (contacts.some((contact: IContact) => contact.name === name)) {
      alert(`${name} is already in contacts`);
      return;
    }

    setContacts(prevContacts => [...prevContacts, contact]);
  };

  const handleFilter = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.currentTarget;

    setFilter(value);
  };

  const deleteContact = (contactID: string) => {
    setContacts([...contacts].filter(({ id }) => id !== contactID));
  };

  const getVisibleContacts = (() => {
    const normalizedFilter = filter.toLowerCase();

    return [...contacts].filter(({ name }) => {
      return (name as string).toLowerCase().includes(normalizedFilter);
    });
  })();

  return (
    <div className={style.app}>
      <h1 className={style.title}>Phonebook</h1>
      <ContactForm creationContact={creationContact} />
      <h2 className={style.title}>Contacts</h2>
      <Filter filter={filter} handleFilter={handleFilter} />
      {getVisibleContacts.length > 0 ? (
        <ContactList contacts={getVisibleContacts} deleteContact={deleteContact} />
      ) : (
        <Notification notice={'Not contacts found'} />
      )}
    </div>
  );
}
