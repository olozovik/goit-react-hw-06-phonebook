import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import { LabelStyled } from './Filter.styled';
import { connect } from 'react-redux';
import { changeFilter } from '../../redux/phonebook/phonebook-actions';

function Filter({ onChange }) {
  const inputId = uuidv4();

  return (
    <LabelStyled htmlFor="inputId">
      Find contacts by name
      <input
        id={inputId}
        type="text"
        onChange={e => onChange(e.target.value)}
      />
    </LabelStyled>
  );
}

Filter.propTypes = {
  onChange: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  onChange: inputText => dispatch(changeFilter(inputText)),
});

export default connect(null, mapDispatchToProps)(Filter);
