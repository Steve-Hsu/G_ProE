import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import CasesContext from '../../context/cases/casesContext';

const ColorWay = ({ cWay }) => {
  const casesContext = useContext(CasesContext);
  const { deletecWay, updatecWay } = casesContext;
  return (
    <div className='grid-3-1 grid-gap-sm test-1'>
      <input
        id={cWay.id}
        type='text'
        name='style'
        placeholder='Color Way'
        onChange={updatecWay}
      />
      <button value={cWay.id} onClick={deletecWay} className='btn btn-danger'>
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
