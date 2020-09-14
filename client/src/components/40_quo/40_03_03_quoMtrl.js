import React, { useContext } from 'react';
import QuoContext from '../../context/quo/quoContext';

const QuoMtrl = ({ mtrl, className }) => {
  const quoContext = useContext(QuoContext);

  const {
    isQuotating,
    switchQuoFormSelector,
    currentQuoForm,
    updateCurrentQuoForm,
  } = quoContext;
  const {
    _id,
    quoNo,
    quoSizes,
    quocWays,
    currency,
    cmpts,
    mQuos,
    otherExpenses,
    fob,
  } = currentQuoForm;

  const mQuo = mQuos.find(({ mtrlId }) => mtrlId === mtrl.id);
  const { mQuoAddvised, csptAddvised, materialFinalQuotation } = mQuo;

  const addNumber = (e) => {
    e.preventDefault();
    const num = e.target.value;
    let Max = 0;
    switch (e.target.name) {
      case 'cspt':
        Max = 999;
        break;
      case 'unitprice':
        Max = 9999999;
        break;
      default:
    }

    if (String(num).length > String(Max).length) {
      e.target.value = Max;
      updateCurrentQuoForm(e);
    } else {
      updateCurrentQuoForm(e);
    }
  };

  return (
    // <div className='mb-1 p-1 card'>
    <div className={`grid-1-5-1-1-1-1-1 card mb-1 p-1 ${className}`}>
      <div className='v-center-content pr-05'>{mtrl.item}</div>
      <div className='v-center-content pr-05'>
        {mtrl.supplier} / {mtrl.ref_no} / {mtrl.sizeSPECs[0].mSizeSPEC} /{' '}
        {mtrl.position}
      </div>
      <div className='v-center-content pr-05'>
        {/* Consumption */}
        <input
          type='number'
          id={`cspt${mtrl.id}`}
          name='cspt'
          min='0'
          max='999'
          step='.01'
          value={csptAddvised || ''}
          onChange={addNumber}
        />
      </div>
      <div className='v-center-content pr-05'>{mtrl.unit}</div>
      <div className='v-center-content pr-05'>
        {/* Unit Price */}
        <input
          type='number'
          id={`unitprice${mtrl.id}`}
          name='unitprice'
          min='0'
          max='9999999'
          step='.01'
          value={mQuoAddvised || ''}
          onChange={addNumber}
        />
      </div>

      {/* {mtrl.map((label) => (
            <div key={`QuoListItem${label}${listItem.cNo}`}>
              <div className='label'>{labelSwitcher(label)}</div>
              <div>{listItem[label]}</div>
            </div>
          ))} */}
    </div>
    // </div>
  );
};

export default QuoMtrl;
