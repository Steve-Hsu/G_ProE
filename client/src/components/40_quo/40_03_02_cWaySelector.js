import React, { useContext, Fragment } from 'react';
import QuoContext from '../../context/quo/quoContext';

const CWaySelector = ({ cWays, className }) => {
  const quoContext = useContext(QuoContext);

  const { currentQuoForm, updateQuocWay, quotation } = quoContext;

  const quoFormId = currentQuoForm._id;

  const onClick = (e) => {
    e.preventDefault();
    if (currentQuoForm.id !== null) {
      const sizeValue = e.target.name;
      updateQuocWay(quoFormId, sizeValue);
    }
  };

  const btnClickedStyle = (subject) => {
    const quoForm = quotation.quoForms.find(({ _id }) => _id === quoFormId);
    const haveTheQuocWay = quoForm.quocWays.includes(subject);
    if (haveTheQuocWay) {
      return {
        color: 'white',
        background: 'var(--primary-color)',
        // transition: 'all 0.5s',
        border: '0',
        borderBottom: '1px solid var(--primary - color)',
      };
    } else {
      return {};
    }
  };

  return (
    <div className={`flexBox ${className}`}>
      {cWays.map((i) => {
        return (
          <button
            key={`sizeSelector${i.id}`}
            name={i.gClr}
            type='button'
            className='btn'
            onClick={onClick}
            style={btnClickedStyle(i.gClr)}
          >
            {i.gClr}
          </button>
        );
      })}
    </div>
  );
};

export default CWaySelector;
