import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import CasesContext from '../../context/cases/casesContext';

const ColorWay = ({ cWay }) => {
  const casesContext = useContext(CasesContext);
  const { cWays, togglePopover, updatecWay } = casesContext;
  //For sparete the postion of btn, here use an inline style.
  //deleteBtn in ColorWay.

  const deleteBtnPosition = {
    top: ' 50%',
    left: '50%',
    transform: 'translate(-1rem, -1rem)',
  };

  //@ Value for input
  //words length limit
  const maxWdsLength = '50';
  const colorWayLength = maxWdsLength;

  return (
    <div className='grid-3-1' style={{ height: '68px' }}>
      <div>
        <input
          id={cWay.id}
          type='text'
          name='style'
          placeholder='.'
          onChange={updatecWay}
          maxLength={colorWayLength}
          autoFocus
          className='MPH-input'
          style={{ color: 'orange' }}
          value={cWay.gClr || ''}
        />
        <label htmlFor={cWay.id} className='MPH-input-label'>
          Color Way -{' '}
          {`${Number(cWays.findIndex((e) => e.id === cWay.id)) + 1}`}
        </label>
      </div>
      <div style={{ height: '68px' }}>
        <button
          value={cWay.id}
          name='cWay'
          onClick={togglePopover}
          className='btn btn-fade btn-square'
          style={deleteBtnPosition}
        >
          x
        </button>
      </div>
    </div>
  );
};

export default ColorWay;

// PropTyeps
ColorWay.propTypes = {
  cWay: PropTypes.object.isRequired,
};
