import React, { useContext, useEffect, Fragment, useState } from 'react';
import Users from '../10_users/Users';
import UserForm from '../10_users/UserForm';
import UserFilter from '../10_users/UserFilter';
import AuthComContext from '../../context/authCom/authComContext';

import UserContext from '../../context/user/userContext';

export const UserManager = () => {
  const userContext = useContext(UserContext);
  const { confirmDelete } = userContext;

  // Check if there are any update in data, then update the UI
  const authComContext = useContext(AuthComContext);
  useEffect(() => {
    authComContext.loadUser();
    //eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <div className='grid-2'>
        <div>
          <UserForm />
        </div>
        <div>
          <UserFilter />
          <Users />
        </div>
      </div>
    </Fragment>
  );
};

export default UserManager;
