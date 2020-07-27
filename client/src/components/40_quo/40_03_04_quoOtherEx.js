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

  //@ Style
  const deleteBtnPosition = {
    top: ' 70%',
    left: '100%',
    transform: 'translate(-2rem, -1rem)',
  };
  //words length limit
  const maxWdsLength = '100';

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
          onChange={onChange}
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
