import React, { useContext } from 'react';
import AuthContext from '../../context/authUser/authUserContext';
import CasesContext from '../../context/cases/casesContext';
import SearchBar from './SearchBar';

const LeftBar = () => {
  const authContext = useContext(AuthContext);
  const casesContext = useContext(CasesContext);
  const { cases, isAuthenticated } = authContext;
  const { cNo, addcWay, addSize, addMtrl, clearcNo } = casesContext;

  const onClick = (e) => {
    e.preventDefault();
    clearcNo();
  };

  return (
    <div className='container-with-navbar leftbar p-1 test-2'>
      <div className='leftbar-component test-4'>
        {' '}
        {'Import style from Excel'}
        <input type='text' name='import' id='imoprt' />
        {'Submit'}
        <input
          type='submit'
          form='caseForm'
          className='btn btn-primary btn-block'
          value={cNo === null ? 'Add New Case' : 'Update the Case'}
        />
        {/* Submit
        </input> */}
        <SearchBar />
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
        <div>
          ye{' '}
          {cNo === null ? null : (
            <input
              type='submit'
              // form='caseForm'
              className='btn btn-primary btn-block'
              value='Copy this case as a new Case'
              onClick={onClick}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
