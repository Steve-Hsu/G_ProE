import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import CasesContext from '../../context/cases/casesContext';

const MtrlClr = ({ mtrlColor, mtrlId }) => {
  const casesContext = useContext(CasesContext);
  const { addValueMtrlColor, cWays } = casesContext;
  const { mColor } = mtrlColor;
  const cWayLable = cWays.find(({ id }) => id === mtrlColor.cWay).gClr;

  return (
    <div className='test-1 p'>
      <p>{cWayLable}</p>
      <input
        name={mtrlId}
        id={mtrlColor.id}
        type='text'
        placeholder='color'
        value={mColor}
        onChange={addValueMtrlColor}
      />
    </div>
  );
};

export default MtrlClr;

MtrlClr.propTypes = {
  mtrlColor: PropTypes.object.isRequired,
  mtrlId: PropTypes.string.isRequired,
};
