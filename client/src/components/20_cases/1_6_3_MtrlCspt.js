import React, { useContext, Fragment } from 'react';
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
  const cspt = mtrl.cspts.find(({ size }) => size === sizeId); // This is JS array's find method, it returns 1 item, if some many are found, only still return first item
  const multipleCSPT = mtrl.multipleCSPT;
  return (
    // <Fragment>
    //   {cspt ? (
    <div style={{ height: '68px' }} key={`${sizeId}${mtrl.id}`}>
      <input
        name={mtrl.id}
        id={cspt.id}
        type='number'
        placeholder='.'
        onChange={addValueMtrlCspt}
        maxLength={csptLength}
        value={cspt.cspt}
        min='0'
        max='999'
        className='MPH-input'
        step='.01'
      />
      <label htmlFor={cspt.id} className='MPH-input-label'>
        {multipleCSPT == true ? `For ${size.gSize}` : 'For all Size'}
      </label>
    </div>
    //   ) : null}
    // </Fragment>
  );
};

export default MtrlCspt;

MtrlCspt.propTypes = {
  size: PropTypes.object.isRequired,
  mtrl: PropTypes.object.isRequired,
};
