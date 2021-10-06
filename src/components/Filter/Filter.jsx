import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { LabelStyled } from './Filter.styled';
import { changeFilter } from 'redux/phonebook/phonebook-actions';
import { getFilter } from '../../redux/phonebook/phonebook-selectors';

function Filter() {
  const filterValue = useSelector(getFilter);
  const dispatch = useDispatch();
  const inputId = uuidv4();

  return (
    <LabelStyled htmlFor="inputId">
      Find contacts by name
      <input
        id={inputId}
        type="text"
        value={filterValue}
        onChange={e => dispatch(changeFilter(e.target.value))}
      />
    </LabelStyled>
  );
}

export { Filter };
