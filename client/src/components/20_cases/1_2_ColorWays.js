import React from 'react';
import PropTypes from 'prop-types';
import ColorWay from './1_2_1_ColorWay';

const ColorWays = (props) => {
  return (
    <div>
      {'Color Way'}
      <button name='btn2' className='btn' onClick={props.addcWay}>
        +
      </button>
      {props.cWays.map((cWay) => (
        <ColorWay key={cWay.id} cWay={cWay} deletecWay={props.deletecWay} />
      ))}
    </div>
  );
};

export default ColorWays;

// PropTyeps;
ColorWays.propTypes = {
  cWays: PropTypes.array.isRequired,
  addcWay: PropTypes.func.isRequired,
  deletecWay: PropTypes.func.isRequired,
};
