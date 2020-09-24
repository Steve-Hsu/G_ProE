import React, { Fragment } from 'react';
import Users from '../10_users/Users';
import UserForm from '../10_users/UserForm';
import UserFilter from '../10_users/UserFilter';

//Alerts
import Alerts from '../layout/Alerts';

export const UserManager = () => {
  return (
    <Fragment>
      <div className='h-center-content'>
        <div className='w-80 px-1 container-with-navbar flexBox h-100vh'>
          {/* <div className='grid-2'> */}
          <div className='mr-05' style={{ flex: '1 1 0' }}>
            <UserForm />
            <Alerts />
          </div>
          <div
            className='ml-05 round-area bg-cp-1 bd-light overflow-auto-y '
            style={{ flex: '1 1 0', height: '90vh' }}
          >
            <div className='fs-lead'>Users</div>
            <UserFilter />
            <Users />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UserManager;
