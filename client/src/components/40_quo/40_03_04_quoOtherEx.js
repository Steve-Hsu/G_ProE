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

  //@ Style
  const deleteBtnPosition = {
    top: ' 70%',
    left: '100%',
    transform: 'translate(-2rem, -1rem)',
  };

  return (
    // <div className='mb-1 p-1 card'>
    <div className='grid-1-5-1-1-1-1-1 card mb-1 p-1'>
      <div>{otherExpense.costName}</div>
      <div>{otherExpense.costDescription}</div>
      <div>{otherExpense.cost}</div>
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
