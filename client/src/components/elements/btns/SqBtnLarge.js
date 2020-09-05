import React from 'react';

const SqBtnLarge = ({ label, onClick, name }) => {
  return (
    <button
      name={name}
      className='btn btn-sq sq-block center-content'
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default SqBtnLarge;
