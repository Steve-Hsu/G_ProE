import React, { Fragment } from 'react';

const mPrice = ({ mPrice }) => {
  const mPriceList = [
    'Color',
    'SPEC',
    'Unit',
    'Currency',
    'Price',
    'MOQ',
    'MPQ_Price',
  ];

  return (
    <div className='card'>
      <div className='grid-4'>
        {mPriceList.map((m) => (
          <div key={`${m}${mPrice.id}`}>
            <input
              type='text'
              id={`${m}${mPrice.id}`}
              //   name={mtrl.id}
              placeholder='.'
              //   onChange={addMtrlValue}
              className='MPH-input'
              //   value={mtrlAttribute(a) || ''}
            />
            <label htmlFor={`${m}${mPrice.id}`} className='MPH-input-label'>
              {m}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
export default mPrice;
