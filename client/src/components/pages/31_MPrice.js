import React from 'react';

// Components
import LeftBar from '../layout/LeftBar';
// srMtrl
import MPriceForm from '../../components/30_srMtrl/30_01_srMtrlForm';

export const MPrice = (props) => {
  const currentPath = props.location.pathname;

  return (
    <div className='grid-1-4'>
      {/* Grid-1 */}
      <LeftBar currentPath={currentPath} />

      {/* Grid-2 */}
      <MPriceForm props={props} currentPath={currentPath} />
    </div>
  );
};

export default MPrice;
