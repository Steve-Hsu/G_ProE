import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import CasesContext from '../../context/cases/casesContext';

const ColorWay = ({ cWay }) => {
  const casesContext = useContext(CasesContext);
  const { togglePopover, updatecWay } = casesContext;
  //For sparete the postion of btn, here use an inline style.
  //deleteBtn in ColorWay.
  const deleteBtnPosition = {
    top: ' 50%',
    left: '30%',
    transform: 'translate(-1rem, -1rem)',
  };

  //@ Value for input
  //words length limit
  const maxWdsLength = '50';
  const colorWayLength = maxWdsLength;

  return (
    <div className='grid-3-1 test-1 p' style={{ height: '68px' }}>
      <input
        id={cWay.id}
        type='text'
        name='style'
        placeholder='Color Way'
        onChange={updatecWay}
        maxLength={colorWayLength}
        autoFocus
      />
      <button
        value={cWay.id}
        name='cWay'
        onClick={togglePopover}
        className='btn btn-danger btn-rounded-square'
        style={deleteBtnPosition}
      >
        x
      </button>
    </div>
  );
};

export default ColorWay;

// PropTyeps
ColorWay.propTypes = {
  cWay: PropTypes.object.isRequired,
};
