import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import { addContact, changeFilter, deleteContact } from './phonebook-actions';

const initialItems = [
  {
    id: '1',
    name: 'Homer',
    number: '12345',
  },
  {
    id: '2',
    name: 'March',
    number: '12345',
  },
];

const items = createReducer(initialItems, {
  [addContact]: (state, { payload }) => [...state, payload],
  [deleteContact]: (state, { payload }) =>
    state.filter(item => item.name !== payload),
});

const filter = createReducer('', {
  [changeFilter]: (state, { payload }) => payload,
});

const phonebookReducer = combineReducers({
  items,
  filter,
});

export { phonebookReducer };
