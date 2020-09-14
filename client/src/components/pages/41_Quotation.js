import React, { useContext, Fragment } from 'react';
import QuoContext from '../../context/quo/quoContext';
import PopoverContext from '../../context/popover/popoverContext';
import SrMtrlContext from '../../context/srMtrl/srMtrlContext';

// Components
import LeftBar from '../layout/LeftBar';
// import QuoCaseSelector from '../../components/40_quo/40_01_quoCaseSelector';
import QuoFormSelector from '../../components/40_quo/40_02_quoFormSelector';
import QuoForm from '../../components/40_quo/40_03_quoForm';
import ItemSelector from '../itemSelector/ItemSelector';
import Table from '../elements/table/Table';
import DeletePopover from '../../components/layout/DeletePopover';
// import GoBackBtn from '../elements/btns/GoBackBtn';
// quoForm

const Quotation = (props) => {
  // Context
  const quoContext = useContext(QuoContext);
  const popoverContext = useContext(PopoverContext);
  const srMtrlContext = useContext(SrMtrlContext);
  const { srMtrls, updateMPricesQuotation } = srMtrlContext;
  const {
    // switchPage,
    quotateFor,
    isQuotating,
    openQuoForm,
    // getCaseList,
  } = quoContext;
  const { popover, current } = popoverContext;
  const currentPath = props.location.pathname;

  // const onClick = (e) => {
  //   e.preventDefault();
  //   switchPage(e.target.value);
  //   // if (e.target.value === 'garment') {
  //   //   getCaseList();
  //   // }
  // };

  const onSubmitSrMtrl = async (e) => {
    console.log('yes the submit is hit');
    e.preventDefault();
    const body = [];
    await srMtrls.map((srMtrl) => {
      body.push({
        id: srMtrl._id,
        mainPrice: srMtrl.mainPrice,
        mPrices: srMtrl.mPrices,
      });
    });
    if (currentPath === '/api/quogarment') {
      updateMPricesQuotation(body);
    }
  };

  return (
    <Fragment>
      {/* {popover ? <DeletePopover key={current.id} current={current} /> : null} */}
      {popover ? <DeletePopover key={current._id} current={current} /> : null}
      <div className='grid-1-4'>
        {/* Grid-1 */}
        <LeftBar currentPath={currentPath} />

        {/* Grid-2 */}
        {quotateFor === 'material' ? (
          <div>
            <form id='srMtrlForm' onSubmit={onSubmitSrMtrl}></form>
            <ItemSelector
              props={props}
              purpose='quoSrMtrlSelector'
              currentPath={currentPath}
            />
          </div>
        ) : quotateFor === 'garment' ? (
          <div>
            {isQuotating === null ? (
              <ItemSelector props={props} purpose='quoCaseSelector' />
            ) : (
              <div>
                {openQuoForm === null ? <QuoFormSelector /> : <QuoForm />}
              </div>
            )}
          </div>
        ) : null}
      </div>
    </Fragment>
  );
};

export default Quotation;
