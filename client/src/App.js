import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import ComRegister from './components/authCom/00_ComRegister';

//sRouter
import ComManager from './components/pages/01_ComManager';
//ComRouter
import ComLogin from './components/authCom/10_ComLogin';
//Alert
import Alerts from './components/layout/Alerts';
import './App.css';

//Context API
import ComState from './context/company/ComState';
import AuthComState from './context/authCom/AuthComState';
import AlertState from './context/alert/AlterState';
const App = () => {
  return (
    <AuthComState>
      <ComState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <div className='container'>
                <Alerts />
                <Switch>
                  <Route
                    exact
                    path='/registercom/manager'
                    component={ComManager}
                  />
                  <Route exact path='/api/auth/company' component={ComLogin} />
                  <Route exact path='/registercom' component={ComRegister} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </ComState>
    </AuthComState>
  );
};

export default App;
