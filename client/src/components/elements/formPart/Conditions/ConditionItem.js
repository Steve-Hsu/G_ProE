import React, { useContext } from 'react';
import QuoContext from '../../../../context/quo/quoContext';
import DeleteBtnSmall from '../../btns/DeleteBtnSmall';
import SqBtnLarge from '../../btns/SqBtnLarge';
import Select from '../../select/Select';

const ConditionItem = ({
  subject,
  itemClassName,
  deleteBtnName,
  deleteBtnOnClick,
  selectName,
  selectOnChange,
  inputName,
  inputOnChange,
}) => {
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
    inputOnChange(e);
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

  return (
    // <div className='mb-1 p-1 card'>
    <div>
      <div className={`grid-Quo-condition m-0 p-0 noPrint ${itemClassName}`}>
        <div className='v-center-content noPrint'>
          <div className='noPrint p-05' style={{ width: '50px' }}>
            <DeleteBtnSmall
              name={deleteBtnName}
              value={subject.id}
              onClick={deleteBtnOnClick}
              className='noPrint m-0'
            />
          </div>

          <Select
            purpose={selectName}
            id={`${selectName}${subject.id}`}
            subject={subject}
            name={selectName}
            onChange={selectOnChange}
            selectedOption={subject[selectName]}
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
            id={`${inputName}${subject.id}`}
            name={inputName}
            maxLength='200'
            value={subject[inputName] || ''}
            onChange={inputOnChange}
            className='whenPrintNoBorder whenPrintFSSmall ml-05'
          />
        </div>
      </div>
      {/* Show only when print */}
      <div className='showWhenPrint w-100 fs-small'>
        <span className='fw-bold'>{subject.condition} : </span>
        {subject.conditionDescription}
      </div>
    </div>
  );
};

export default ConditionItem;
