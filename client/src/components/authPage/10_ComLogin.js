import React, { useState, useContext, useEffect, Fragment } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthComContext from '../../context/authCom/authComContext';
import Spinner from '../layout/Spinner';

const ComLogin = (props) => {
  const alertContext = useContext(AlertContext);
  const authComContext = useContext(AuthComContext);

  const { setAlert } = alertContext;
  const {
    loginCom,
    error,
    clearErrors,
    isAuthenticated,
    loading,
    token,
  } = authComContext;

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
    <Fragment>
      <div className='form-container'>
        {/* Applying spinner */}
        {token !== null && !loading ? (
          <Spinner />
        ) : (
          <div>
            <h1>
              Company <span className='text-primary'>Login</span>
            </h1>
            <form onSubmit={onSubmit}>
              {/* {Email Address} */}
              <div>
                <input
                  id='comEmail'
                  type='email'
                  name='email'
                  value={email}
                  onChange={onChange}
                  maxlength='100'
                  required
                  placeholder='.'
                  className='MPH-input'
                />
                <label htmlFor='comEmail' className='MPH-input-label'>
                  Email Address
                </label>
              </div>
              {/* {Password} */}
              <div>
                <input
                  id='comPassword'
                  type='password'
                  name='password'
                  value={password}
                  onChange={onChange}
                  maxlength='50'
                  required
                  placeholder='.'
                  className='MPH-input'
                />
                <label htmlFor='comPassword' className='MPH-input-label'>
                  password
                </label>
              </div>
              {/* Submit button */}
              <input
                type='submit'
                value='Login'
                className='btn btn-primary btn-block'
              />
            </form>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default ComLogin;
