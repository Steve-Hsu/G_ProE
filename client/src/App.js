import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';

//sRouter
import ComRegister from './components/pages/00_ComRegister';
//ComRouter
import ComLogin from './components/pages/10_ComLogin';
import './App.css';

//Context API
import ComState from './context/company/comState';
const App = () => {
  return (
    <ComState>
      <Router>
        <Fragment>
          <Navbar />
          <div className='container'>
            <Switch>
              <Route exact path='/registercom' component={ComRegister} />
              <Route exact path='/api/auth/company' component={ComLogin} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </ComState>
  );
};

export default App;
