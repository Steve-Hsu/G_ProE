import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import CasesContext from '../../context/cases/casesContext';

const MtrlSizeSPEC = ({ sizeSPEC, mtrlId }) => {
  const casesContext = useContext(CasesContext);
  const { addValueMtrlSizeSPEC, sizes, mtrls } = casesContext;
  const { mSizeSPEC } = sizeSPEC;
  const sizeLable = sizes.find(({ id }) => id === sizeSPEC.size).gSize;
  const multipleSPEC = mtrls.find(({ id }) => id === mtrlId).multipleSPEC;

  //@ Value for input
  //words length limit
  const maxWdsLength = '50';
  const SizeSPECLength = maxWdsLength;

  return (
    <div>
      <input
        name={mtrlId}
        id={sizeSPEC.id}
        type='text'
        placeholder='.'
        value={mSizeSPEC}
        onChange={addValueMtrlSizeSPEC}
        maxLength={SizeSPECLength}
        className='MPH-input'
      />
      <label htmlFor={sizeSPEC.id} className='MPH-input-label'>
        {multipleSPEC == true ? `For ${sizeLable}` : 'For all Size'}
      </label>
    </div>
  );
};

export default MtrlSizeSPEC;

MtrlSizeSPEC.propTypes = {
  sizeSPEC: PropTypes.object.isRequired,
  mtrlId: PropTypes.string.isRequired,
};
