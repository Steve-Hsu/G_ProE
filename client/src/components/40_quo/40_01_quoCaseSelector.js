import React, { useContext, useEffect } from 'react';
import SrMtrlContext from '../../context/srMtrl/srMtrlContext';
import QuoContext from '../../context/quo/quoContext';
//@ Child component
import QuoList from './40_01_01_quoList';

const MPriceForm = () => {
  const srMtrlContext = useContext(SrMtrlContext);
  const quoContext = useContext(QuoContext);
  const { srMtrls, getSrMtrls, updateMPrices } = srMtrlContext;
  const {
    caseList,
    quotateFor,
    isQuotating,
    switchQuoForm,
    getCaseList,
  } = quoContext;

  useEffect(() => {
    getCaseList();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quotateFor, isQuotating]);
  //@ funcs

  //@ return
  return (
    <div className='p-1 container container-with-navbar'>
      {/* // Ask the user when they want to jump to another page wihout saving datas */}
      {/* <Prompt when={formIsHalfFilledOut} message='Hey' />
    {popover ? <DeletePopover key={current.id} current={current} /> : null} */}

      {caseList.map((listItem) => (
        <QuoList key={`caseList${listItem._id}`} listItem={listItem} />
      ))}
    </div>
  );
};

export default MPriceForm;
