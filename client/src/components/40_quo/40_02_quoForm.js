import React, { useContext } from 'react';
import QuoContext from '../../context/quo/quoContext';

const QuoForm = () => {
  const quoContext = useContext(QuoContext);
  const { switchQuoForm, downLoadQuoForm } = quoContext;
  const onSubmitQuoForm = () => {};

  const onClick = (e) => {
    e.preventDefault();
    switchQuoForm(null);
    downLoadQuoForm(null);
  };

  return (
    <div className='p-1 container container-with-navbar'>
      <button onClick={onClick}>Yes</button>{' '}
      <form id='quoForm' onSubmit={onSubmitQuoForm}></form>
    </div>
  );
};

export default QuoForm;
