import React, { Fragment, useContext } from 'react';
import CompanyItem from './CompanyItem';
import ComContext from '../../context/company/comContext';
import contactContext from '../../context/company/comContext';

const Companies = () => {
  //Init Context
  const comContext = useContext(ComContext);
  //Destructure, pull out the variables form comContext
  const { companies } = comContext;
  return (
    <Fragment>
      {companies.map((company) => (
        <CompanyItem key={contactContext.id} company={company}></CompanyItem>
      ))}
    </Fragment>
  );
};

export default Companies;
