import { v4 as uuidv4 } from 'uuid';
import { ADD_CONTACT, CHANGE_FILTER, DELETE_CONTACT } from './phonebook-types';

const addContact = (name, number) => ({
  type: ADD_CONTACT,
  payload: {
    id: uuidv4(),
    name,
    number,
  },
});

const deleteContact = name => ({
  type: DELETE_CONTACT,
  payload: name,
});

const changeFilter = text => ({
  type: CHANGE_FILTER,
  payload: text,
});

export { addContact, deleteContact, changeFilter };
