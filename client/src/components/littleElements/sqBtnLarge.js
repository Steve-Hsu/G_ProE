import React from 'react';

const SqBtnLarge = ({ label, onClick }) => {
  return (
    <button className='btn btn-sq sq-block center-content' onClick={onClick}>
      {label}
    </button>
  );
};

export default SqBtnLarge;
