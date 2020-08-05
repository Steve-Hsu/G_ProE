import React, { useContext, Fragment } from 'react';
// Components
import LeftBar from '../layout/LeftBar';
import CaseSelector from '../50_po/50_01_caseSelector';
import OsSelector from '../50_po/50_02_osSelector';
import orderSummary from '../50_po/50_03_orderSummary';
// Context
import PurContext from '../../context/pur/purContext';
import OrderSummary from '../50_po/50_03_orderSummary';

const Purchase = (props) => {
  const purContext = useContext(PurContext);
  const { openPage, switchPage } = purContext;
  const currentPath = props.location.pathname;

  const onClick = (e) => {
    e.preventDefault();
    switchPage(e.target.value);
  };

  return (
    <div className='grid-1-4'>
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
        <Fragment>
          <LeftBar currentPath={currentPath} />
          <div className='p-1 container container-with-navbar'>
            <button onClick={onClick}>go back</button>
            <CaseSelector />
          </div>
        </Fragment>
      ) : openPage === 'osSelector' ? (
        <Fragment>
          <LeftBar currentPath={currentPath} />
          <div className='p-1 container container-with-navbar'>
            <button onClick={onClick}>go back</button>
            <OsSelector />
          </div>
        </Fragment>
      ) : openPage === 'orderSummary' ? (
        <Fragment>
          <div className='p-1 container container-with-navbar'>
            <button value='osSelector' onClick={onClick}>
              go back
            </button>
            <OrderSummary />
          </div>
        </Fragment>
      ) : null}
    </div>
  );
};
export default Purchase;
