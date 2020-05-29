import React from 'react';
import Companies from '../companies/Companies';
import CompanyForm from '../companies/CompanyForm';
import CompanyFilter from '../companies/CompanyFilter';

export const ComRegister = () => {
  return (
    <div className='grid-2'>
      <div>
        <CompanyForm />
      </div>
      <div>
        <CompanyFilter />
        <Companies />
      </div>
    </div>
  );
};

export default ComRegister;
