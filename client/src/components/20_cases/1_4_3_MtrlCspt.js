import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import CasesContext from '../../context/cases/casesContext';

const MtrlCspt = ({ size, mtrl }) => {
  const casesContext = useContext(CasesContext);
  const { addValueMtrlCspt } = casesContext;
  //@ Value for input
  //words length limit
  const maxWdsLength = '4';
  const csptLength = maxWdsLength;

  const sizeId = size.id;
  const cspt = mtrl.cspts.find(({ size }) => size === sizeId);

  return (
    <div style={{ height: '68px' }} key={`${sizeId}${mtrl.id}`}>
      <input
        name={mtrl.id}
        id={`cspt${sizeId}`}
        type='number'
        placeholder='.'
        onChange={addValueMtrlCspt}
        maxLength={csptLength}
        value={cspt.cspt}
        min='0'
        max='999'
        className='MPH-input'
      />
      <label
        htmlFor={`cspt${sizeId}`}
        className='MPH-input-label'
      >{`${size.gSize}`}</label>
    </div>
  );
};

export default MtrlCspt;

MtrlCspt.propTypes = {
  size: PropTypes.object.isRequired,
  mtrl: PropTypes.object.isRequired,
};
