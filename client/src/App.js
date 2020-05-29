import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import ComRegister from './components/authCom/00_ComRegister';

//sRouter
import ComManager from './components/pages/01_ComManager';
//ComRouter
import ComLogin from './components/authCom/10_ComLogin';
import './App.css';

//Context API
import ComState from './context/company/ComState';
import AuthComState from './context/authCom/AuthComState';
const App = () => {
  return (
    <AuthComState>
      <ComState>
        <Router>
          <Fragment>
            <Navbar />
            <div className='container'>
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
      </ComState>
    </AuthComState>
  );
};

export default App;
