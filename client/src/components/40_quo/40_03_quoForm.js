import React, { useContext, Fragment } from 'react';
import QuoContext from '../../context/quo/quoContext';
import CaseContext from '../../context/cases/casesContext';
import PopoverContext from '../../context/popover/popoverContext';
import DeletePopover from '../layout/DeletePopover';
import SizeSelector from './40_03_01_sizeSelector';
import CWaySelector from './40_03_02_cWaySelector';
import QuoMtrl from './40_03_03_quoMtrl';
import QuoOtherEx from './40_03_04_quoOtherEx';
const QuoForm = () => {
  const quoContext = useContext(QuoContext);
  const caseContext = useContext(CaseContext);
  const popoverContext = useContext(PopoverContext);
  const {
    switchQuoForm,
    downLoadmtrlPrice,
    currentQuoForm,
    quotateFor,
    uploadQuoForm,
    isQuotating,
    updateCurrentQuoForm,
  } = quoContext;
  const {
    _id,
    quoNo,
    quoSizes,
    quocWays,
    currency,
    mQuos,
    mQuosTotal,
    otherExpenses,
    cm,
    otherExpensesTotal,
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
  const onSubmitQuoForm = (e) => {
    console.log('here triggered');
    e.preventDefault();
    // uploadQuoForm(isQuotating, true);

    uploadQuoForm(isQuotating, false, currentQuoForm).then((result) => {
      console.log('QuoForm is updated');
    });
  };

  const onChange = (e) => {
    e.preventDefault();
    updateCurrentQuoForm(e);
  };

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
        break;
      case 'addOtherExpense':
        updateCurrentQuoForm(e);
        break;
      default:
    }
  };

  const addNumber = (e) => {
    e.preventDefault();
    const num = e.target.value;
    const Max = 99999;
    if (String(num).length > String(Max).length) {
      e.target.value = Max;
      updateCurrentQuoForm(e);
    } else {
      updateCurrentQuoForm(e);
    }
  };

  return (
    <Fragment>
      <div className='container container-with-navbar' id='quotationForm'>
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
          <div>Quotation currency</div>
          <input
            type='text'
            name='currency'
            onChange={onChange}
            id={`currency${_id}`}
            value={currency || ''}
          />
          <div>Sizes : Total {sizes.length} sizes</div>
          <div>Quotated Sizes</div>
          <SizeSelector sizes={sizes} />

          <div>Color Ways : Total {cWays.length} Color Ways</div>
          <div>Quotated colorWays</div>
          <CWaySelector cWays={cWays} />
          <div>
            <div>CM</div>
            <input
              type='number'
              step='.01'
              name='cm'
              onChange={addNumber}
              id={`cm${_id}`}
              min='0'
              max='99999'
              value={cm || ''}
            />
            <button name='quotationBtn' value={_id} onClick={onClick}>
              Quotate
            </button>
          </div>
          {mtrls.map((mtrl) => (
            <QuoMtrl key={`quoMtrl${mtrl.id}`} mtrl={mtrl} />
          ))}
          <div>{`Subtotal of material : ${mQuosTotal}`}</div>
          <button name='addOtherExpense' onClick={onClick}>
            Add other expense
          </button>
          {otherExpenses.length === 0
            ? null
            : otherExpenses.map((oE) => (
                <QuoOtherEx key={`otherExpense${oE.id}`} otherExpense={oE} />
              ))}
          <div>{`Subtotal of material : ${otherExpensesTotal}`}</div>
          <div>{`FOB : ${fob}`}</div>
        </form>
      </div>
    </Fragment>
  );
};

export default QuoForm;
