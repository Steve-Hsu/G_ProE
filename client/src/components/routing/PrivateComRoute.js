import React, { useContext, Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthComContext from '../../context/authCom/authComContext';

const PrivateComRoute = ({ component: Component, ...rest }) => {
  const authComContext = useContext(AuthComContext);
  const { isAuthenticated, loading } = authComContext;
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading ? (
          <Redirect to='/api/auth/company' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateComRoute;
