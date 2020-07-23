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
    switchQuoForm,
    uploadQuoForm,
    downLoadQuoHead,
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
    downLoadQuoHead(null);
    defaultCase();
  };

  const addNewQuotation = (e) => {
    e.preventDefault();
    // uploadQuoForm(isQuotating, true);

    uploadQuoForm(isQuotating, true).then((result) => {
      const quoForms = result.quoForms;
      console.log(result);
      const newQuoFormId = quoForms[quoForms.length - 1]._id;
      console.log(newQuoFormId);
      switchQuoForm(newQuoFormId);
      setTimeout(() => {}, 300);
    });
  };

  return (
    <Fragment>
      {/* {popover ? <DeletePopover key={current.id} current={current} /> : null} */}
      <div className='p-1 container container-with-navbar'>
        <button onClick={goBackBtn}>Go Back</button> QuoForm
        <form id='addNewQuoForm' onSubmit={addNewQuotation}></form>
        {quotation.quoForms.map((quoForm) => (
          <QuoFormItem quoForm={quoForm} key={quoForm._id} />
        ))}
      </div>
    </Fragment>
  );
};

export default QuoForm;
