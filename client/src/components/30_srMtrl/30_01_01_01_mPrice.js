import React, { useContext, useEffect } from 'react';
import SrMtrlContext from '../../context/srMtrl/srMtrlContext';

const MPrice = ({ mPrice, srMtrl }) => {
  const srMtrlContext = useContext(SrMtrlContext);
  const { deleteSrMtrlPrice, addSrMtrlValue, srMtrls } = srMtrlContext;

  useEffect(() => {
    loadSelectUnitTagIndex();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [srMtrls]);

  //@
  const srMtrlId = srMtrl._id;

  const mPriceList = [
    'mColor',
    'sizeSPEC',
    'unit',
    'currency',
    'mPrice',
    'moq',
    'moqPrice',
  ];

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
  const loadSelectUnitTagIndex = () => {
    document
      .getElementById(`option${mPrice.mColor}mColor${mPrice.id}`)
      .removeAttribute('selected');
    document
      .getElementById(`option${mPrice.mColor}mColor${mPrice.id}`)
      .setAttribute('selected', 'selected');

    document
      .getElementById(`option${mPrice.sizeSPEC}sizeSPEC${mPrice.id}`)
      .removeAttribute('selected');
    document
      .getElementById(`option${mPrice.sizeSPEC}sizeSPEC${mPrice.id}`)
      .setAttribute('selected', 'selected');
  };

  //@ Style
  const deleteBtnPosition = {
    top: ' 70%',
    left: '100%',
    transform: 'translate(-2rem, -1rem)',
  };

  return (
    <div className='card'>
      <div className='grid-4'>
        {mPriceList.map((m) => {
          switch (m) {
            case 'mColor':
            case 'sizeSPEC':
              return (
                <div key={`${m}${mPrice.id}`}>
                  <select
                    id={`${m}${mPrice.id}`}
                    name={mPrice.id}
                    list={m}
                    placeholder='Unit'
                    onChange={onChange}
                    default='yd'
                    className='select-primary-sub'
                  >
                    {selectList(m).map((o) => {
                      // if (o === '') {
                      //   o === 'NoValue';
                      // }
                      return (
                        <option
                          key={`option${o}${m}${mPrice.id}`}
                          id={`option${o}${m}${mPrice.id}`}
                          value={o}
                        >
                          {o}
                        </option>
                      );
                    })}
                  </select>
                </div>
              );
            default:
              return (
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
                  <label
                    htmlFor={`${m}${mPrice.id}`}
                    className='MPH-input-label'
                  >
                    {labels(m)}
                  </label>
                </div>
              );
          }
        })}
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