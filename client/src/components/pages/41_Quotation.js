import React from 'react';

// Components
import LeftBar from '../layout/LeftBar';
// quoForm

export const Quotation = (props) => {
  const currentPath = props.location.pathname;

  return (
    <div className='grid-1-4'>
      {/* Grid-1 */}
      <LeftBar currentPath={currentPath} />

      {/* Grid-2 */}
      {/* <MPriceForm /> */}
    </div>
  );
};

export default Quotation;
