import React, { useContext, useState } from 'react';
import UserContext from '../../context/user/userContext';

const DeleteUserPopForm = (props) => {
  const userContext = useContext(UserContext);
  const {
    confirmDelete,
    clearConfirmDelete,
    deleteUser,
    clearCurrent,
  } = userContext;

  // State of this component, the DeleteUserPopForm
  const [state, setState] = useState({
    confirmUserName: '',
  });

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onChangeDelete = async () => {
    if (state.confirmUserName === confirmDelete) {
      await deleteUser(props.id);
      clearCurrent();
      clearConfirmDelete();
      alert('The User is deleted');
    } else {
      alert(
        'Enter the correct user name to delete, or press button "back" go back to previous page'
      );
    }
  };

  const onChangeBack = () => {
    clearConfirmDelete();
  };

  return (
    <div className='popup'>
      <div className='popup_inner'>
        <div>
          <input
            type='text'
            placeholder={props.name}
            // value={state.confrimUseName}
            name='confirmUserName'
            onChange={onChange}
          />
        </div>{' '}
        Enter the user name to delete{' '}
        <div>
          <buttom
            value={state.confrimUseName}
            className='btn btn-danger btn-block'
            onClick={onChangeDelete}
          >
            Delete User
          </buttom>
        </div>
        <div>
          <buttom className='btn btn-primary btn-block' onClick={onChangeBack}>
            Back
          </buttom>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserPopForm;
