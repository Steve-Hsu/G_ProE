import React from 'react';
import PropTypes from 'prop-types';

const ColorWay = ({ cWay, deletecWay, labelMtrlClr }) => {
  return (
    <div className='grid-3-1 grid-gap-sm test-1'>
      <input
        id={cWay.id}
        type='text'
        name='style'
        placeholder='Color Way'
        onChange={labelMtrlClr}
      />
      <button value={cWay.id} onClick={deletecWay} className='btn btn-danger'>
        x
      </button>
    </div>
  );
};

export default ColorWay;

// PropTyeps
ColorWay.propTypes = {
  cWay: PropTypes.object.isRequired,
  deletecWay: PropTypes.func.isRequired,
  labelMtrlClrs: PropTypes.func.isRequired,
};
