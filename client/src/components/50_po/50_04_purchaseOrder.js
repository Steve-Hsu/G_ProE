import React, { useContext, Fragment, useEffect } from 'react';
import PurContext from '../../context/pur/purContext';
import AuthUserContext from '../../context/authUser/authUserContext';
import PoItem from './50_04_01_poItem';

const OrderSummary = () => {
  // const { downloadCase } = caseContext;

  const purContext = useContext(PurContext);
  const { currentOrderSummary, currentPo, getMaterialPrice } = purContext;
  const { caseMtrls } = currentOrderSummary;

  const authUserContext = useContext(AuthUserContext);
  const { comName, comNameTail, comAddress, comPhone } = authUserContext;

  useEffect(() => {
    const currentMtrls = caseMtrls.filter((mtrl) => {
      return mtrl.supplier === currentPo;
    });

    getMaterialPrice(currentPo, currentMtrls);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      {/* {currentPoPriceList === [] ? null : (
        <div> */}
      <div>
        <h1>
          {comName} {comNameTail}
        </h1>
      </div>
      <div>{comAddress}</div>
      <div>{comPhone}</div>
      <br />
      <div>To : {String(caseMtrls[0].supplier).toUpperCase()}</div>
      <div>ATTN: The contactor of the T2</div>
      <br />
      {caseMtrls.map((mtrl) => {
        if (mtrl.supplier == currentPo) {
          console.log(mtrl.supplier);
          return <PoItem key={mtrl.id} mtrl={mtrl} />;
        } else {
          return null;
        }
      })}
      <br />
      <div>Conditions :</div>
      <div>Payment :</div>
      <div>Delivery :</div>
      <div>Shipment :</div>
      <div>Packing :</div>
      <div>Forwarder :</div>
      <div>Inspection Certificate :</div>
      <div>Shipping samples :</div>
      <div>Remark :</div>
      <div>Shipping Mark :</div>
    </Fragment>
  );
};

export default OrderSummary;
