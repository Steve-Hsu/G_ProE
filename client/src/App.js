import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';

import ComRegister from './components/authPage/00_ComRegister';

//Pages
import NotFound from './components/pages/NotFound';
import ComManager from './components/pages/01_ComManager';
import UserManager from './components/pages/11_UserManager';
import CaseManager from './components/pages/21_CaseManager';
import NewCase from './components/pages/22_NewCase';
//ComRouter
import ComLogin from './components/authPage/10_ComLogin';
import UserLogin from './components/authPage/20_UserLogin';

//CSS Sheet
import './App.css';
//Private route
import PrivateComRoute from './components/routing/PrivateComRoute';
import PrivateUserRoute from './components/routing/PrivateUserRoute';

//Context API
import ComState from './context/company/ComState';
import AuthComState from './context/authCom/AuthComState';
import AuthUserState from './context/authUser/AuthUserState';
import AlertState from './context/alert/AlterState';
import UserState from './context/user/UserState';
import CasesState from './context/cases/CasesState';
import SearchBarState from './context/searchBar/SearchBarState';

//Global Header for token
import setAuthToken from './utils/setAuthToken';

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
              <CasesState>
                <SearchBarState>
                  <Router>
                    <Fragment>
                      <Navbar />

                      <div>
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
                          <PrivateComRoute
                            exact
                            path='/api/users'
                            component={UserManager}
                          />
                          <PrivateUserRoute
                            exact
                            path='/api/case/user'
                            component={CaseManager}
                          />
                          <PrivateUserRoute
                            exact
                            path='/api/case/user/newcase'
                            component={NewCase}
                          />
                          <Route component={NotFound} />
                        </Switch>
                      </div>
                    </Fragment>
                  </Router>
                </SearchBarState>
              </CasesState>
            </AlertState>
          </AuthUserState>
        </UserState>
      </ComState>
    </AuthComState>
  );
};

export default App;
