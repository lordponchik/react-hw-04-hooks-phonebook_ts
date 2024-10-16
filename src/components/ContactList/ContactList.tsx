import IContact from '../../interfaces/Contact.interface';
import style from './ContactList.module.css';
import ContactListItem from '../ContactListItem/ContactListItem';

interface IContacts {
  contacts: IContact[];
  deleteContact(id: string): void;
}

const ContactList = ({ contacts, deleteContact }: IContacts) => {
  return (
    <ul className={style.contacts}>
      {contacts.map(contact => {
        return <ContactListItem key={contact.id} contact={contact} deleteContact={deleteContact} />;
      })}
    </ul>
  );
};

export default ContactList;
