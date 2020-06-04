import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthComContext from '../../context/authCom/authComContext';

const ComLogin = (props) => {
  const alertContext = useContext(AlertContext);
  const authComContext = useContext(AuthComContext);

  const { setAlert } = alertContext;
  const { loginCom, error, clearErrors, isAuthenticated } = authComContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/api/users');
    }
    if (error) {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [company, setCompany] = useState({
    email: '',
    password: '',
  });

  const { email, password } = company;

  const onChange = (e) =>
    setCompany({
      ...company,
      [e.target.name]: e.target.value,
    });

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please fill in all fields', 'danger');
    } else {
      loginCom({
        email,
        password,
      });
    }
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
          <input
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
        </div>
        {/* {Password} */}
        <div className='form-group'>
          <label htmlFor='password'>password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required
          />
        </div>
        {/* Submit button */}
        <input
          type='submit'
          value='Login'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default ComLogin;
