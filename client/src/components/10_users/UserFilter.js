import React, { useContext, useRef, useEffect } from 'react';
import UserContext from '../../context/user/userContext';

const UserFilter = () => {
  const userContext = useContext(UserContext);

  // Alternative form, when you need a form but more simpler, you cau use useRef()
  const text = useRef('');

  const { filterUser, clearFilterUser, filtered } = userContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterUser(e.target.value);
    } else {
      clearFilterUser();
    }
  };

  return (
    <form>
      <input
        ref={text}
        type='text'
        placeholder='Filter Users...'
        onChange={onChange}
      ></input>
    </form>
  );
};

export default UserFilter;
