import React from 'react';

const DeleteBtnSmall = ({ name, onClick, value, style }) => {
  return (
    <button
      name={name}
      value={value}
      onClick={onClick}
      className='btn btn-warning btn-sq btn-sq-small mt-05 '
      style={style}
    >
      x
    </button>
  );
};

export default DeleteBtnSmall;
