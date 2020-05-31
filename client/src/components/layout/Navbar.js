import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthComContext from '../../context/authCom/authComContext';

const Navbar = ({ title, icon }) => {
  const authComContext = useContext(AuthComContext);

  const { isAuthenticated, logoutCom, company } = authComContext;

  const onLogoutCom = () => {
    logoutCom();
  };
  const authComLink = (
    <Fragment>
      <li>Hello ! {company && company.comName}</li>
      <li>
        <a onClick={onLogoutCom} href='#!'>
          <i className='fas fa-sign-out-alt'></i>{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestComLink = (
    <Fragment>
      <li>
        <Link to='/Login'>Login</Link>
      </li>
    </Fragment>
  );

  return (
    <div className='navbar bg-primary'>
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>
        <li>
          <Link to='/api/auth/company'>Company</Link>
        </li>
        <li>
          <Link to='/api/auth/user'>Login</Link>
        </li>
      </ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: 'G-ProE',
  icon: 'fas fa-tshirt',
};

export default Navbar;
