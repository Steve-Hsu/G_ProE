import React, { Fragment } from 'react';
import Banner from '../elements/banner/Banner';

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
    props.history.push('/api/quogarment');
  };

  const goPurchase = () => {
    //Jump to other page while keeping authenticated
    props.history.push('/api/purchase');
  };

  const goProgress = () => {
    //Jump to other page while keeping authenticated
    props.history.push('/api/case/user/progress');
  };

  return (
    <Fragment>
      {/* content */}
      <div className='h-center-content'>
        <div className='container container-with-navbar w-100'>
          <Banner onClick={goCase} label='Start a case' />
          <Banner onClick={gomPrice} label='Material Price' />
          <Banner onClick={goQuotation} label='Quotation' />
          <Banner onClick={goPurchase} label='Purchase' />
          <Banner onClick={goProgress} label='Progress' />
        </div>
      </div>
    </Fragment>
  );
};

export default Director;
