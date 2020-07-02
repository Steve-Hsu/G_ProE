import React, { useContext } from 'react';

import CasesContext from '../../context/cases/casesContext';
import SrMtrlContext from '../../context/srMtrl/srMtrlContext';
import MPrice from './30_01_01_01_mPrice';

const SrMtrl = ({ srMtrl }) => {
  const casesContext = useContext(CasesContext);
  const srMtrlContext = useContext(SrMtrlContext);
  const { expandPrice, addMPrice } = srMtrlContext;
  const onClick = (e) => {
    e.preventDefault();
    addMPrice(srMtrl._id);
  };

  return (
    <div className='mb-1 p-1 card'>
      <div className='grid-6'>
        <div>
          <label htmlFor={`supplier${srMtrl._id}`} className='label'>
            Supplier
          </label>
          <div id={`supplier${srMtrl._id}`}>{srMtrl.supplier}</div>
        </div>
        <div>
          <label htmlFor={`ref_no${srMtrl._id}`} className='label'>
            Ref No.
          </label>
          <div id={`ref_no${srMtrl._id}`}>{srMtrl.ref_no}</div>
        </div>
        <div>
          {'Add Price'}
          <button
            name='mPriceBtn'
            className='btn btn-sm btn-primary btn-rounded-square'
            onClick={onClick}
          >
            +
          </button>
        </div>
      </div>
      {/* mPrice container */}
      <div>
        {srMtrl.mPrices.map((mPrice) => (
          <MPrice key={mPrice.id} mPrice={mPrice} />
        ))}
      </div>
    </div>
  );
};

export default SrMtrl;
