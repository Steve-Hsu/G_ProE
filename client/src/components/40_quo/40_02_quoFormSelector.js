import React, { useContext, Fragment } from 'react';
import QuoContext from '../../context/quo/quoContext';
import DeletePopover from '../layout/DeletePopover';
import ItemSelector from '../itemSelector/ItemSelector';

const QuoForm = () => {
  const quoContext = useContext(QuoContext);

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

  return (
    <Fragment>
      {/* {popover ? <DeletePopover key={current.id} current={current} /> : null} */}
      <form id='addNewQuoForm' onSubmit={addNewQuotation}></form>
      <ItemSelector purpose='quoFormSelector' />
    </Fragment>
  );
};

export default QuoForm;
