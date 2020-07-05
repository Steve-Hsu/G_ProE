import React, { useContext, Fragment, useEffect } from 'react';
import SrMtrlContext from '../../context/srMtrl/srMtrlContext';
//@ Child component
import SrMtrl from './30_01_01_srMtrl';

const MPriceForm = () => {
  const srMtrlContext = useContext(SrMtrlContext);
  const { srMtrls, getSrMtrls, updateMPrices } = srMtrlContext;
  useEffect(() => {
    if (srMtrls.length === 0) {
      getSrMtrls();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //@ funcs
  const onSubmitSrMtrl = async (e) => {
    e.preventDefault();
    const body = [];
    await srMtrls.map((srMtrl) => {
      body.push({
        id: srMtrl._id,
        mPrices: srMtrl.mPrices,
      });
    });
    updateMPrices(body);
  };

  //@ return
  return (
    <div className='p-1 container container-with-navbar'>
      {/* // Ask the user when they want to jump to another page wihout saving datas */}
      {/* <Prompt when={formIsHalfFilledOut} message='Hey' />
    {popover ? <DeletePopover key={current.id} current={current} /> : null} */}
      <form id='srMtrlForm' onSubmit={onSubmitSrMtrl}>
        {srMtrls.map((srMtrl) => (
          <SrMtrl key={srMtrl._id} srMtrl={srMtrl} />
        ))}
      </form>
    </div>
  );
};

export default MPriceForm;
