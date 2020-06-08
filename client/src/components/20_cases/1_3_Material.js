import React from 'react';
import PropTypes from 'prop-types';

const Material = ({ cWay, deletecWay }) => {
  return (
    <div className='grid-3-1 grid-gap-sm test-1'>
      <input type='text' name='style' placeholder='Color Way' />
      <button value={cWay.id} onClick={deletecWay} className='btn btn-danger'>
        x
      </button>
    </div>
  );
};

export default Material;

// PropTyeps
Material.propTypes = {
  cWay: PropTypes.object.isRequired,
  deletecWay: PropTypes.func.isRequired,
};
