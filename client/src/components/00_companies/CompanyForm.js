import React, { useState, useContext, useEffect } from 'react';
import ComContext from '../../context/company/comContext';

const CompanyForm = () => {
  const comContext = useContext(ComContext);

  const { addCompany, current, clearCurrent, updateCompany } = comContext;
  useEffect(() => {
    if (current !== null) {
      // If ComState.current is not empty, set CompanyForm.state === ComState.current
      setCompany(current);
    } else {
      // Default it
      setCompany({
        comName: '',
        email: '',
        userNumLimit: '',
        userNum: 1,
        type: 'unpaid',
      });
    }
    // make useEffect only check the changing of comContext and current
  }, [comContext, current]);

  //Set state for this CompanyForm
  const [company, setCompany] = useState({
    comName: '',
    email: '',
    userNumLimit: '',
    userNum: 1,
    type: 'unpaid',
  });

  const { comName, email, type } = company;

  const onChange = (e) =>
    // Link each input to CompanyForm.state, input name matcked to state name
    setCompany({ ...company, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    // Prevent renew all the variables on browser(client), the ComState and CompanyForm.state
    e.preventDefault();

    if (current === null) {
      // Grab the "company" from CompanyForm.state.
      // Add the "company" to ComState.companies
      addCompany(company);
    } else {
      updateCompany(company);
    }
    // Default the current and CompanyForm.state
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current ? 'Edit Company' : 'Add Company'}
      </h2>
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
          value={current ? 'Update Company' : 'Add Company'}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default CompanyForm;
