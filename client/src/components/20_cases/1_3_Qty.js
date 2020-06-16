import React, { useContext, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import CasesContext from '../../context/cases/casesContext';

const Qty = ({ size, gQty }) => {
  const casesContext = useContext(CasesContext);
  const { cWays, addCaseValue } = casesContext;

  //@ Value for input
  //words length limit
  const maxWdsLength = '7';
  const gQtyLength = maxWdsLength;

  return (
    <Fragment>
      {gQty.size === size.id ? (
        <div key={gQty.id} style={{ height: '68px' }}>
          <input
            name='gQty'
            id={gQty.id}
            placeholder='.'
            type='number'
            // Add ||'' to the value to prevent error as uncontrolled to controled.
            value={gQty.gQty || ''}
            onChange={addCaseValue}
            maxLength={gQtyLength}
            min='0'
            max='100'
            className='MPH-input'
          />
          <label htmlFor={gQty.id} className='MPH-input-label'>
            {size.gSize}
            {'  '}
            {cWays.find(({ id }) => id === gQty.cWay).gClr}
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
