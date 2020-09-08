import React, { useContext } from 'react';

import CasesContext from '../../context/cases/casesContext';
import SrMtrlContext from '../../context/srMtrl/srMtrlContext';
import MPrice from './30_01_01_mPrice';
import PropTypes from 'prop-types';
import SqBtnLarge from '../elements/btns/SqBtnLarge';
import GoBackBtnSpinSmall from '../elements/btns/GoBackBtnSpinSmall';

const SrMtrl = ({ srMtrl, currentPath }) => {
  const casesContext = useContext(CasesContext);
  const srMtrlContext = useContext(SrMtrlContext);
  const { expandPrice, addMPrice, openSrMtrl } = srMtrlContext;
  const onClick = (e) => {
    e.preventDefault();

    addMPrice(srMtrl._id);
  };

  const goBack = () => {
    openSrMtrl(srMtrl._id);
  };

  return (
    <div
      className='mb-1 p-1 round-card bg-cp-elem bd-light flexBox'
      style={{ width: '100%' }}
    >
      <GoBackBtnSpinSmall onClick={goBack} />
      <div className='ml-1 w-90' style={{ flex: '1 1 auto' }}>
        <div className='grid-2'>
          <div>
            <label htmlFor={`supplier${srMtrl._id}`} className='fs-tiny'>
              Supplier
            </label>
            <div className='fs-large' id={`supplier${srMtrl._id}`}>
              {srMtrl.supplier}
            </div>
          </div>
          <div>
            <label htmlFor={`ref_no${srMtrl._id}`} className='fs-tiny'>
              Ref No.
            </label>
            <div className='fs-large' id={`ref_no${srMtrl._id}`}>
              {srMtrl.ref_no}
            </div>
          </div>
        </div>
        <div className='mb-05'>
          <SqBtnLarge
            name='mPriceBtn'
            onClick={onClick}
            label={<i className='fas fa-money-check-alt'> Price ＋</i>}
          />
        </div>
        {/* mPrice container */}
        <div>
          {srMtrl.mPrices.map((mPrice) => (
            <MPrice
              key={mPrice.id}
              mPrice={mPrice}
              srMtrl={srMtrl}
              // currentPath={currentPath}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SrMtrl;

// PropTyeps
SrMtrl.propTypes = {
  // mPrice: PropTypes.object.isRequired,
  srMtrl: PropTypes.object.isRequired,
  // currentPath: PropTypes.string.isRequired,
};
