import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthComContext from '../../context/authCom/authComContext';
import AuthUserContext from '../../context/authUser/authUserContext';
import UserContext from '../../context/user/userContext';

const Navbar = ({ title, icon }) => {
  const authComContext = useContext(AuthComContext);
  const authUserContext = useContext(AuthUserContext);
  const userContext = useContext(UserContext);

  // Destructure
  const com = authComContext;
  const u = authUserContext;
  const { clearUsers } = userContext;

  const onLogoutCom = () => {
    com.logoutCom();
    clearUsers();
  };

  const onLogoutUser = () => {
    u.logoutUser();
    clearUsers();
  };

  const authComLinks = (
    <Fragment>
      <li>Hello ! {com.company && com.company.comName}</li>
      <li>
        <a onClick={onLogoutCom} href='#!'>
          <i className='fas fa-sign-out-alt'></i>{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const authUserLinks = (
    <Fragment>
      <li>Hello ! {u.user && u.user.name}</li>
      <li>
        <a onClick={onLogoutUser} href='#!'>
          <i className='fas fa-sign-out-alt'></i>{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
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
      <ul>
        {com.isAuthenticated !== true && u.isAuthenticated !== true
          ? guestLinks
          : null}
        {com.isAuthenticated ? authComLinks : null}
        {u.isAuthenticated ? authUserLinks : null}
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
