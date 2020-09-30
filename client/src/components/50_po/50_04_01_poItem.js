import React, { useContext, Fragment } from 'react';
import PurContext from '../../context/pur/purContext';
import SqBtnLarge from '../elements/btns/SqBtnLarge';

const PoItem = ({ osMtrl, theNumber, className }) => {
  const purContext = useContext(PurContext);
  const { currentPoPriceList, currentPo, evenMoq } = purContext;
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
  const {
    id,
    // supplier,
    ref_no,
    mColor,
    mSizeSPEC,
    purchaseQtySumUp,
    purchaseLossQtySumUp,
    purchaseMoqQty,
  } = osMtrl;
  const currentMtrlPrice = currentPoPriceList.find(
    ({ osMtrlId }) => osMtrlId === osMtrl.id
  );

  // The loading may later than the mount of the component, so here set the default value for these variables to ref
  let unit = '';
  let currency = '';
  let mPrice = 0;
  let moq = 0;
  let moqPrice = 0;

  // if (currentPo.poConfirmDate) {
  //   unit = osMtrl.price.poUnit;
  //   currency = osMtrl.price.currency;
  //   mPrice = osMtrl.price.mPrice;
  //   moq = osMtrl.price.moq;
  //   moqPrice = osMtrl.price.moqPrice;
  // } else {
  if (currentMtrlPrice) {
    unit = currentMtrlPrice.poUnit;
    currency = currentMtrlPrice.currency;
    mPrice = currentMtrlPrice.mPrice;
    moq = currentMtrlPrice.moq;
    moqPrice = currentMtrlPrice.moqPrice;
    // }
  } else {
    if (osMtrl.price) {
      unit = osMtrl.price.poUnit;
      currency = osMtrl.price.currency;
      mPrice = osMtrl.price.mPrice;
      moq = osMtrl.price.moq;
      moqPrice = osMtrl.price.moqPrice;
    }
  }

  const displayPrice = () => {
    if (moq) {
      if (purchaseQtySumUp + purchaseLossQtySumUp + purchaseMoqQty > moq) {
        return mPrice;
      } else {
        return moqPrice;
      }
    } else {
      return mPrice;
    }
  };

  const moqLabel = () => {
    if (moq) {
      if (purchaseQtySumUp + purchaseLossQtySumUp + purchaseMoqQty > moq) {
        return null;
      } else {
        return <div className='fs-tiny fc-cp-2-c'>MOQ Price</div>;
      }
    } else {
      return null;
    }
  };

  const onClick = () => {
    evenMoq(moq, purchaseQtySumUp + purchaseLossQtySumUp, purchaseMoqQty, id);
  };

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
      <div className='bd-light bd-no-t px-05 py-03'>
        {moqLabel()}
        <div className='v-center-content'>
          {displayPrice()} {currency}/{unit}
        </div>
      </div>
      <div className='bd-light bd-no-t px-05 py-03'>
        <div className='fs-tiny fc-cp-2-c v-center-content noPrint'>
          <div>Required : {purchaseQtySumUp}</div>
          <div>Loss : {purchaseLossQtySumUp}</div>
          {moq && purchaseQtySumUp + purchaseLossQtySumUp < moq ? (
            <div>Even Moq : {purchaseMoqQty} </div>
          ) : null}
        </div>
        <div className='h-scatter-content'>
          <div className='v-center-content'>
            {purchaseQtySumUp + purchaseLossQtySumUp + purchaseMoqQty}
          </div>
          {moq && currentPo.poConfirmDate === null ? (
            purchaseQtySumUp + purchaseLossQtySumUp > moq ? null : (
              <div className='noPrint'>
                <SqBtnLarge
                  label={purchaseMoqQty === 0 ? 'Even MOQ' : 'Cancel MOQ'}
                  onClick={onClick}
                />
              </div>
            )
          ) : null}
        </div>
      </div>
      <div className='bd-light bd-no-t v-center-content px-05 py-03'>
        {(purchaseQtySumUp + purchaseLossQtySumUp + purchaseMoqQty) *
          displayPrice()}
      </div>
    </div>
  );
};

export default PoItem;
