import React, { useContext, useEffect } from 'react';
import Users from '../10_users/Users';
import UserForm from '../10_users/UserForm';
import UserFilter from '../10_users/UserFilter';
import AuthComContext from '../../context/authCom/authComContext';

export const UserManager = () => {
  const authComContext = useContext(AuthComContext);
  useEffect(() => {
    authComContext.loadUser();
    //eslint-disable-next-line
  }, []);
  return (
    <div className='grid-2'>
      <div>
        <UserForm />
      </div>
      <div>
        <UserFilter />
        <Users />
      </div>
    </div>
  );
};

export default UserManager;
