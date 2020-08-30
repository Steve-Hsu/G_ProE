import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import CasesContext from '../../context/cases/casesContext';
import PopoverContext from '../../context/popover/popoverContext';

const ColorWay = ({ cWay }) => {
  const casesContext = useContext(CasesContext);
  const { cNo, cWays, updatecWay } = casesContext;
  const popoverContext = useContext(PopoverContext);
  const { togglePopover } = popoverContext;
  //For sparete the postion of btn, here use an inline style.
  //deleteBtn in ColorWay.

  const deleteBtnPosition = {
    // top: ' 50%',
    // left: '50%',
    transform: 'translate(-1rem, -1rem)',
  };

  //@ Value for input
  //words length limit
  const maxWdsLength = '50';
  const colorWayLength = maxWdsLength;

  const te = {
    color: 'orange',
  };

  const warningTextBoxStyle = () => {
    let obj = {};
    let emptyWar = new RegExp('empty-', 'i');
    let duplicatedWar = new RegExp('duplicated-', 'i');
    if (
      emptyWar.test(cWay.gClr) ||
      duplicatedWar.test(cWay.gClr) ||
      cWays.filter((i) => {
        return i.gClr === cWay.gClr;
      }).length > 1 ||
      cWay.gClr === ''
    ) {
      obj = {
        color: 'white',
        background: 'var(--danger-color)',
      };
    } else {
      obj = {
        color: 'var(--cp-3)',
      };
    }
    return obj;
  };

  return (
    <div className='grid-3-1 mb-1' style={{ height: 'var(--btn-h-m)' }}>
      <div style={{ height: 'var(--btn-h-m)' }}>
        <input
          id={cWay.id}
          type='text'
          name='style'
          placeholder='.'
          onChange={updatecWay}
          maxLength={colorWayLength}
          autoFocus
          className='MPH-input bd-no bg-cp-1 lead w-100 h-100'
          style={warningTextBoxStyle()}
          value={cWay.gClr || ''}
        />
        <label htmlFor={cWay.id} className='MPH-input-label'>
          Color Way -{' '}
          {`${Number(cWays.findIndex((e) => e.id === cWay.id)) + 1}`}
        </label>
      </div>
      <div style={{ height: 'var(--btn-h-m)' }}>
        {cNo === null ? null : (
          <button
            value={cWay.id}
            name='cWay'
            onClick={togglePopover}
            className='btn btn-warning btn-sq btn-sq-small'
            style={deleteBtnPosition}
          >
            x
          </button>
        )}
      </div>
    </div>
  );
};

export default ColorWay;

// PropTyeps
ColorWay.propTypes = {
  cWay: PropTypes.object.isRequired,
};
