import { Component } from 'react';
import style from './ContactForm.module.css';

interface State {
  name: string;
  number: string;
}

interface Props {
  creationContact: (name: string, number: string) => void;
}

class ContactForm extends Component<Props, State> {
  state = { name: '', number: '' };

  handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.currentTarget;

    switch (name) {
      case 'name':
        this.setState({ name: value });
        break;
      case 'number':
        this.setState({ number: value });
        break;
    }
  };

  submitForm = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const { name, number } = this.state;

    this.props.creationContact(name, number);
  };

  render() {
    const { name, number } = this.state;
    return (
      <form onSubmit={this.submitForm} className={style.form}>
        <div className={style.formInputWrapper}>
          <label htmlFor="name">Name </label>
          <input
            id="name"
            onChange={this.handleChange}
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
            onChange={this.handleChange}
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
}

export default ContactForm;
