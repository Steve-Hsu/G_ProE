import React, { useState, useContext } from 'react';
import ComContext from '../../context/company/comContext';

const CompanyForm = () => {
  const comContext = useContext(ComContext);

  //Set state for this CompanyForm
  const [company, setCompany] = useState({
    comName: '',
    email: '',
    userNumLimit: '',
    userNum: 1,
    type: 'unpaid',
  });

  const { comName, email, userNumLimit, type } = company;

  const onChange = (e) =>
    // Link each input to CompanyForm.state, input name matcked to state name
    setCompany({ ...company, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    // Prevent renew all the variables on browser(client), the ComState and CompanyForm.state
    e.preventDefault();

    // Grab the "company" from CompanyForm.state.
    // Add the "company" to ComState.companies
    comContext.addCompany(company);

    // Clear and make the CompanyForm.state ready to use again
    setCompany({
      comName: '',
      email: '',
      userNumLimit: '',
      userNum: 1,
      type: 'unpaid',
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>Add Company</h2>
      <input
        type='text'
        placeholder='Company Name'
        name='comName'
        value={comName}
        onChange={onChange}
      />
      <input
        type='email'
        placeholder='Company email'
        name='email'
        value={email}
        onChange={onChange}
      />
      <label for='userNumLimit'>The maxium user Number :</label>{' '}
      <input
        type='number'
        min='1'
        max='5'
        name='userNumLimit'
        // value={userNumLimit}
        onChange={onChange}
      />{' '}
      <div>
        <input
          type='radio'
          name='type'
          value='paid'
          checked={type === 'paid'}
          onChange={onChange}
        />{' '}
        Paid{' '}
        <input
          type='radio'
          name='type'
          value='unpaid'
          checked={type === 'unpaid'}
          onChange={onChange}
        />{' '}
        unPaid{' '}
      </div>
      <div>
        <input
          type='submit'
          value='Add Company'
          className='btn btn-primary btn-block'
        />
      </div>
    </form>
  );
};

export default CompanyForm;
