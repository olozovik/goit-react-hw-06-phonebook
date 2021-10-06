import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import { addContact, changeFilter, deleteContact } from './phonebook-actions';

const initialItems = [];

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
