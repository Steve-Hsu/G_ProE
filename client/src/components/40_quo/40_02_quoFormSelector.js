import React, { useContext, Fragment } from 'react';
import QuoContext from '../../context/quo/quoContext';
import CaseContext from '../../context/cases/casesContext';
import DeletePopover from '../layout/DeletePopover';
import Table from '../elements/table/Table';
import GoBackBtn from '../elements/btns/GoBackBtn';

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

  const addNewQuotation = (e) => {
    e.preventDefault();

    uploadQuoForm(isQuotating, true).then((result) => {
      const quoForms = result.quoForms;
      console.log(result);
      const newQuoFormId = quoForms[quoForms.length - 1]._id;
      console.log(newQuoFormId);
      switchQuoForm(newQuoFormId);
      setTimeout(() => {}, 300);
    });
  };

  const displayTitles = [
    {
      quoNo: true,
    },
    { quotatedQty: true },
    { cm: true },
    { mQuosTotal: true },
    { otherExpensesTotal: true },
    { fob: true },
  ];

  const goBack = () => {
    switchQuoFormSelector(null);
    caseContext.defaultCase();
  };

  return (
    <Fragment>
      {/* {popover ? <DeletePopover key={current.id} current={current} /> : null} */}
      <div className='container container-with-navbar'>
        <form id='addNewQuoForm' onSubmit={addNewQuotation}></form>
        <GoBackBtn onClick={goBack} />
        <Table
          purpose='quoFormSelector'
          displayTitles={displayTitles}
          subjects={quotation.quoForms}
          toggleItemAttributes={switchQuoForm}
        />
      </div>
      {/* <ItemSelector purpose='quoFormSelector' /> */}
    </Fragment>
  );
};

export default QuoForm;
