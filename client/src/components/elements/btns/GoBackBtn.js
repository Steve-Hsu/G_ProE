import React from 'react';

const GoBackBtn = ({ name, onClick, className }) => {
  return (
    <button
      name={name}
      className={`btn btn-sq center-content bd-round bd-no ${className}`}
      onClick={onClick}
    >
      <i className='fas fa-chevron-left'></i>
    </button>
  );
};

export default GoBackBtn;
