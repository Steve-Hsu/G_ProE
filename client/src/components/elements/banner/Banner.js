import React from 'react';

const Banner = ({ onClick, label }) => {
  return (
    <div className='card bd-radius-s bd-light bg-cp-1 w-100 h-20vh'>
      <a onClick={onClick} className='cursor'>
        <i className='fas fa-sign-out-alt'></i>{' '}
        <span className='hide-lg'>{label}</span>
      </a>
    </div>
  );
};

export default Banner;
