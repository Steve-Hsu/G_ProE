import React from 'react';
import Companies from '../companies/Companies';
import CompanyForm from '../companies/CompanyForm';

export const ComRegister = () => {
  return (
    <div className='grid-2'>
      <div>
        <CompanyForm />
      </div>
      <div>
        <Companies />
      </div>
    </div>
  );
};

export default ComRegister;
