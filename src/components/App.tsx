import { Component } from 'react';
import { nanoid } from 'nanoid';
import style from './App.module.css';

import IContact from '../interfaces/Contact.interface';

import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import Notification from './Notification/Notification';

interface State {
  contacts: IContact[];
  filter: string;
}

const CONTACTS: string = 'contacts';

class App extends Component<{}, State> {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount(): void {
    const localContacts = localStorage.getItem(CONTACTS);

    if (localContacts) {
      this.setState({ contacts: JSON.parse(localContacts) });
    }
  }

  componentDidUpdate(prevState: State): void {
    const { contacts } = this.state;

    if (prevState.contacts !== contacts) {
      localStorage.setItem(CONTACTS, JSON.stringify(contacts));
    }
  }

  creationContact = (name: string, number: string) => {
    const contact: IContact = {
      name: name,
      number: number,
      id: nanoid(),
    };

    if (this.state.contacts.some((contact: IContact) => contact.name === name)) {
      alert(`${name} is already in contacts`);
      return;
    }

    this.setState(prev => ({
      contacts: [...prev.contacts, contact],
    }));
  };

  handleFilter = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.currentTarget;

    this.setState({ filter: value });
  };

  deleteContact = (contactID: string) => {
    this.setState(prevEvent => ({
      contacts: prevEvent.contacts.filter(({ id }) => id !== contactID),
    }));
  };

  getVisibleContacts = () => {
    const normalizedFilter = this.state.filter.toLowerCase();

    return this.state.contacts.filter(({ name }) => {
      return (name as string).toLowerCase().includes(normalizedFilter);
    });
  };

  render() {
    const visibleContacts = this.getVisibleContacts();

    return (
      <div className={style.app}>
        <h1 className={style.title}>Phonebook</h1>
        <ContactForm creationContact={this.creationContact} />
        <h2 className={style.title}>Contacts</h2>
        <Filter filter={this.state.filter} handleFilter={this.handleFilter} />
        {visibleContacts.length > 0 ? (
          <ContactList contacts={visibleContacts} deleteContact={this.deleteContact} />
        ) : (
          <Notification notice={'Not contacts found'} />
        )}
      </div>
    );
  }
}

export default App;
