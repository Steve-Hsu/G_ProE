import React, { useContext, Fragment } from 'react';
import QuoContext from '../../context/quo/quoContext';
import CaseContext from '../../context/cases/casesContext';
import PopoverContext from '../../context/popover/popoverContext';
import DeletePopover from '../layout/DeletePopover';
import QuoMtrl from './40_03_01_quoMtrl';

const QuoForm = () => {
  const quoContext = useContext(QuoContext);
  const caseContext = useContext(CaseContext);
  const popoverContext = useContext(PopoverContext);
  const {
    switchQuoForm,
    downLoadQuoForm,
    currentQuoForm,
    quotateFor,
  } = quoContext;
  const { quoNo, currency, cmpts, mQuos, otherExpenses, fob } = currentQuoForm;

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
    switchQuoForm(null);
  };

  return (
    <Fragment>
      <div className='p-1 container container-with-navbar'>
        <button onClick={onClick}>Yes</button>{' '}
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
          {sizes.map((size) => {
            return <span key={size.id}>{size.gSize}</span>;
          })}
          {mtrls.map((mtrl) => (
            <QuoMtrl key={`quoMtrl${mtrl.id}`} mtrl={mtrl} />
          ))}
        </form>
      </div>
    </Fragment>
  );
};

export default QuoForm;
