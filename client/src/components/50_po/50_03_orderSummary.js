import React, { useContext, Fragment } from 'react';
import PurContext from '../../context/pur/purContext';

const OrderSummary = () => {
  // const { downloadCase } = caseContext;
  const labelList = ['osNo'];
  const purContext = useContext(PurContext);
  const {
    selectedCases,
    selectCase,
    switchPage,
    switchOsCurrent,
    currentOrderSummary,
  } = purContext;
  const { osNo, cNos, suppliers } = currentOrderSummary;

  const labelSwitcher = (label) => {
    switch (label) {
      case 'osNo':
        return 'Order Summary No.';
      default:
        return label.charAt(0).toUpperCase() + label.slice(1);
    }
  };

  const onClick = (e) => {
    e.preventDefault();
    switchPage(e.target.value);
  };

  return (
    <Fragment>
      <div>The Order Summary {osNo}</div>
      <div>
        The case purchased{' '}
        {cNos.map((cNo) => {
          return cNo;
        })}
      </div>
      The Purchase orders
      {suppliers.map((supplier) => (
        <div key={supplier} className='grid-4'>
          <div>{supplier}</div>

          <button
            id={supplier}
            value='purchaseOrder'
            className='mb-1 p-1 card lead'
            //   style={btnClickedStyle(caseItem._id)}
            onClick={onClick}
          >
            Check PO{' '}
          </button>
        </div>
      ))}
    </Fragment>
  );
};

export default OrderSummary;
