import React, { Fragment } from 'react';
import spinner from './spinner.gif';

export default () => (
  <Fragment>
    Downloading...
    <img
      src={spinner}
      className='bg-cp-2'
      style={{ width: '50px', height: '50px' }}
      alt='Loading...'
    />
  </Fragment>
);
