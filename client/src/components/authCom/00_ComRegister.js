import React, { useState } from 'react';
import { COM_REGISTER_FAIL } from '../../context/types';

const ComRegister = () => {
  const [company, setCompany] = useState({
    comName: '',
    email: '',
    password: '',
    password2: '',
    code: '',
  });

  const { name, email, password, password2, code } = company;
  const onChange = (e) =>
    setCompany({ ...company, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('Register sumit');
  };

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        {/* {Name} */}
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input type='text' name='name' value={name} onChange={onChange} />
        </div>
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
        {/* {Password for confirm} */}
        <div className='form-group'>
          <label htmlFor='password2'>password2</label>
          <input
            type='password'
            name='password2'
            value={password2}
            onChange={onChange}
          />
        </div>
        {/* {Code for pass as a APP manager} */}
        <div className='form-group'>
          <label htmlFor='CODE'>CODE</label>
          <input type='password' name='code' value={code} onChange={onChange} />
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

export default ComRegister;
