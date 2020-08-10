import React, { useContext, Fragment } from 'react';
// Components
import LeftBar from '../layout/LeftBar';
import CaseSelector from '../50_po/50_01_caseSelector';
import OsSelector from '../50_po/50_02_osSelector';
import OrderSummary from '../50_po/50_03_orderSummary';
import PurchaseOrder from '../50_po/50_04_purchaseOrder';

// Context
import PurContext from '../../context/pur/purContext';

const Purchase = (props) => {
  const purContext = useContext(PurContext);
  const { openPage, switchPage } = purContext;
  const currentPath = props.location.pathname;

  const onClick = (e) => {
    e.preventDefault();
    switchPage(e.target.value);
  };

  return (
    <Fragment>
      {/* Grid-1 */}
      {openPage === null ? (
        <div className='p-1 container container-with-navbar'>
          <button value='caseSelector' onClick={onClick}>
            CaseSelector
          </button>
          <button value='osSelector' onClick={onClick}>
            Quotation for garments
          </button>
        </div>
      ) : openPage === 'caseSelector' ? (
        <div className='grid-1-4'>
          <LeftBar currentPath={currentPath} />
          <div className='p-1 container container-with-navbar'>
            <button onClick={onClick}>go back</button>
            <CaseSelector />
          </div>
        </div>
      ) : openPage === 'osSelector' ? (
        <div className='grid-1-4'>
          <LeftBar currentPath={currentPath} />
          <div className='p-1 container container-with-navbar'>
            <button onClick={onClick}>go back</button>
            <OsSelector />
          </div>
        </div>
      ) : openPage === 'orderSummary' ? (
        <Fragment>
          <div className='p-1 container container-with-navbar'>
            <button value='osSelector' onClick={onClick}>
              go back
            </button>
            <OrderSummary />
          </div>
        </Fragment>
      ) : openPage === 'purchaseOrder' ? (
        <Fragment>
          <div className='p-1 container container-with-navbar'>
            <button value='orderSummary' onClick={onClick}>
              go back
            </button>
            <PurchaseOrder />
          </div>
        </Fragment>
      ) : null}
    </Fragment>
  );
};
export default Purchase;
