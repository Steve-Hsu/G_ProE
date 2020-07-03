import React, { useContext } from 'react';
import SrMtrlContext from '../../context/srMtrl/srMtrlContext';

const MPrice = ({ mPrice, srMtrlId }) => {
  const srMtrlContext = useContext(SrMtrlContext);
  const { deleteSrMtrlPrice, addSrMtrlValue } = srMtrlContext;

  const mPriceList = [
    'mColor',
    'sizeSPEC',
    'unit',
    'currency',
    'mPrice',
    'moq',
    'moqPrice',
  ];

  const labels = (x) => {
    switch (x) {
      case 'mColor':
        return 'Color';
      case 'sizeSPEC':
        return 'SPEC';
      case 'unit':
        return 'Unit';
      case 'currency':
        return 'Currency';
      case 'mPrice':
        return 'Price';
      case 'moq':
        return 'MOQ';
      case 'moqPrice':
        return 'MOQ_Price';
    }
  };

  const onClick = (e) => {
    e.preventDefault();

    deleteSrMtrlPrice(e);
  };

  const onChange = (e) => {
    e.preventDefault();
    addSrMtrlValue(e, srMtrlId, mPriceList);
  };

  const deleteBtnPosition = {
    top: ' 70%',
    left: '100%',
    transform: 'translate(-2rem, -1rem)',
  };

  return (
    <div className='card'>
      <div className='grid-4'>
        {mPriceList.map((m) => (
          <div key={`${m}${mPrice.id}`}>
            <input
              type='text'
              id={`${m}${mPrice.id}`}
              name={mPrice.id}
              placeholder='.'
              onChange={onChange}
              className='MPH-input'
              value={mPrice[`${m}`] || ''}
            />
            <label htmlFor={`${m}${mPrice.id}`} className='MPH-input-label'>
              {labels(m)}
            </label>
          </div>
        ))}
        <div>
          <button
            value={srMtrlId}
            name={mPrice.id}
            onClick={onClick}
            className='btn btn-fade btn-square'
            style={deleteBtnPosition}
          >
            x
          </button>
        </div>
      </div>
    </div>
  );
};
export default MPrice;
