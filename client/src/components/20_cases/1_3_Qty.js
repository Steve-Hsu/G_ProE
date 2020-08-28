import React, { useContext, Fragment } from 'react';
import PropTypes from 'prop-types';
import CasesContext from '../../context/cases/casesContext';

const Qty = ({ size, gQty }) => {
  const casesContext = useContext(CasesContext);
  const { cWays, addCaseValue } = casesContext;

  //@ Value for input
  //words length limit
  const Max = 99999;

  const addNumber = (e) => {
    const num = e.target.value;
    if (String(num).length > String(Max).length) {
      e.target.value = Max;
      addCaseValue(e);
    } else {
      addCaseValue(e);
    }
  };

  return (
    <Fragment>
      {gQty.size === size.id ? (
        <div
          key={gQty.id}
          style={{ height: 'var(--btn-h-m)' }}
          className='bg-cp-1 mb-1 bd-cp-2-b'
        >
          <input
            name='gQty'
            id={gQty.id}
            placeholder='.'
            type='number'
            // Add ||'' to the value to prevent error as uncontrolled to controled.
            value={gQty.gQty || ''}
            onChange={addNumber}
            min='0'
            max={Max}
            className='MPH-input bg-cp-1 bd-no lead h-100 w-100'
          />
          <label htmlFor={gQty.id} className='MPH-input-label'>
            {cWays.find(({ id }) => id === gQty.cWay) == true
              ? cWays.find(({ id }) => id === gQty.cWay).gClr
              : null}
            {'  '}
            {size.gSize}
          </label>
        </div>
      ) : null}
    </Fragment>
  );
};

export default Qty;

// PropTyeps
Qty.propTypes = {
  size: PropTypes.object.isRequired,
  gQty: PropTypes.object.isRequired,
};
