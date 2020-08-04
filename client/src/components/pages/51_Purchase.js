import React, { useContext, Fragment } from 'react';
// Components
import LeftBar from '../layout/LeftBar';
import PoSelector from '../50_po/50_01_poSelector';

const Purchase = (props) => {
  const currentPath = props.location.pathname;
  return (
    <div className='grid-1-4'>
      {/* Grid-1 */}
      <LeftBar currentPath={currentPath} />
      <div className='p-1 container container-with-navbar'>
        <PoSelector />
      </div>
    </div>
  );
};
export default Purchase;
