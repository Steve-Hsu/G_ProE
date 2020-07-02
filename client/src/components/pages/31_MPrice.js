import React, { useEffect } from 'react';

// Components
import LeftBar from '../layout/LeftBar';
// srMtrl
import MPriceForm from '../../components/30_srMtrl/30_01_srMtrlForm';

export const MPrice = (props) => {
  // useEffect(() => {
  //   // let currentLocation = this.location.pathname;
  //   console.log(props.location.pathname);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  const currentPath = props.location.pathname;

  return (
    <div className='grid-1-4'>
      {/* Grid-1 */}
      <LeftBar currentPath={currentPath} />

      {/* Grid-2 */}
      <MPriceForm />
    </div>
  );
};

export default MPrice;
