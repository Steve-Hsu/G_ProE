import React, { useContext, Fragment } from 'react';
import QuoContext from '../../context/quo/quoContext';
import CaseContext from '../../context/cases/casesContext';
import QuoFormItem from '../../components/40_quo/40_02_01_quoFormItem';
import DeletePopover from '../layout/DeletePopover';

const QuoForm = () => {
  const quoContext = useContext(QuoContext);
  const caseContext = useContext(CaseContext);
  const {
    isQuotating,
    quotation,
    switchQuoFormSelector,
    uploadQuoForm,
    downLoadQuoForm,
  } = quoContext;
  const {
    cNo,
    caseType,
    style,
    client,
    cWays,
    sizes,
    gQtys,
    mtrls,
    defaultCase,
  } = caseContext;

  const goBackBtn = (e) => {
    e.preventDefault();
    switchQuoFormSelector(null);
    downLoadQuoForm(null);
    // defaultCase();
  };

  const addNewQuotation = (e) => {
    e.preventDefault();

    uploadQuoForm(isQuotating, true);
  };

  return (
    <Fragment>
      {/* {popover ? <DeletePopover key={current.id} current={current} /> : null} */}
      <div className='p-1 container container-with-navbar'>
        <button onClick={goBackBtn}>Yes</button> QuoForm
        <form id='addNewQuoForm' onSubmit={addNewQuotation}></form>
        {quotation.quoForms.map((quoForm) => (
          <QuoFormItem quoForm={quoForm} key={quoForm.id} />
        ))}
      </div>
    </Fragment>
  );
};

export default QuoForm;
