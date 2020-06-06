import React, { useContext, Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthUserContext from '../../context/authUser/authUserContext';

const PrivateUserRoute = ({ component: Component, ...rest }) => {
  const authUserContext = useContext(AuthUserContext);
  const { isAuthenticated, loading } = authUserContext;
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading ? (
          <Redirect to='/api/auth/user' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateUserRoute;
