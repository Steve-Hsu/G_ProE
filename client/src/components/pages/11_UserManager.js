import React, { Fragment } from 'react';
import Users from '../10_users/Users';
import UserForm from '../10_users/UserForm';
import UserFilter from '../10_users/UserFilter';

//Alerts
import Alerts from '../layout/Alerts';

export const UserManager = () => {
  return (
    <Fragment>
      <div className='container container-with-navbar'>
        <div className='grid-2'>
          <div>
            <UserForm />
            <Alerts />
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
