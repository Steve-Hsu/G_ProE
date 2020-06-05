import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthComContext from '../../context/authCom/authComContext';
import UserContext from '../../context/user/userContext';

const Navbar = ({ title, icon }) => {
  const authComContext = useContext(AuthComContext);
  const userContext = useContext(UserContext);

  const { isAuthenticated, logoutCom, company } = authComContext;
  const { clearUsers } = userContext;

  const onLogoutCom = () => {
    logoutCom();
    clearUsers();
  };

  const authComLinks = (
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

  const guestComLinks = (
    <Fragment>
      <li>
        <Link to='/api/auth/company'>Company Login</Link>
      </li>
      <li>
        <Link to='/api/auth/user'>User Login</Link>
      </li>
    </Fragment>
  );

  return (
    <div className='navbar bg-primary'>
      <h1>
        <Link to='/'>
          <i className={icon} /> {title}
        </Link>
      </h1>
      <ul>{isAuthenticated ? authComLinks : guestComLinks}</ul>
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
