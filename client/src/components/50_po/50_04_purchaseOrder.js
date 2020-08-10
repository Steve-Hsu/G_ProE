import React, { useContext, Fragment, useEffect } from 'react';
import PurContext from '../../context/pur/purContext';
import PoItem from './50_04_01_poItem';

const OrderSummary = () => {
  // const { downloadCase } = caseContext;

  const purContext = useContext(PurContext);
  const { currentOrderSummary, currentPo, getMaterialPrice } = purContext;
  const { caseMtrls } = currentOrderSummary;
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
      {caseMtrls.map((mtrl) => {
        if (mtrl.supplier == currentPo) {
          console.log(mtrl.supplier);
          return <PoItem key={mtrl.id} mtrl={mtrl} />;
        } else {
          return null;
        }
      })}
    </Fragment>
  );
};

export default OrderSummary;
