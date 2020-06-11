import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import CasesContext from '../../context/cases/casesContext';

const MtrlSizeSPEC = ({ sizeSPEC, mtrlId }) => {
  const casesContext = useContext(CasesContext);
  const { addValueMtrlSizeSPEC, sizes } = casesContext;
  const { mSizeSPEC } = sizeSPEC;
  const sizeLable = sizes.find(({ id }) => id === sizeSPEC.size).gSize;

  return (
    <div className='test-1 p'>
      <p>{sizeLable}</p>
      <input
        name={mtrlId}
        id={sizeSPEC.id}
        type='text'
        placeholder='SPEC for Size'
        value={mSizeSPEC}
        onChange={addValueMtrlSizeSPEC}
      />
    </div>
  );
};

export default MtrlSizeSPEC;

MtrlSizeSPEC.propTypes = {
  sizeSPEC: PropTypes.object.isRequired,
  mtrlId: PropTypes.string.isRequired,
};
