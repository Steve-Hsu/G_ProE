import React from 'react';
import PropTypes from 'prop-types';

const ColorWay = ({ cWay, deletecWay }) => {
  return (
    <p>
      <input type='text' name='style' placeholder='Color Way' />
      <button value={cWay.id} onClick={deletecWay} className='btn'>
        X
      </button>
    </p>
  );
};

export default ColorWay;

// PropTyeps
ColorWay.propTypes = {
  cWay: PropTypes.object.isRequired,
  deletecWay: PropTypes.func.isRequired,
};
