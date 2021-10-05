import PropTypes from 'prop-types';
import { ListStyled } from './ContactList.styled';
import { connect } from 'react-redux';
import { deleteContact } from '../../redux/phonebook/phonebook-actions';
import { useEffect, useState } from 'react';

function ContactList({ contacts, deleteContact, filter }) {
  const [contactsToRender, setContactsToRender] = useState(contacts);
  const [filterResult, setFilterResult] = useState('idle');

  useEffect(() => {
    setContactsToRender(
      contacts.filter(({ name }) =>
        name.toLowerCase().includes(filter.toLowerCase()),
      ),
    );
    if (!filter && contacts.length) setFilterResult('idle');
    if (!filter && !contacts.length) setFilterResult('no contacts');
    if (filter && contacts.length) setFilterResult('not found');
  }, [contacts, filter]);

  return (
    <>
      {filterResult === 'no contacts' && <p>There are no contacts here yet.</p>}
      {filterResult === 'not found' && (
        <p>There are no contacts with this name.</p>
      )}
      <ListStyled>
        {contactsToRender?.map(({ name, number }) => {
          return (
            <li key={name}>
              {name}: {number}
              <button
                type={'button'}
                data-name={name}
                onClick={() => deleteContact(name)}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ListStyled>
    </>
  );
}
const mapStateToProps = state => ({
  contacts: state.items,
  filter: state.filter,
});

const mapDispatchToProps = dispatch => ({
  deleteContact: name => dispatch(deleteContact(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    }),
  ),
};
