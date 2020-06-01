import React, { Fragment, useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import UserItem from './UserItem';
import UserContext from '../../context/user/userContext';

const Users = () => {
  //Init Context
  const userContext = useContext(UserContext);
  //Destructure, pull out the variables form userContext
  const { users, filtered } = userContext;

  if (users === null) {
    return <h4>Please Enter A New User</h4>;
  }

  return (
    <Fragment>
      <TransitionGroup>
        {filtered !== null
          ? // if the filtered is not empty, then show the company in the filtered
            filtered.map((user) => (
              <CSSTransition key={user._id} timeout={500} classNames='item'>
                <UserItem user={user} />
              </CSSTransition>
            ))
          : // else show all user in users
            users.map((user) => (
              <CSSTransition key={user._id} timeout={500} classNames='item'>
                <UserItem user={user} />
              </CSSTransition>
            ))}
      </TransitionGroup>
    </Fragment>
  );
};

export default Users;
