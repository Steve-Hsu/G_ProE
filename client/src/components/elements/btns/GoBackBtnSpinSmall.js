import React from 'react';

const GoBackBtnSpinSmall = ({ onClick }) => {
  return (
    <div className='flexBox'>
      <div onClick={onClick} className='hover-spin-90'>
        <i className='fas fa-angle-down'></i>
      </div>
    </div>
  );
};

export default GoBackBtnSpinSmall;
