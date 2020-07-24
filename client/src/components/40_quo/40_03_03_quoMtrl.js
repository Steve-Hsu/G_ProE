import React, { useContext } from 'react';
import QuoContext from '../../context/quo/quoContext';

const QuoMtrl = ({ mtrl }) => {
  const quoContext = useContext(QuoContext);

  const { isQuotating, switchQuoFormSelector, currentQuoForm } = quoContext;
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

  const advisedPrice = mQuos.find(({ mtrlId }) => mtrlId === mtrl.id)
    .mQuoAddvised;
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
      <div>{advisedPrice}</div>
      <div>qantity</div>

      <div>Final</div>

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
