import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import CasesContext from '../../context/cases/casesContext';

const Qty = ({ cWay, gQty }) => {
  const casesContext = useContext(CasesContext);
  const { addCaseValue } = casesContext;

  if (gQty.cWay === cWay.id) {
    return (
      <div key={gQty.id}>
        <input
          name='gQty'
          id={gQty.id}
          placeholder={cWay.gClr}
          type='text'
          value={gQty.gQty}
          onChange={addCaseValue}
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
  cWay: PropTypes.object.isRequired,
  gQty: PropTypes.object.isRequired,
};
