import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import CasesContext from '../../context/cases/casesContext';

const MtrlClr = ({ mtrlId, cWay }) => {
  const casesContext = useContext(CasesContext);

  return (
    <div className='test-1'>
      <p>{cWay.gClr}</p>
      <input id={cWay.id} type='text' name={mtrlId} placeholder='color' />
    </div>
  );
};

export default MtrlClr;

MtrlClr.propTypes = {
  mtrlId: PropTypes.string.isRequired,
  cWay: PropTypes.object.isRequired,
};
