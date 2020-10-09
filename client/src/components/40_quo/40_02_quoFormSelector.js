import React, { useContext, Fragment } from 'react';
import QuoContext from '../../context/quo/quoContext';
import DeletePopover from '../layout/DeletePopover';
import Table from '../elements/table/Table';
import GoBackBtn from '../elements/btns/GoBackBtn';
import PopoverContext from '../../context/popover/popoverContext';

const QuoForm = () => {
  const quoContext = useContext(QuoContext);
  const popoverContext = useContext(PopoverContext);

  const {
    isQuotating,
    quotation,
    switchQuoFormSelector,
    switchQuoForm,
    uploadQuoForm,
  } = quoContext;

  const { toggleLoading, isLoading } = popoverContext;

  const addNewQuotation = async (e) => {
    e.preventDefault();
    toggleLoading();
    await uploadQuoForm(isQuotating, true)
      .then((result) => {
        const quoForms = result.quoForms;
        // console.log(result); // test Code
        const newQuoFormId = quoForms[quoForms.length - 1]._id;
        // console.log(newQuoFormId); // Test Code
        switchQuoForm(newQuoFormId);
      })
      .then(() => {
        toggleLoading();
        console.log('New Quotation form is added.');
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
  };

  return (
    <Fragment>
      {isLoading ? <DeletePopover key='quoFormSelectorPopover' /> : null}
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
