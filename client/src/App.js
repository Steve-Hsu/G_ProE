import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';

import ComRegister from './components/authPage/00_ComRegister';

//sRouter
import ComManager from './components/pages/01_ComManager';
import UserManager from './components/pages/11_UserManager';
import CaseManager from './components/pages/21_CaseManager';
//ComRouter
import ComLogin from './components/authPage/10_ComLogin';
import UserLogin from './components/authPage/20_UserLogin';
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
// 20 Cases
import AuthUserState from './context/authUser/AuthUserState';

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
          <AuthUserState>
            <AlertState>
              <Router>
                <Fragment>
                  <Navbar />

                  <div className='container'>
                    <Alerts />
                    <Switch>
                      <Route
                        exact
                        path='/registercom'
                        component={ComRegister}
                      />
                      <Route
                        exact
                        path='/registercom/manager'
                        component={ComManager}
                      />
                      {/* LoginPages */}
                      <Route
                        exact
                        path='/api/auth/company'
                        component={ComLogin}
                      />
                      <Route
                        exact
                        path='/api/auth/user'
                        component={UserLogin}
                      />
                      {/* <PrivateRoute */}
                      <PrivateRoute
                        exact
                        path='/api/users'
                        component={UserManager}
                      />
                      <PrivateRoute
                        exact
                        path='/api/case/user'
                        component={CaseManager}
                      />
                    </Switch>
                  </div>
                </Fragment>
              </Router>
            </AlertState>
          </AuthUserState>
        </UserState>
      </ComState>
    </AuthComState>
  );
};

export default App;
