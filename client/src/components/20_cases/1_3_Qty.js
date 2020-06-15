import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import CasesContext from '../../context/cases/casesContext';

const Qty = ({ size, gQty }) => {
  const casesContext = useContext(CasesContext);
  const { addCaseValue } = casesContext;

  //@ Value for input
  //words length limit
  const maxWdsLength = '7';
  const gQtyLength = maxWdsLength;

  if (gQty.size === size.id) {
    return (
      <div key={gQty.id}>
        <input
          name='gQty'
          id={gQty.id}
          placeholder={size.gSize}
          type='number'
          // Add ||'' to the value to prevent error as uncontrolled to controled.
          value={gQty.gQty || ''}
          onChange={addCaseValue}
          maxLength={gQtyLength}
          min='0'
          max='100'
        />
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Qty;

// PropTyeps
Qty.propTypes = {
  size: PropTypes.object.isRequired,
  gQty: PropTypes.object.isRequired,
};
