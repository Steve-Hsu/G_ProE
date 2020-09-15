import React, { useContext, Fragment } from 'react';
//Context
import QuoContext from '../../context/quo/quoContext';
import AuthUserContext from '../../context/authUser/authUserContext';
import PopoverContext from '../../context/popover/popoverContext';

//Component
import DeletePopover from '../layout/DeletePopover';
import SizeSelector from './40_03_01_sizeSelector';
import CWaySelector from './40_03_02_cWaySelector';
import QuoMtrl from './40_03_03_quoMtrl';
import QuoOtherEx from './40_03_04_quoOtherEx';
import goBackBtn from '../elements/btns/GoBackBtn';

//element
import Select from '../elements/select/Select';
import GoBackBtn from '../elements/btns/GoBackBtn';

const QuoForm = () => {
  const authUserContext = useContext(AuthUserContext);
  const { comName, comNameTail, comAddress } = authUserContext;
  const quoContext = useContext(QuoContext);
  const popoverContext = useContext(PopoverContext);
  const {
    switchQuoForm,
    downLoadmtrlPrice,
    currentQuoForm,
    quotateFor,
    uploadQuoForm,
    isQuotating,
    updateCurrentQuoForm,
    quotation,
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
  const theCases = quotation.theCase;
  let cWays,
    sizes,
    gQtys,
    mtrls = [];
  let cNo,
    caseType,
    style,
    client = '';

  if (theCases) {
    cNo = theCases.cNo;
    caseType = theCases.caseType;
    style = theCases.caseType;
    client = theCases.client;
    cWays = theCases.cWays;
    sizes = theCases.sizes;
    gQtys = theCases.gQtys;
    mtrls = theCases.mtrls;
  }

  // const {
  //   cNo,
  //   caseType,
  //   style,
  //   client,
  //   cWays,
  //   sizes,
  //   gQtys,
  //   mtrls,
  //   defaultCase,
  // } = quotation.theCase;
  const { popover, current } = popoverContext;
  const onSubmitQuoForm = (e) => {
    console.log('here triggered');
    e.preventDefault();
    // uploadQuoForm(isQuotating, true);

    uploadQuoForm(isQuotating, false, currentQuoForm)
      .then(() => {
        console.log('QuoForm is updated');
      })
      .then(() => {
        switchQuoForm(_id);
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
      <div
        className='container container-with-navbar whenPrint'
        id='quotationForm'
      >
        <GoBackBtn name='goBackBtn' onClick={onClick} className='noPrint' />
        {/* <button name='goBackBtn' onClick={onClick}>
          Go Back
        </button>{' '} */}
        <section className='h-20 w-100 test-2 mt-05' id='formHead'>
          <form id='quoForm' onSubmit={onSubmitQuoForm} />
          <div className='fs-large h-center-content '>
            {comName} {comNameTail}
          </div>
          <div className='h-center-content '>{comAddress}</div>
        </section>
        <section id='formInformation'>
          <div>Case Number : {cNo}</div>
          <div>Quotation Number : {quoNo} </div>
          <div>Quotation for : {quotateFor}</div>
          <div>Quotation Type : {caseType}</div>
          <div className='flexBox'>
            {' '}
            <div>Quotation currency : </div>
            <div style={{ width: '6rem' }}>
              {'  '}
              <Select
                purpose='currency'
                onChange={onChange}
                name='currency'
                id={_id}
                subject={currentQuoForm}
                // value={currency || ''}
                selectedOption={currency}
              />
            </div>
          </div>

          <div>Client : {client}</div>
          <div>Style : {style}</div>
          <div>Total {sizes ? sizes.length : 0} sizes</div>
          <div>Total {cWays ? sizes.length : 0} Color Ways</div>
        </section>
        <section id='QuotationArea'>
          <div>
            {quoSizes.length} Quotated Sizes :{' '}
            {quoSizes.map((size) => (
              <span key={`quotatedsize${size}`}>{size}, </span>
            ))}
          </div>
          <SizeSelector sizes={sizes} className='noPrint' />

          <div>
            {quocWays.length} Quotated colorWays :{' '}
            {quocWays.map((cWay) => (
              <span key={`quotatedcway${cWay}`}>{cWay}, </span>
            ))}
          </div>
          <CWaySelector cWays={cWays} className='noPrint' />
          <div className='flexBox'>
            <div>CM : </div>
            <input
              type='number'
              step='.01'
              name='cm'
              onChange={addNumber}
              id={`cm${_id}`}
              min='0'
              max='99999'
              value={cm || ''}
              style={{ width: '5rem' }}
            />
          </div>
          <button
            name='quotationBtn'
            value={_id}
            onClick={onClick}
            className='noPrint'
          >
            Quotate
          </button>

          <div className='grid-1-5-1-1-1-1-1 card mb-1 p-1'>
            <div>Item</div>
            <div>Description</div>
            <div>Consuption</div>
            <div>Unit</div>
            <div>Unit Price</div>
            <div>Currency</div>
            <div>Subtotal</div>
          </div>
          {mtrls.map((mtrl) => (
            <QuoMtrl
              key={`quoMtrl${mtrl.id}`}
              mtrl={mtrl}
              className='noBreak'
            />
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
          <div>{`Subtotal of other expenses : ${otherExpensesTotal}`}</div>
          <div>{`FOB : ${fob}`}</div>
        </section>
      </div>
    </Fragment>
  );
};

export default QuoForm;
