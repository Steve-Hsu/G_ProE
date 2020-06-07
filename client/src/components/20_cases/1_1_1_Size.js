import React from 'react';
import PropTypes from 'prop-types';

const Size = ({ size, deleteSize }) => {
  return (
    <p>
      <input type='text' name='style' placeholder='Size' />
      <button value={size.id} onClick={deleteSize} className='btn'>
        X
      </button>
    </p>
  );
};

export default Size;

// PropTyeps
Size.propTypes = {
  size: PropTypes.object.isRequired,
  deleteSize: PropTypes.func.isRequired,
};
