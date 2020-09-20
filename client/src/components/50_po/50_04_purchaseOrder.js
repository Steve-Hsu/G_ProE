import React, { useContext, Fragment, useEffect } from 'react';
import PurContext from '../../context/pur/purContext';
// import AuthUserContext from '../../context/authUser/authUserContext';

// Component
import PoItem from './50_04_01_poItem';
import NoAndDateHeader from '../../components/elements/formPart/NoAndDateHeader';
import FormTitle from '../../components/elements/formPart/FormTitle';
import Conditions from '../elements/formPart/Conditions/Conditions';

const PurchaseOrder = () => {
  // const { downloadCase } = caseContext;

  const purContext = useContext(PurContext);
  const {
    currentOrderSummary,
    currentPo,
    getMaterialPrice,
    updateCondition,
    uploadPO,
  } = purContext;
  const { _id, osNo, caseMtrls } = currentOrderSummary;

  // const authUserContext = useContext(AuthUserContext);
  // const { comName, comNameTail, comAddress, comPhone } = authUserContext;

  useEffect(() => {
    const currentMtrls = caseMtrls.filter((mtrl) => {
      return mtrl.supplier === currentPo;
    });

    getMaterialPrice(currentPo, currentMtrls);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // let currentMtrls = [];

  let theNumber = 0;

  const onClick = (e) => {
    e.preventDefault();
    updateCondition(e);
  };

  const submit = (e) => {
    e.preventDefault();
    uploadPO(_id, currentPo);
  };

  return (
    <div className=''>
      {/* {currentPoPriceList === [] ? null : (
        <div> */}
      <NoAndDateHeader No={osNo} />
      <FormTitle title='Purchase Order' />
      {/* <div>
        <h1>
          {comName} {comNameTail}
        </h1>
      </div>
      <div>{comAddress}</div>
      <div>{comPhone}</div>
      <br /> */}
      <div>To : {String(currentPo.supplier).toUpperCase()}</div>
      <div>ATTN: The contactor of the T2</div>
      <br />
      <form id='updatePurchaseOrder' onSubmit={submit}></form>
      <section id='purchaseListArea' className='mb-2'>
        <div className='fs-lead'>Materials</div>
        <div className='grid-Pur-Mtrl bd-light bg-cp-2-light m-0 p-0 fs-small'>
          {[
            'No',
            'Ref_No',
            'Color',
            'SPEC',
            `Unit Price ()`,
            'Qantity',
            `Amount ()`,
          ].map((i) => (
            <div
              key={`purTitle${i}`}
              className='bd-light v-center-content p-05 f-wrap'
            >
              {i}
            </div>
          ))}
        </div>
        {caseMtrls.map((mtrl) => {
          if (mtrl.supplier == currentPo.supplier) {
            theNumber = theNumber + 1;
            // console.log(mtrl.supplier);
            return (
              <PoItem
                key={mtrl.id}
                mtrl={mtrl}
                theNumber={theNumber}
                className='noBreak whenPrintFSSmall'
              />
            );
          } else {
            return null;
          }
        })}
        <div className='mt-05 h-scatter-content'>
          <div></div>
          <div>{`Subtotal : `}</div>
        </div>
      </section>

      <Conditions
        onClick={onClick}
        subjects={currentPo.conditions}
        deleteBtnName='deleteCondition'
        deleteBtnOnClick={onClick}
        selectName='condition'
        selectOnChange={onClick}
        inputName='conditionDescription'
        inputOnChange={onClick}
      />
      {/*   onClick,
  subjects,
  deleteBtnName,
  deleteBtnOnClick,
  selectName,
  selectOnChange,
  inputName,
  inputOnChange,
  itemClassName, */}

      {/* <br />
      <div>Conditions :</div>
      <div>Payment :</div>
      <div>Delivery :</div>
      <div>Shipment :</div>
      <div>Packing :</div>
      <div>Forwarder :</div>
      <div>Inspection Certificate :</div>
      <div>Shipping samples :</div>
      <div>Remark :</div>
      <div>Shipping Mark :</div> */}
    </div>
  );
};

export default PurchaseOrder;
