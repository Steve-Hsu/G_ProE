import React from 'react';

const GoBackBtn = ({ onClick }) => {
  return (
    <button
      className='btn btn-sq center-content bd-round bd-no'
      onClick={onClick}
    >
      <i class='fas fa-chevron-left'></i>
    </button>
  );
};

export default GoBackBtn;
