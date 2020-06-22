import React from 'react';

// Components
import LeftBar from '../layout/LeftBar';
import CaseForm from '../20_cases/1_CaseForm';

export const CaseMerchandiser = () => {
  return (
    <div className='grid-1-4'>
      {/* Grid-1 */}
      <LeftBar />

      {/* Grid-2 */}
      <CaseForm />
    </div>
  );
};

export default CaseMerchandiser;
