import React, { useContext, Fragment } from 'react';
import PurContext from '../../context/pur/purContext';
import Board from '../elements/board/Board';

const OrderSummary = () => {
  // const { downloadCase } = caseContext;
  const purContext = useContext(PurContext);
  const { switchPage, currentOrderSummary } = purContext;
  const { osNo, cNos, suppliers } = currentOrderSummary;

  // const labelSwitcher = (label) => {
  //   switch (label) {
  //     case 'osNo':
  //       return 'Order Summary No.';
  //     default:
  //       return label.charAt(0).toUpperCase() + label.slice(1);
  //   }
  // };

  // const onClick = (e) => {
  //   e.preventDefault();
  //   switchPage(e.target.value, e.target.id);
  // };

  return (
    <Fragment>
      <div className='round-area bd-light bg-cp-1 mb-05 mt-05'>
        <div className='mb-5'>The Order Summary : {osNo}</div>
        <div>
          The case purchased :{' '}
          {cNos.map((cNo) => {
            return (
              <span key={cNo} className='ml-05'>
                {cNo}
              </span>
            );
          })}
        </div>
      </div>

      <Board
        subjects={suppliers}
        // displayTitles={suppliers}
        purpose='purchaseOrder'
        label='Purchase Order'
        toggleItemAttributes={switchPage}
      />
    </Fragment>
  );
};

export default OrderSummary;
