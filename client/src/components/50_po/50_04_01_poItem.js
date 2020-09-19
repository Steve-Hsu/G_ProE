import React, { useContext, Fragment } from 'react';
import PurContext from '../../context/pur/purContext';

const PoItem = ({ mtrl, theNumber, className }) => {
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
    <div className={`grid-Pur-Mtrl m-0 p-0 bd-light bd-no-t ${className}`}>
      <div className='bd-light bd-no-t v-center-content px-05 py-03'>
        {theNumber}
      </div>
      <div className='bd-light bd-no-t v-center-content px-05 py-03'>
        {ref_no}
      </div>
      <div className='bd-light bd-no-t v-center-content px-05 py-03'>
        {mColor}
      </div>
      <div className='bd-light bd-no-t v-center-content px-05 py-03'>
        {mSizeSPEC}
      </div>
      <div className='bd-light bd-no-t v-center-content px-05 py-03'>
        {mPrice}
        {currency} per {unit}
      </div>
      <div className='bd-light bd-no-t v-center-content px-05 py-03'>
        {purchaseQtySumUp}
      </div>
      <div className='bd-light bd-no-t v-center-content px-05 py-03'>
        {purchaseQtySumUp * mPrice}
      </div>
    </div>
  );
};

export default PoItem;
