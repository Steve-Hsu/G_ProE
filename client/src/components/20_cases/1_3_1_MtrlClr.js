import React from 'react';
import PropTypes from 'prop-types';

const MtrlClr = ({ mtrlId, cWay, addMtrlColor }) => {
  return (
    <div className='test-1'>
      <p>{cWay.gClr}</p>
      <input
        id={cWay.id}
        type='text'
        name={mtrlId}
        placeholder='color'
        onChange={addMtrlColor}
      />
    </div>
  );
};

export default MtrlClr;

MtrlClr.propTypes = {
  mtrlId: PropTypes.string.isRequired,
  cWay: PropTypes.object.isRequired,
  addMtrlColor: PropTypes.func.isRequired,
};
