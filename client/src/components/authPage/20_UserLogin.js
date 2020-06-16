import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthUserContext from '../../context/authUser/authUserContext';

const UserLogin = (props) => {
  const alertContext = useContext(AlertContext);
  const authUserContext = useContext(AuthUserContext);

  const { setAlert } = alertContext;
  const { loginUser, error, clearErrors, isAuthenticated } = authUserContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/api/case/user');
    }
    if (error) {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const onChange = (e) =>
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please fill in all fields', 'danger');
    } else {
      loginUser({
        email,
        password,
      });
    }
    console.log('Login submit');
  };
  return (
    <div className='form-container'>
      <h1>
        User <span className='text-primary'>Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        {/* {Email Address} */}
        <div>
          <input
            id='userEmail'
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            placeholder='.'
            className='MPH-input'
            maxlength='100'
            required
          />
          <label htmlFor='userEmail' className='MPH-input-label'>
            Email Address
          </label>
        </div>
        {/* {Password} */}
        <div>
          <input
            id='userPassword'
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            placeholder='.'
            className='MPH-input'
            maxlength='50'
            required
          />
          <label htmlFor='userPassword' className='MPH-input-label'>
            Password
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
  );
};

export default UserLogin;
