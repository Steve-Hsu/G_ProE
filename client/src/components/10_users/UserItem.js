import React, { useContext, Fragment } from 'react';
import PropTypes from 'prop-types';
import UserContext from '../../context/user/userContext';
import DeleteUserPopForm from '../10_users/DeleteUserPopForm';

const UserItem = ({ user }) => {
  const userContext = useContext(UserContext);
  const {
    confirmDeleteUser,
    setCurrent,
    clearCurrent,
    confirmDelete,
  } = userContext;
  const { _id, name, email } = user;

  const onDelete = () => {
    confirmDeleteUser(name);
    clearCurrent();
  };

  return (
    <Fragment>
      {confirmDelete === name ? (
        <DeleteUserPopForm key={_id} name={name} id={_id} />
      ) : null}
      <div className='card bg-light'>
        <h3 className='text-primary text-let'>{name} </h3>
        <ul>
          <li>
            <i className='fas fa-envelope-open' /> {email}
          </li>
          <li>
            <i className='fas fa-user-check' /> {name}
          </li>
        </ul>
        <p>
          <button
            className='btn btn-dark btn-sm'
            onClick={() => setCurrent(user)}
          >
            Edit
          </button>
          <buttom className='btn btn-danger btn-sm' onClick={onDelete}>
            delete
          </buttom>
        </p>
      </div>
    </Fragment>
  );
};

UserItem.propTypes = {
  //Set the variable, the user, passedin must be an array.
  user: PropTypes.array.isRequired,
};

export default UserItem;
