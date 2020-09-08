import React, { useContext } from 'react';
import SrMtrlContext from '../../context/srMtrl/srMtrlContext';
import PropTypes from 'prop-types';
import Select from '../elements/select/Select';

const MPrice = ({ mPrice, srMtrl, currentPath }) => {
  const srMtrlContext = useContext(SrMtrlContext);
  const { deleteSrMtrlPrice, addSrMtrlValue, srMtrls } = srMtrlContext;

  //@
  const srMtrlId = srMtrl._id;

  const mPriceList = () => {
    let arr = [
      'mColor',
      'sizeSPEC',
      'unit',
      'currency',
      'moq',
      'moqPrice',
      'mPrice',
    ];
    if (currentPath === '/api/quogarment') {
      arr.push('quotation');
    }
    return arr;
  };

  // const mPriceList = [
  //   'mColor',
  //   'sizeSPEC',
  //   'unit',
  //   'currency',
  //   'moq',
  //   'moqPrice',
  //   'mPrice',
  // ];

  // if (currentPath === '/api/quogarment') {
  //   mPriceList.push('quotation');
  // }

  //@ Funcs
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
      case 'moq':
        return 'MOQ';
      case 'moqPrice':
        return 'MOQ_Price';
      case 'mPrice':
        return 'Unit Price';
      case 'quotation':
        return 'Selling Price';
    }
  };

  const onClick = (e) => {
    e.preventDefault();

    deleteSrMtrlPrice(e);
  };

  const onChange = (e) => {
    e.preventDefault();
    const list = mPriceList();
    addSrMtrlValue(e, srMtrlId, list);
  };

  const addNumber = (e) => {
    e.preventDefault();
    const num = e.target.value;
    const list = mPriceList();
    const Max = 9999;
    if (String(num).length > String(Max).length) {
      e.target.value = Max;
      addSrMtrlValue(e, srMtrlId, list);
    } else {
      addSrMtrlValue(e, srMtrlId, list);
    }
  };

  const selectList = (x) => {
    let arr = [];
    switch (x) {
      case 'mColor':
        srMtrl.mtrlColors.map((mtrlColor) => arr.push(mtrlColor.mColor));
        srMtrl.mPrices.map((mP) => {
          if (mPrice.sizeSPEC === mP.sizeSPEC) {
            let idx = arr.indexOf(mP.mColor);
            arr.splice(idx, 1);
          }
        });
        arr.push(mPrice.mColor);
        break;
      case 'sizeSPEC':
        srMtrl.sizeSPECs.map((sizeSPEC) => arr.push(sizeSPEC.mSizeSPEC));
        srMtrl.mPrices.map((mP) => {
          if (mPrice.mColor === mP.mColor) {
            let idx = arr.indexOf(mP.sizeSPEC);
            arr.splice(idx, 1);
          }
        });
        arr.push(mPrice.sizeSPEC);
        break;
      default:
    }
    return arr;
  };

  // update the select when donwload
  // const loadSelectUnitTagIndex = () => {
  //   // if (currentPath !== '/api/quogarment') {
  //   // document
  //   //   .getElementById(`${mPrice.mColor}${mPrice.id}`)
  //   //   .removeAttribute('selected');
  //   document
  //     .getElementById(`${mPrice.mColor}${mPrice.id}`)
  //     .setAttribute('selected', 'selected');

  //   // document
  //   //   .getElementById(`${mPrice.sizeSPEC}${mPrice.id}`)
  //   //   .removeAttribute('selected');
  //   document
  //     .getElementById(`${mPrice.sizeSPEC}${mPrice.id}`)
  //     .setAttribute('selected', 'selected');
  //   // }
  // };

  //@ Style
  const deleteBtnPosition = {
    top: ' 70%',
    left: '100%',
    transform: 'translate(-2rem, -1rem)',
  };

  return (
    <div className='card bg-cp-2-light bd-radius-s bd-light'>
      <div className='grid-7'>
        {mPriceList().map((m) => {
          if (currentPath === '/api/quogarment') {
            switch (m) {
              case 'quotation':
                return (
                  <div key={`${m}${mPrice.id}`}>
                    <input
                      type='number'
                      id={`${m}${mPrice.id}`}
                      name={mPrice.id}
                      placeholder='.'
                      onChange={addNumber}
                      className='MPH-input'
                      value={mPrice[`${m}`] || ''}
                    />
                    <label
                      htmlFor={`${m}${mPrice.id}`}
                      className='MPH-input-label'
                    >
                      {labels(m)}
                    </label>
                  </div>
                );
              default:
                return (
                  <div key={`${m}${mPrice.id}`}>
                    <label htmlFor={`${m}${mPrice.id}`} className='label'>
                      {labels(m)}
                    </label>
                    <div className='lead'>{mPrice[`${m}`]}</div>
                  </div>
                );
            }
          } else {
            switch (m) {
              case 'mColor':
                return (
                  <Select
                    key={`${m}${mPrice.id}`}
                    subject={mPrice}
                    optionList={selectList('mColor')}
                    onChange={onChange}
                    // label='Color'
                    selectedOption={mPrice.mColor}
                  />
                );
              case 'sizeSPEC':
                return (
                  <Select
                    key={`${m}${mPrice.id}`}
                    subject={mPrice}
                    optionList={selectList('sizeSPEC')}
                    onChange={onChange}
                    // label='SPEC'
                    selectedOption={mPrice.sizeSPEC}
                  />
                );
              case 'unit':
                return (
                  <Select
                    key={`${m}${mPrice.id}`}
                    purpose='unit'
                    subject={mPrice}
                    onChange={onChange}
                    // label='Unit'
                    required={true}
                    selectedOption={mPrice.unit}
                  />
                );
              case 'currency':
                return (
                  <Select
                    key={`${m}${mPrice.id}`}
                    purpose='currency'
                    subject={mPrice}
                    onChange={onChange}
                    // label='Currency'
                    required={true}
                    selectedOption={mPrice.currency}
                  />
                  // <div key={`${m}${mPrice.id}`}>
                  //   <input
                  //     type='text'
                  //     id={`${m}${mPrice.id}`}
                  //     name={mPrice.id}
                  //     placeholder='.'
                  //     onChange={onChange}
                  //     className='MPH-input'
                  //     value={mPrice[`${m}`] || ''}
                  //   />
                  //   <label
                  //     htmlFor={`${m}${mPrice.id}`}
                  //     className='MPH-input-label'
                  //   >
                  //     {labels(m)}
                  //   </label>
                  // </div>
                );
              default:
                return (
                  <div key={`${m}${mPrice.id}`}>
                    <input
                      type='number'
                      id={`${m}${mPrice.id}`}
                      name={mPrice.id}
                      placeholder='.'
                      onChange={addNumber}
                      className='MPH-input'
                      value={mPrice[`${m}`] || ''}
                    />
                    <label
                      htmlFor={`${m}${mPrice.id}`}
                      className='MPH-input-label'
                    >
                      {labels(m)}
                    </label>
                  </div>
                );
            }
          }
        })}

        {currentPath === '/api/case/mprice' ? (
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
        ) : null}
      </div>
    </div>
  );
};
export default MPrice;

// PropTyeps
MPrice.propTypes = {
  mPrice: PropTypes.object.isRequired,
  srMtrl: PropTypes.object.isRequired,
  // currentPath: PropTypes.string.isRequired,
};
