import React, { useContext } from 'react';
import QuoContext from '../../context/quo/quoContext';
import DeleteBtnSmall from '../elements/btns/DeleteBtnSmall';
import SqBtnLarge from '../elements/btns/SqBtnLarge';
import Select from '../elements/select/Select';

const QuoCondition = ({ condition, className }) => {
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
    conditions,
  } = currentQuoForm;

  const onClick = (e) => {
    e.preventDefault();
    updateCurrentQuoForm(e);
  };

  const onChange = (e) => {
    e.preventDefault();
    updateCurrentQuoForm(e);
  };

  //   const addNumber = (e) => {
  //     e.preventDefault();
  //     const num = e.target.value;
  //     const Max = 9999999;
  //     if (String(num).length > String(Max).length) {
  //       e.target.value = Max;
  //       updateCurrentQuoForm(e);
  //     } else {
  //       updateCurrentQuoForm(e);
  //     }
  //   };

  //@ Style
  const deleteBtnPosition = {
    // top: ' 50%',
    // // left: '100%',
    // transform: 'translate(0, -1rem)',
  };

  return (
    // <div className='mb-1 p-1 card'>
    <div>
      <div className={`grid-Quo-condition m-0 p-0 noPrint ${className}`}>
        <div className='v-center-content noPrint'>
          <div className='noPrint p-05' style={{ width: '50px' }}>
            <DeleteBtnSmall
              name='deleteCondition'
              value={condition.id}
              style={deleteBtnPosition}
              onClick={onClick}
              className='noPrint m-0'
            />
          </div>

          <Select
            purpose='conditions'
            id={`condition${condition.id}`}
            subject={condition}
            name='condition'
            onChange={onChange}
            selectedOption={condition.condition}
            className='noPrint'
          />
          {/* <input
          type='text'
          id={`condition${condition.id}`}
          name='condition'
          maxLength='30'
          value={condition.condition || ''}
          onChange={onChange}
          className='whenPrintNoBorder whenPrintFSSmall'
        /> */}
        </div>
        <div className='v-center-content noPrint'>
          <input
            type='text'
            id={`conditionDescription${condition.id}`}
            name='conditionDescription'
            maxLength='200'
            value={condition.conditionDescription || ''}
            onChange={onChange}
            className='whenPrintNoBorder whenPrintFSSmall ml-05'
          />
        </div>
      </div>
      {/* Show only when print */}
      <div className='showWhenPrint w-100 fs-small'>
        <span className='fw-bold'>{condition.condition} : </span>
        {condition.conditionDescription}
      </div>
    </div>
  );
};

export default QuoCondition;
