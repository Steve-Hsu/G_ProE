import React, { useContext, Fragment } from 'react';
import AuthContext from '../../context/authUser/authUserContext';
import CasesContext from '../../context/cases/casesContext';

const LeftBar = () => {
  const authContext = useContext(AuthContext);
  const casesContext = useContext(CasesContext);
  const { cases, isAuthenticated } = authContext;
  const { addcWay, addSize, addMtrl } = casesContext;

  return (
    <div className='container container-with-navbar leftbar test-1'>
      <div className='leftbar-component test-1'>
        {' '}
        {'Import style from Excel'}
        <input type='text' name='import' id='imoprt' />
        {'Submit'}
        <input
          type='submit'
          form='caseForm'
          className='btn btn-primary btn-block'
        />
        <div>
          {'Color Way'}
          <button
            name='cWayBtn'
            className='btn btn-sm btn-primary btn-rounded-square'
            onClick={addcWay}
          >
            +
          </button>
        </div>
        <div>
          {'    '}
          {'Size'}
          <button
            name='sizeBtn'
            className='btn btn-sm btn-primary'
            onClick={addSize}
          >
            +
          </button>
        </div>
        <div>
          {'Material'}
          <button
            name='mtrlBtn'
            className='btn btn-sm btn-primary'
            onClick={addMtrl}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
