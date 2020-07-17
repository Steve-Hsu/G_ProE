import React, { useContext, Fragment } from 'react';
import QuoContext from '../../context/quo/quoContext';

const SizeSelector = ({ sizes }) => {
  const quoContext = useContext(QuoContext);

  const { currentQuoForm, updateQuoSize, quotation } = quoContext;

  const quoFormId = currentQuoForm.id;

  const onClick = (e) => {
    e.preventDefault();
    if (currentQuoForm.id !== null) {
      const sizeValue = e.target.name;
      updateQuoSize(quoFormId, sizeValue);
    }
  };
  const btnClickedStyle = (subject) => {
    const quoForm = quotation.quoForms.find(({ id }) => id === quoFormId);
    const haveTheQuoSize = quoForm.quoSizes.includes(subject);
    if (haveTheQuoSize) {
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
    <div>
      {sizes.map((i) => {
        return (
          <button
            key={`sizeSelector${i.id}`}
            name={i.gSize}
            type='button'
            className='btn btn-dropdown lead'
            onClick={onClick}
            style={btnClickedStyle(i.gSize)}
          >
            {i.gSize}
          </button>
        );
      })}
    </div>
  );
};

export default SizeSelector;
