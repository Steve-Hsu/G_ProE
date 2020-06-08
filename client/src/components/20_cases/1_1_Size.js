import React from 'react';
import PropTypes from 'prop-types';

const Size = ({ size, deleteSize }) => {
  return (
    <div className='grid-3-1 grid-gap-sm test-1'>
      <input type='text' name='style' placeholder='Size' />
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
  deleteSize: PropTypes.func.isRequired,
};
