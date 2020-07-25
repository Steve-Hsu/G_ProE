import React, { useContext } from 'react';
import QuoContext from '../../context/quo/quoContext';

const QuoMtrl = ({ mtrl }) => {
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

  const onChange = (e) => {
    e.preventDefault();
    updateCurrentQuoForm(e);
  };

  return (
    // <div className='mb-1 p-1 card'>
    <div className='grid-1-5-1-1-1-1-1 card mb-1 p-1'>
      <div>{mtrl.item}</div>
      <div>
        {mtrl.supplier} / {mtrl.ref_no} / {mtrl.sizeSPECs[0].mSizeSPEC} /{' '}
        {mtrl.position}
      </div>
      {/* <div>
          {mtrl.supplier} / {mtrl.ref_no} / {mtrl.sizeSPECs[0]} /{' '}
          {mtrl.position}
        </div> */}
      <div>{mtrl.unit}</div>
      <div>
        Consumption
        <input
          type='number'
          id={`cspt${mtrl.id}`}
          name='cspt'
          min='0'
          max='999'
          step='.01'
          value={csptAddvised || ''}
          onChange={onChange}
        />
      </div>
      <div>
        Unit Price
        <input
          type='number'
          id={`unitprice${mtrl.id}`}
          name='unitprice'
          min='0'
          max='9999999'
          step='.01'
          value={mQuoAddvised || ''}
          onChange={onChange}
        />
      </div>
      <div>{materialFinalQuotation}</div>

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
