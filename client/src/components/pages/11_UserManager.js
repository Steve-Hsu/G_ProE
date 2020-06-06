import React, { useContext, useEffect, Fragment } from 'react';
import Users from '../10_users/Users';
import UserForm from '../10_users/UserForm';
import UserFilter from '../10_users/UserFilter';
import AuthComContext from '../../context/authCom/authComContext';

export const UserManager = () => {
  // Check if there are any update in data, then update the UI
  const authComContext = useContext(AuthComContext);
  useEffect(() => {
    authComContext.loadUser();
    //eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <div className='container'>
        <div className='grid-2'>
          <div>
            <UserForm />
          </div>
          <div>
            <UserFilter />
            <Users />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UserManager;
