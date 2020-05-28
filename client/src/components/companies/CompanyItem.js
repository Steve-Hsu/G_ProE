import React from 'react';

const CompanyItem = ({ company }) => {
  const { id, comName, email, userNumLimit, userNum, type } = company;
  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-let'>
        {comName}{' '}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' + (type === 'paid' ? 'badge-primary' : 'badge-success')
          }
        >
          {type}
        </span>
      </h3>
      <ul>
        <li>
          <i className='fas fa-envelope-open' /> {email}
        </li>
        <li>
          <i className='fas fa-users' /> {userNumLimit}
        </li>
        <li>
          <i className='fas fa-user-check' /> {userNum}
        </li>
      </ul>
      <p>
        <button className='btn btn-dark btn-sm'>Edit</button>
        <buttom className='btn btn-danger btn-sm'>delete</buttom>
      </p>
    </div>
  );
};
export default CompanyItem;
