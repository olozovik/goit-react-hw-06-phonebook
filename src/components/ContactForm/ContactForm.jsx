import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { FormStyled } from './ContactForm.styled';
import { addContact } from 'redux/phonebook/phonebook-actions';
import { getContacts } from 'redux/phonebook/phonebook-selectors';

const ContactForm = () => {
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  useEffect(() => {
    setName('');
    setNumber('');
  }, [contacts]);

  const nameInputId = uuidv4();
  const numberInputId = uuidv4();

  const handleOnChange = e => {
    switch (e.target.name) {
      case 'name':
        return setName(e.target.value);
      case 'number':
        return setNumber(e.target.value);
      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const isContactExisting = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase(),
    );

    if (isContactExisting) {
      toast.error(`${name} is already in contacts.`);
      return;
    }

    dispatch(addContact(name, number));
  };

  return (
    <FormStyled autoComplete={'off'} onSubmit={handleSubmit}>
      <label htmlFor={nameInputId}>
        Name
        <input
          id={nameInputId}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
          value={name}
          onChange={handleOnChange}
        />
      </label>
      <label htmlFor={numberInputId}>
        Number
        <input
          id={numberInputId}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять из цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          required
          value={number}
          onChange={handleOnChange}
        />
      </label>
      <button type={'submit'}>Add contact</button>
    </FormStyled>
  );
};

export { ContactForm };
