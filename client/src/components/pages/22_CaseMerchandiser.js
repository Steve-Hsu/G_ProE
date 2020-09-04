import React from 'react';

// Components
import LeftBar from '../layout/LeftBar';
import CaseForm from '../20_cases/1_CaseForm';

export const CaseMerchandiser = (props) => {
  const currentPath = props.location.pathname;
  return (
    <div className='grid-1-4'>
      {/* Grid-1 */}
      <LeftBar currentPath={currentPath} />

      {/* Grid-2 */}
      <CaseForm props={props} />
    </div>
  );
};

export default CaseMerchandiser;
