import React, { useContext } from 'react';
import SrMtrlContext from '../../context/srMtrl/srMtrlContext';
import PropTypes from 'prop-types';
import Select from '../elements/select/Select';
import DeleteBtnSmall from '../elements/btns/DeleteBtnSmall';

const MPrice = ({
  mPrice,
  srMtrl,
  currentPath,
  togglePopover,
  idx,
  mainPrice,
}) => {
  const srMtrlContext = useContext(SrMtrlContext);
  const { addSrMtrlValue, toggleMainPrice } = srMtrlContext;

  //@
  const srMtrlId = srMtrl._id;

  const mPriceList = () => {
    let arr = [
      'mColor',
      'sizeSPEC',
      'unit',
      'moq',
      'currency',
      'moqPrice',
      'mPrice',
    ];
    if (currentPath === '/api/quogarment') {
      arr.push('quotation');
    }
    return arr;
  };

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
    const subId = mPrice.id;
    togglePopover(e, subId);
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
    transform: 'translate(0.3rem, -0.9rem)',
  };

  const onClick2 = () => {
    toggleMainPrice(srMtrlId, mPrice.id);
    // console.log('the MainPrice', mainPrice); // Test Code
  };

  return (
    <div className='card bg-cp-1 bd-radius-s bd-light pb-0 hover-cp-2-light'>
      {/* <div className='ml-1 w-90' style={{ flex: '1 1 auto' }}> */}
      {/* <div className='h-scatter-content'> */}
      {/* {' '} */}
      {/* {currentPath === '/api/case/mprice' ? ( */}
      {/* <div>{mPrice.id === mainPrice ? <span>Main Price</span> : null}</div> */}

      {/* // ) : null} */}
      {/* </div> */}
      <div className='grid-mPrice mb-0' style={{ height: '65px' }}>
        <div className='fs-lead cursor' onClick={onClick2}>
          <div
            className='pr-05'
            style={{ transform: 'translate(-0.3rem, -0.5rem)' }}
          >
            {' '}
            {mainPrice === mPrice.id ? (
              <i className='fas fa-magnet'></i>
            ) : (
              <div>{idx + 1}</div>
            )}
          </div>
        </div>
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
              case 'sizeSPEC':
                return (
                  <div key={`div${m}${mPrice.id}`} className='ml-05'>
                    <div className='fs-tiny'>
                      {m === 'mColor' ? 'Color' : 'SPEC'}
                    </div>
                    <Select
                      key={`${m}${mPrice.id}`}
                      id={`${m}${mPrice.id}`}
                      subject={mPrice}
                      optionList={selectList(m)}
                      onChange={onChange}
                      selectedOption={mPrice[m]}
                    />
                  </div>
                );
              case 'unit':
              case 'currency':
                return (
                  <div key={`div${m}${mPrice.id}`} className='ml-05'>
                    <div className='fs-tiny'>
                      {m === 'unit' ? 'Unit' : 'Currency'}
                    </div>
                    <Select
                      key={`${m}${mPrice.id}`}
                      id={`${m}${mPrice.id}`}
                      purpose={m}
                      subject={mPrice}
                      onChange={onChange}
                      required={true}
                      selectedOption={mPrice[m]}
                    />
                  </div>
                );
              default:
                return (
                  <div
                    key={`div${m}${mPrice.id}`}
                    className='ml-05'
                    style={{ height: '68px' }}
                  >
                    <div className='fs-tiny'>
                      {m === 'moq'
                        ? 'MOQ'
                        : m === 'moqPrice'
                        ? 'MOQ Price'
                        : m === 'mPrice'
                        ? 'Unit Price'
                        : null}
                    </div>
                    <div key={`${m}${mPrice.id}`}>
                      <input
                        type='number'
                        id={`${m}${mPrice.id}`}
                        name={mPrice.id}
                        // placeholder='.'
                        onChange={addNumber}
                        // className='MPH-input'
                        value={mPrice[`${m}`] || ''}
                      />
                      {/* <label
                          htmlFor={`${m}${mPrice.id}`}
                          className='MPH-input-label'
                        >
                          {labels(m)}
                        </label> */}
                    </div>
                  </div>
                );
            }
          }
        })}
        <div className='ml-05'>
          <DeleteBtnSmall
            key={mPrice.id}
            onClick={onClick}
            name='deleteMPrice'
            value={srMtrlId}
            style={deleteBtnPosition}
          />
        </div>
      </div>

      {/* </div> */}
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
