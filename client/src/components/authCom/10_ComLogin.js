import React, { useState } from 'react';
import { STATES } from 'mongoose';

const ComLogin = () => {
  const [company, setCompany] = useState({
    email: '',
    password: '',
  });

  const { email, password } = company;

  const onChange = (e) =>
    setCompany({
      ...STATES,
      [e.target.name]: e.target.value,
    });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('Login submit');
  };
  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        {/* {Email Address} */}
        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input type='email' name='email' value={email} onChange={onChange} />
        </div>
        {/* {Password} */}
        <div className='form-group'>
          <label htmlFor='password'>password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
          />
        </div>
        {/* Submit button */}
        <input
          type='submit'
          value='Register'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default ComLogin;
