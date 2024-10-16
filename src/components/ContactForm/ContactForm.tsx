import { useState } from 'react';
import style from './ContactForm.module.css';

interface Props {
  creationContact: (name: string, number: string) => void;
}

export default function ContactForm({ creationContact }: Props) {
  const [name, setName] = useState<string>('');
  const [number, setNumber] = useState<string>('');

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
    }
  };

  const submitForm = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    creationContact(name, number);

    resetForm();
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={submitForm} className={style.form}>
      <div className={style.formInputWrapper}>
        <label htmlFor="name">Name </label>
        <input
          id="name"
          onChange={handleChange}
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </div>
      <div className={style.formInputWrapper}>
        <label htmlFor="number">Number</label>
        <input
          id="number"
          onChange={handleChange}
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </div>

      <button type="submit">Add Contact</button>
    </form>
  );
}
