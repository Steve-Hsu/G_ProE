import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../../context/user/userContext';

const UserForm = () => {
  const userContext = useContext(UserContext);

  const { addUser, current, clearCurrent, updateUser } = userContext;
  useEffect(() => {
    if (current !== null) {
      // If UserState.current is not empty, set UserForm.state === UserState.current
      setUser(current);
    } else {
      // Default it
      setUser({
        name: '',
        email: '',
        password: '',
        cases: false,
        mtrl: false,
        cst: false,
        mp: false,
        po: false,
      });
    }
    // make useEffect only check the changing of userContext and current
  }, [userContext, current]);

  //Set state for this UserForm
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    cases: false,
    mtrl: false,
    cst: false,
    mp: false,
    po: false,
  });

  const { name, email, password, password2, cases, mtrl, cst, mp, po } = user;

  const onChange = (e) =>
    // Link each input to UserForm.state, input name matcked to state name
    setUser({ ...user, [e.target.name]: e.target.value });

  //@ onChange for checkbox -------
  // const onChangeCB = (e) => {
  //   if (e.target.checked) {
  //     setUser({ ...user, [e.target.name]: true });
  //   } else if (!e.target.checked) {
  //     setUser({ ...user, [e.target.name]: false });
  //   }
  // };
  // @ Offered by gdh form stackOverflow, works as the above one
  // const onChangeCB = (e) => {
  //   const target = e.target;
  //   setUser((prev) => ({ ...prev, [target.name]: !prev[target.name] }));
  // };
  const onChangeCB = (e) => {
    const { name, checked } = e.target;
    setUser({ ...user, [name]: checked ? true : false });
  };

  const onSubmit = (e) => {
    // Prevent renew all the variables on browser(client), the userState and UserForm.state
    e.preventDefault();

    if (current === null) {
      // Grab the "User" from UserForm.state.
      // Add the "User" to userState.userpanies
      addUser(user);
    } else {
      updateUser(user);
    }
    // Default the current and UserForm.state
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>{current ? 'Edit User' : 'Add User'}</h2>
      <input
        type='text'
        placeholder='User Name'
        name='name'
        value={name}
        onChange={onChange}
      />
      <input
        type='email'
        placeholder='User email'
        name='email'
        value={email}
        onChange={onChange}
      />
      <input
        type='password'
        placeholder='Setting password'
        name='password'
        value={password}
        onChange={onChange}
      />
      <input
        type='password'
        placeholder='Setting password'
        name='password2'
        value={password2}
        onChange={onChange}
      />
      <input
        type='checkbox'
        name='cases'
        checked={cases === true}
        onChange={onChangeCB}
      />{' '}
      Case{' '}
      <input
        type='checkbox'
        name='mtrl'
        checked={mtrl === true}
        onChange={onChangeCB}
      />{' '}
      Material{' '}
      <input
        type='checkbox'
        name='cst'
        checked={cst === true}
        onChange={onChangeCB}
      />{' '}
      Cunsumption{' '}
      <input
        type='checkbox'
        name='mp'
        checked={mp === true}
        onChange={onChangeCB}
      />{' '}
      Material Price{' '}
      <input
        type='checkbox'
        name='po'
        checked={po === true}
        onChange={onChangeCB}
      />{' '}
      Purchase order{' '}
      <div>
        <input
          type='submit'
          value={current ? 'Update User' : 'Add User'}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default UserForm;
