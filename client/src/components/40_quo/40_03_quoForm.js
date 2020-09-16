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

//element
import Select from '../elements/select/Select';
import GoBackBtn from '../elements/btns/GoBackBtn';
import SqBtnLarge from '../elements/btns/SqBtnLarge';

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
  const d = new Date();
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const theTime = String(
    d.getDate() + '/' + months[d.getMonth()] + '/' + d.getFullYear()
  );

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
        <div className='h-scatter-content'>
          <div></div>
          <div className='fs-tiny'>
            <div>No : {quoNo} </div>
            <div>Date : {theTime}</div>
          </div>
        </div>
        <section className='h-20 w-100 mt-05 mb-3' id='formHead'>
          <form id='quoForm' onSubmit={onSubmitQuoForm} />
          <div className='fs-large h-center-content '>
            {comName} {comNameTail}
          </div>
          <div className='h-center-content '>{comAddress}</div>
        </section>
        <section id='formInformation'>
          {/* <div>Case Number : {cNo}</div>

          <div>Quotation for : {quotateFor}</div>
          <div>Quotation Type : {caseType}</div> */}

          <div>Client : {client}</div>
          <div>Style : {style}</div>
          <div>Style total sizes : {sizes ? sizes.length : 0}</div>
          <div>Style total colorways {cWays ? sizes.length : 0} Color Ways</div>
        </section>
        <section id='QuotationArea'>
          <div>
            {quoSizes.length} Quotated Sizes :{' '}
            {quoSizes.map((size) => (
              <span key={`quotatedsize${size}`}>{size}, </span>
            ))}
          </div>

          <div>
            {quocWays.length} Quotated colorWays :{' '}
            {quocWays.map((cWay) => (
              <span key={`quotatedcway${cWay}`}>{cWay}, </span>
            ))}
          </div>

          <div className='v-center-content'>
            {' '}
            <div>Quotation in : </div>
            <div style={{ width: '10rem' }}>
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
          <div className='v-center-content mb-2'>
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
          <div className='fs-lead'>Materials</div>
          <div className='grid-Quo-Mtrl bd-light bg-cp-2-light m-0 p-0'>
            {[
              'Item',
              'Description',
              'Consuption',
              'Unit',
              'Unit Price',
              'Currency',
              'Subtotal',
            ].map((i) => (
              <div
                key={`mQuosTitle${i}`}
                className='bd-light v-center-content p-05'
              >
                {i}
              </div>
            ))}
          </div>
          {mtrls.map((mtrl) => (
            <QuoMtrl
              key={`quoMtrl${mtrl.id}`}
              mtrl={mtrl}
              className='noBreak'
            />
          ))}
          <div className='mt-05 mb-2 h-scatter-content'>
            <div></div>
            <div>{`Subtotal of material : ${mQuosTotal}`}</div>
          </div>
          {/* <button name='addOtherExpense' onClick={onClick}>
            Add other expense
          </button> */}
          <div className='fs-lead'>Other Expanses</div>
          <SqBtnLarge
            name='addOtherExpense'
            onClick={onClick}
            label='Add other expense'
            className='noPrint w-15vw mb-05'
          />

          <div className='grid-Quo-otherExpanse bd-light bg-cp-2-light m-0 p-0'>
            {/* Row of title */}
            {['Cost', 'Description', 'Currency', 'Figure'].map((i) => (
              <div
                key={`otherExpenseTitle${i}`}
                className='bd-light v-center-content p-05'
              >
                {i}
              </div>
            ))}
          </div>
          {/* <div
            className={`grid-Quo-otherExpanse m-0 p-0 bd-light bd-no-t mt-0 mb-0`}
          >
            <div className='bd-light bd-no-t v-center-content p-05'>CM</div>
            <div className='bd-light bd-no-t v-center-content p-05'>
              Cuting and making
            </div>
            <div className='bd-light bd-no-t v-center-content p-05'>
              {currency}
            </div>
            <div className='bd-light bd-no-t v-center-content'>
              <input
                type='number'
                step='.01'
                name='cm'
                onChange={addNumber}
                id={`cm${_id}`}
                value={cm || ''}
                className='whenPrintNoBorder'
                // style={{ width: '5rem' }}
              />
            </div>
          </div> */}
          {otherExpenses.map((oE) => (
            <QuoOtherEx
              key={`otherExpense${oE.id}`}
              otherExpense={oE}
              className='noBreak bd-light mt-0 mb-0'
            />
          ))}

          <div className='mt-05 mb-2 h-scatter-content'>
            <div></div>
            <div>{`Subtotal of other expenses : ${otherExpensesTotal}`}</div>
          </div>
          <div className='fs-large'>{`FOB : ${fob}`}</div>
        </section>
      </div>
    </Fragment>
  );
};

export default QuoForm;
