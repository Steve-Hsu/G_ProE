import React, { useContext, useEffect, Fragment } from 'react';
// import Users from '../10_users/Users';
// import UserForm from '../10_users/UserForm';
// import UserFilter from '../10_users/UserFilter';
import AuthUserContext from '../../context/authUser/authUserContext';

// import UserContext from '../../context/user/userContext';

export const CaseManager = () => {
  // Check if there are any update in data, then update the UI
  const authUserContext = useContext(AuthUserContext);
  const { loadCases } = authUserContext;
  useEffect(() => {
    loadCases();
    //eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      {/* content */}
      <div className='container'>
        <div style={{ backgroundColor: 'yellow' }}>I'm grid 1</div>
        <div style={{ backgroundColor: 'blue' }}>I'm grid 2</div>
      </div>
    </Fragment>
  );
};

export default CaseManager;
