import React, { useState, useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

const ComRegister = () => {
  // Initialize Alert
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const [company, setCompany] = useState({
    comName: '',
    email: '',
    password: '',
    password2: '',
    code: '',
  });

  const { comName, email, password, password2, code } = company;
  const onChange = (e) =>
    setCompany({ ...company, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (comName === '' || email === '' || password === '') {
      setAlert('Please enter all fields', 'danger');
    } else if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else if (code !== process.env.REACT_APP_STEVE_ID) {
      setAlert('Wrong Code, you are not Steve', 'danger');
    } else {
      console.log('Register Submit');
    }
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
          <input
            type='text'
            name='comName'
            value={comName}
            onChange={onChange}
          />
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
