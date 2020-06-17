import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import CasesContext from '../../context/cases/casesContext';

const MtrlClr = ({ mtrlColor, mtrlId }) => {
  const casesContext = useContext(CasesContext);
  const { addValueMtrlColor, cWays } = casesContext;
  const { mColor } = mtrlColor;
  const cWayLable = cWays.find(({ id }) => id === mtrlColor.cWay).gClr;

  //@ Value for input
  //words length limit
  const maxWdsLength = '50';
  const mColorLength = maxWdsLength;

  return (
    <div style={{ height: '68px' }}>
      <input
        name={mtrlId}
        id={mtrlColor.id}
        type='text'
        placeholder='.'
        value={mColor}
        onChange={addValueMtrlColor}
        maxLength={mColorLength}
        className='MPH-input'
      />
      <label htmlFor={mtrlColor.id} className='MPH-input-label'>
        Color on {cWayLable}
      </label>
    </div>
  );
};

export default MtrlClr;

MtrlClr.propTypes = {
  mtrlColor: PropTypes.object.isRequired,
  mtrlId: PropTypes.string.isRequired,
};
