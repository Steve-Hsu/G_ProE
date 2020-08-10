import React, { useContext, Fragment } from 'react';
import PurContext from '../../context/pur/purContext';

const PoItem = ({ mtrl }) => {
  const purContext = useContext(PurContext);
  const { currentPoPriceList } = purContext;
  //   const { suppliers } = currentOrderSummary;

  //   const labelSwitcher = (label) => {
  //     switch (label) {
  //       case 'osNo':
  //         return 'Order Summary No.';
  //       default:
  //         return label.charAt(0).toUpperCase() + label.slice(1);
  //     }
  //   };

  //   const onClick = (e) => {
  //     e.preventDefault();
  //     switchPage(e.target.value);
  //   };
  const { supplier, ref_no, mColor, mSizeSPEC, purchaseQtySumUp } = mtrl;
  const currentMtrlPrice = currentPoPriceList.find(({ id }) => id === mtrl.id);

  // The loading may later than the mount of the component, so here set the default value for these variables to ref
  let unit = '';
  let currency = '';
  let mPrice = 0;
  let moq = 0;
  let moqPrice = 0;
  if (currentMtrlPrice) {
    unit = currentMtrlPrice.unit;
    currency = currentMtrlPrice.currency;
    mPrice = currentMtrlPrice.mPrice;
    moq = currentMtrlPrice.moq;
    moqPrice = currentMtrlPrice.moqPrice;
  }

  return (
    <Fragment>
      <div className='p-1 grid-15 test-4'>
        <div className='gridCol-1-3 test-1'>{ref_no}</div>
        <div className='gridCol-3-7 test-3'>Description</div>
        <div className='gridCol-7-9 test-1'>{mColor}</div>
        <div className='gridCol-9-10 test-3'>{mSizeSPEC}</div>
        <div className='gridCol-10-11 test-1'>{mPrice}</div>
        <div className='gridCol-11-12 test-3'>{currency}</div>
        <div className='gridCol-12-13 test-1'>/{unit}</div>
        <div className='gridCol-13-14 test-3'>{purchaseQtySumUp}</div>
        <div className='gridCol-14-16 test-1'>{purchaseQtySumUp * mPrice}</div>
      </div>
    </Fragment>
  );
};

export default PoItem;
