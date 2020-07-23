import React, { useContext, Fragment } from 'react';
import QuoContext from '../../context/quo/quoContext';
import CaseContext from '../../context/cases/casesContext';
import PopoverContext from '../../context/popover/popoverContext';
import DeletePopover from '../layout/DeletePopover';
import SizeSelector from './40_03_01_sizeSelector';
import CWaySelector from './40_03_02_cWaySelector';
import QuoMtrl from './40_03_03_quoMtrl';
const QuoForm = () => {
  const quoContext = useContext(QuoContext);
  const caseContext = useContext(CaseContext);
  const popoverContext = useContext(PopoverContext);
  const {
    switchQuoForm,
    downLoadmtrlPrice,
    currentQuoForm,
    quotateFor,
  } = quoContext;
  const {
    _id,
    quoNo,
    quoSizes,
    quocWays,
    currency,
    cmpts,
    mQuos,
    otherExpenses,
    fob,
  } = currentQuoForm;

  const {
    cNo,
    caseType,
    style,
    client,
    cWays,
    sizes,
    gQtys,
    mtrls,
    defaultCase,
  } = caseContext;
  const { popover, current } = popoverContext;
  const onSubmitQuoForm = () => {};

  const onClick = (e) => {
    e.preventDefault();
    switch (e.target.name) {
      case 'goBackBtn':
        switchQuoForm(null);
        break;
      case 'quotationBtn':
        const body = {
          quoNo: quoNo,
          quoFormId: _id,
          quoSizes: quoSizes,
          quocWays: quocWays,
        };
        downLoadmtrlPrice(body);
      default:
    }
  };

  return (
    <Fragment>
      <div className='p-1 container container-with-navbar'>
        <button name='goBackBtn' onClick={onClick}>
          Go Back
        </button>{' '}
        <form id='quoForm' onSubmit={onSubmitQuoForm}>
          <div>Case Number : {cNo}</div>
          <div>Quotation Number : {quoNo} </div>
          <div>Now we are quotate for {quotateFor}</div>
          <div>{caseType}</div>
          <div>{style}</div>
          <div>{client}</div>
          <div>Color Ways : Total {cWays.length} Color Ways</div>
          {cWays.map((cWay) => {
            return <span key={cWay.id}>{cWay.gClr}, </span>;
          })}
          <div>Sizes : Total {sizes.length} sizes</div>
          <SizeSelector sizes={sizes} />
          <CWaySelector cWays={cWays} />
          <div>
            <button name='quotationBtn' value={_id} onClick={onClick}>
              Quotate
            </button>
          </div>
          {mtrls.map((mtrl) => (
            <QuoMtrl key={`quoMtrl${mtrl.id}`} mtrl={mtrl} />
          ))}
          <div>What?</div>
        </form>
      </div>
    </Fragment>
  );
};

export default QuoForm;
