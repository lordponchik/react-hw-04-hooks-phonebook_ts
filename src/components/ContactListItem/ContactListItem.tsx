import style from './ContactListItem.module.css';
import IContact from '../../interfaces/Contact.interface';

interface Props {
  contact: IContact;
  deleteContact(id: string): void;
}

const ContactListItem = ({ contact: { name, number, id }, deleteContact }: Props) => {
  return (
    <li className={style.contact}>
      <p>
        {name}: {number}
      </p>
      <button
        type="button"
        onClick={() => {
          deleteContact(id);
        }}
      >
        delete
      </button>
    </li>
  );
};

export default ContactListItem;
