import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import CasesContext from '../../context/cases/casesContext';

const Size = ({ size }) => {
  const casesContext = useContext(CasesContext);
  const { deleteSize, updateSize } = casesContext;
  return (
    <div className='grid-3-1 grid-gap-sm test-1'>
      <input
        id={size.id}
        type='text'
        placeholder='Size'
        onChange={updateSize}
      />
      <button value={size.id} onClick={deleteSize} className='btn btn-danger'>
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
