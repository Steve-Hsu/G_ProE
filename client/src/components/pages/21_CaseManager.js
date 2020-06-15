import React, { useContext, useEffect, Fragment } from 'react';
import AuthUserContext from '../../context/authUser/authUserContext';

export const CaseManager = (props) => {
  // Check if there are any update in data, then update the UI
  const authUserContext = useContext(AuthUserContext);
  const { loadCases } = authUserContext;
  // useEffect(() => {
  //   loadCases();
  //   //eslint-disable-next-line
  // }, []);
  const goNewCase = () => {
    //Jump to other page while keeping authenticated
    props.history.push('/api/case/user/newcase');
  };
  const goExCase = () => {
    //Jump to other page while keeping authenticated
    props.history.push('/api/case/user/existingcase');
  };
  const goQuotation = () => {
    //Jump to other page while keeping authenticated
    props.history.push('/api/case/user/quotation');
  };
  const goAR = () => {
    //Jump to other page while keeping authenticated
    props.history.push('/api/case/user/ar');
  };
  const goProgress = () => {
    //Jump to other page while keeping authenticated
    props.history.push('/api/case/user/progress');
  };

  return (
    <Fragment>
      {/* content */}
      <div className='form-container'>
        <div>
          <a onClick={goNewCase} className='cursor'>
            <i className='fas fa-sign-out-alt'></i>{' '}
            <span className='hide-lg'>New Case</span>
          </a>
        </div>
        <div>
          <a onClick={goExCase} className='cursor'>
            <i className='fas fa-sign-out-alt'></i>{' '}
            <span className='hide-lg'>Existing Case</span>
          </a>
        </div>
        <div>
          <a onClick={goQuotation} className='cursor'>
            <i className='fas fa-sign-out-alt'></i>{' '}
            <span className='hide-lg'>Quotation</span>
          </a>
        </div>
        <div>
          <a onClick={goAR} className='cursor'>
            <i className='fas fa-sign-out-alt'></i>{' '}
            <span className='hide-lg'>A/R Accounts receivable</span>
          </a>
        </div>
        <div>
          <a onClick={goProgress} className='cursor'>
            <i className='fas fa-sign-out-alt'></i>{' '}
            <span className='hide-lg'>Progress</span>
          </a>
        </div>
      </div>
    </Fragment>
  );
};

export default CaseManager;
