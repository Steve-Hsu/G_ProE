import React, { useContext, useEffect } from 'react';
import SrMtrlContext from '../../context/srMtrl/srMtrlContext';
//@ Child component
import QuoList from './40_01_01_quoList';

const MPriceForm = () => {
  const srMtrlContext = useContext(SrMtrlContext);
  const { srMtrls, getSrMtrls, updateMPrices } = srMtrlContext;
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //@ funcs

  //@ return
  return (
    <div className='p-1 container container-with-navbar'>
      {/* // Ask the user when they want to jump to another page wihout saving datas */}
      {/* <Prompt when={formIsHalfFilledOut} message='Hey' />
    {popover ? <DeletePopover key={current.id} current={current} /> : null} */}
      <form id='srMtrlForm' onSubmit={onSubmitSrMtrl}>
        {/* {srMtrls.map((srMtrl) => ( */}
        <QuoList />
        {/* // ))} */}
      </form>
    </div>
  );
};

export default MPriceForm;
