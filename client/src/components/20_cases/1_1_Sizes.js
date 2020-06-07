import React from 'react';
import PropTypes from 'prop-types';
import Size from './1_1_1_Size';

const Sizes = ({ sizes, deleteSize, addSize }) => {
  return (
    <div>
      {'Size'}
      <button name='btn1' className='btn' onClick={addSize}>
        Size button
      </button>
      {sizes.map((size) => (
        <Size key={size.id} size={size} deleteSize={deleteSize} />
      ))}
    </div>
  );
};

export default Sizes;

// PropTyeps
Sizes.propTypes = {
  sizes: PropTypes.array.isRequired,
  addSize: PropTypes.func.isRequired,
  deleteSize: PropTypes.func.isRequired,
};
