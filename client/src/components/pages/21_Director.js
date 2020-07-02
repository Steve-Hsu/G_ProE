import React, { Fragment } from 'react';

export const Director = (props) => {
  const goCase = () => {
    //Jump to other page while keeping authenticated
    props.history.push('/api/case/merchandiser');
  };
  const gomPrice = () => {
    //Jump to other page while keeping authenticated
    props.history.push('/api/case/mprice');
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
          <a onClick={goCase} className='cursor'>
            <i className='fas fa-sign-out-alt'></i>{' '}
            <span className='hide-lg'>Manage Cases</span>
          </a>
        </div>
        <div>
          <a onClick={gomPrice} className='cursor'>
            <i className='fas fa-sign-out-alt'></i>{' '}
            <span className='hide-lg'>Material Price</span>
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

export default Director;
