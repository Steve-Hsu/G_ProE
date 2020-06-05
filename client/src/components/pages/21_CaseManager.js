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
      <h1>Here is the case</h1>
    </Fragment>
  );
};

export default CaseManager;
