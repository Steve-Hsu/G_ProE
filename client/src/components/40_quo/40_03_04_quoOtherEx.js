import React, { useContext } from 'react';
import QuoContext from '../../context/quo/quoContext';

const QuoOtherEx = ({ otherExpense }) => {
  const quoContext = useContext(QuoContext);

  const {
    isQuotating,
    switchQuoFormSelector,
    currentQuoForm,
    updateCurrentQuoForm,
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

  const onClick = (e) => {
    e.preventDefault();
    updateCurrentQuoForm(e);
  };

  const onChange = (e) => {
    e.preventDefault();
    updateCurrentQuoForm(e);
  };

  const addNumber = (e) => {
    e.preventDefault();
    const num = e.target.value;
    const Max = 9999999;
    if (String(num).length > String(Max).length) {
      e.target.value = Max;
      updateCurrentQuoForm(e);
    } else {
      updateCurrentQuoForm(e);
    }
  };

  //@ Style
  const deleteBtnPosition = {
    top: ' 70%',
    left: '100%',
    transform: 'translate(-2rem, -1rem)',
  };

  return (
    // <div className='mb-1 p-1 card'>
    <div className='grid-1-5-1-1-1-1-1 card mb-1 p-1'>
      <div>
        Cost
        <input
          type='text'
          id={`costName${otherExpense.id}`}
          name='costName'
          maxLength='30'
          value={otherExpense.costName || ''}
          onChange={onChange}
        />
      </div>
      <div>
        Description
        <input
          type='text'
          id={`costDescription${otherExpense.id}`}
          name='costDescription'
          maxLength='200'
          value={otherExpense.costDescription || ''}
          onChange={onChange}
        />
      </div>
      <div>
        Figure
        <input
          type='number'
          id={`otherExpenseCost${otherExpense.id}`}
          name='otherExpenseCost'
          min='0'
          max='9999999'
          step='.01'
          value={otherExpense.cost || ''}
          onChange={addNumber}
        />
      </div>
      <button
        name='deleteOtherExpense'
        value={otherExpense.id}
        className='btn btn-fade btn-square'
        style={deleteBtnPosition}
        onClick={onClick}
      >
        x
      </button>
    </div>
    // </div>
  );
};

export default QuoOtherEx;
