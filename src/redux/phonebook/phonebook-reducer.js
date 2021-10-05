import { ADD_CONTACT, CHANGE_FILTER, DELETE_CONTACT } from './phonebook-types';

const contacts = {
  items: [],
  filter: '',
};

const phonebookReducer = (state = contacts, { type, payload }) => {
  switch (type) {
    case ADD_CONTACT:
      return { ...state, items: [...state.items, payload] };

    case DELETE_CONTACT:
      return {
        ...state,
        items: [...state.items].filter(item => item.name !== payload),
      };

    case CHANGE_FILTER:
      return { ...state, filter: payload };

    default:
      return state;
  }
};

export { phonebookReducer };
