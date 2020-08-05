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
  const { suppliers } = currentOrderSummary;

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
      {/* <button value={null} onClick={onClick}>
        Go Back
      </button> */}
    </Fragment>
  );
};

export default OrderSummary;
