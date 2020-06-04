import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';

import ComRegister from './components/authCom/00_ComRegister';
import UserManager from './components/pages/11_UserManager';

//sRouter
import ComManager from './components/pages/01_ComManager';
//ComRouter
import ComLogin from './components/authCom/10_ComLogin';
//Alert
import Alerts from './components/layout/Alerts';
import './App.css';
//Private route
import PrivateRoute from './components/routing/PrivateRoute';

//Context API
import ComState from './context/company/ComState';
import AuthComState from './context/authCom/AuthComState';
import AlertState from './context/alert/AlterState';
import UserState from './context/user/UserState';

//Global Header for token
import setAuthToken from './utils/setAuthToken';

//Test element

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthComState>
      <ComState>
        <UserState>
          <AlertState>
            <Router>
              <Fragment>
                <Navbar />

                <div className='container'>
                  <Alerts />
                  <Switch>
                    <Route exact path='/registercom' component={ComRegister} />
                    <Route
                      exact
                      path='/registercom/manager'
                      component={ComManager}
                    />

                    <Route
                      exact
                      path='/api/auth/company'
                      component={ComLogin}
                    />
                    {/* <PrivateRoute */}
                    <PrivateRoute
                      exact
                      path='/api/users'
                      component={UserManager}
                    />
                  </Switch>
                </div>
              </Fragment>
            </Router>
          </AlertState>
        </UserState>
      </ComState>
    </AuthComState>
  );
};

export default App;
