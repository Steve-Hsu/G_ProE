import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import CasesContext from '../../context/cases/casesContext';

const Size = ({ size, deleteSize }) => {
  const casesContext = useContext(CasesContext);
  return (
    <div className='grid-3-1 grid-gap-sm test-1'>
      <input type='text' name='style' placeholder='Size' />
      <button
        value={size.id}
        onClick={casesContext.deleteSize}
        className='btn btn-danger'
      >
        x
      </button>
    </div>
  );
};

export default Size;

// PropTyeps
Size.propTypes = {
  size: PropTypes.object.isRequired,
};
