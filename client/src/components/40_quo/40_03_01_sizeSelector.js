import React, { useContext, Fragment } from 'react';
import QuoContext from '../../context/quo/quoContext';

const SizeSelector = ({ sizes, className }) => {
  const quoContext = useContext(QuoContext);

  const { currentQuoForm, updateQuoSize, quotation } = quoContext;

  const quoFormId = currentQuoForm._id;

  const onClick = (e) => {
    e.preventDefault();
    if (currentQuoForm._id !== null) {
      const sizeValue = e.target.name;
      updateQuoSize(quoFormId, sizeValue);
    }
  };
  const btnClickedStyle = (subject) => {
    const quoForm = quotation.quoForms.find(({ _id }) => _id === quoFormId);
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
    <div className={`flexBox ${className}`}>
      {sizes
        ? sizes.map((i) => {
            return (
              <button
                key={`sizeSelector${i.id}`}
                name={i.gSize}
                type='button'
                className='btn'
                onClick={onClick}
                style={btnClickedStyle(i.gSize)}
              >
                {i.gSize}
              </button>
            );
          })
        : null}
    </div>
  );
};

export default SizeSelector;
