import React, { useContext, Fragment } from 'react';
// Components
import LeftBar from '../layout/LeftBar';
// import CaseSelector from '../50_po/50_01_caseSelector';
import ItemSelector from '../itemSelector/ItemSelector';
import OsSelector from '../50_po/50_02_osSelector';
import OrderSummary from '../50_po/50_03_orderSummary';
import PurchaseOrder from '../50_po/50_04_purchaseOrder';
import GoBackBtn from '../elements/btns/GoBackBtn';

// Context
import PurContext from '../../context/pur/purContext';
import DeletePopover from '../../components/layout/DeletePopover';
import PopoverContext from '../../context/popover/popoverContext';

const Purchase = (props) => {
  const purContext = useContext(PurContext);
  const {
    openPage,
    switchPage,
    selectedCases,
    createOrderSummary,
  } = purContext;
  const currentPath = props.location.pathname;

  const popoverContext = useContext(PopoverContext);
  const { popover, current } = popoverContext;

  const goBack = () => {
    props.history.push('/api/case/director');
  };

  const onClick = (e) => {
    e.preventDefault();
    switchPage(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('order summary is triggered');
    createOrderSummary(selectedCases);
  };

  return (
    <Fragment>
      {popover ? <DeletePopover key={current._id} current={current} /> : null}
      {/* Grid-1 */}
      {openPage === 'caseSelector' ? (
        <div className='grid-1-4'>
          <LeftBar currentPath={currentPath} />
          <form id='purchase' onSubmit={onSubmit}>
            <ItemSelector props={props} purpose='purCaseSelector' />
          </form>

          {/* <div className='p-1 container container-with-navbar'>
            <button onClick={onClick}>go back</button>
            <CaseSelector />
          </div> */}
        </div>
      ) : openPage === 'osSelector' ? (
        <div className='grid-1-4'>
          <LeftBar currentPath={currentPath} />
          <div className='container container-with-navbar'>
            <button onClick={goBack}>go back</button>
            <OsSelector />
          </div>
        </div>
      ) : openPage === 'orderSummary' ? (
        <Fragment>
          <div className='container container-with-navbar'>
            <button value='osSelector' onClick={onClick}>
              go back
            </button>
            <OrderSummary />
          </div>
        </Fragment>
      ) : openPage === 'purchaseOrder' ? (
        <Fragment>
          <div className='container container-with-navbar'>
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
