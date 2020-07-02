import React, { useContext } from 'react';

import CasesContext from '../../context/cases/casesContext';

const SrMtrl = ({ srMtrl }) => {
  const casesContext = useContext(CasesContext);
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
          <input
            type='text'
            id={`currency${srMtrl._id}`}
            // name={srMtrl.id}
            placeholder='.'
            // onChange={addMtrlValue}
            className='MPH-input'
            // value={mtrlAttribute(a) || ''}
          />
          <label htmlFor={`currency${srMtrl._id}`} className='MPH-input-label'>
            Currency
          </label>
        </div>
        <div>
          <input
            type='text'
            id={`unit${srMtrl._id}`}
            // name={srMtrl.id}
            placeholder='.'
            // onChange={addMtrlValue}
            className='MPH-input'
            // value={mtrlAttribute(a) || ''}
          />
          <label htmlFor={`unit${srMtrl._id}`} className='MPH-input-label'>
            Unit
          </label>
        </div>
        <div>
          <input
            type='text'
            id={`price${srMtrl._id}`}
            // name={srMtrl.id}
            placeholder='.'
            // onChange={addMtrlValue}
            className='MPH-input'
            // value={mtrlAttribute(a) || ''}
          />
          <label htmlFor={`price${srMtrl._id}`} className='MPH-input-label'>
            Unit Price
          </label>
        </div>
      </div>
    </div>
  );
};

export default SrMtrl;
