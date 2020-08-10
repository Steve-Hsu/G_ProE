import React, { useContext, useEffect } from 'react';
import SrMtrlContext from '../../context/srMtrl/srMtrlContext';
//@ Child component
import SrMtrl from './30_01_01_srMtrl';

const MPriceForm = ({ currentPath }) => {
  const srMtrlContext = useContext(SrMtrlContext);
  const {
    srMtrls,
    getSrMtrls,
    updateMPrices,
    updateMPricesQuotation,
  } = srMtrlContext;
  useEffect(() => {
    // if (srMtrls.length === 0) {
    getSrMtrls();
    // }
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
    if (currentPath === '/api/quogarment') updateMPricesQuotation(body);
    if (currentPath === '/api/case/mprice') updateMPrices(body);
  };

  //@ return
  return (
    <div className='p-1 container container-with-navbar'>
      {/* // Ask the user when they want to jump to another page wihout saving datas */}
      {/* <Prompt when={formIsHalfFilledOut} message='Hey' />
    {popover ? <DeletePopover key={current.id} current={current} /> : null} */}
      <form id='srMtrlForm' onSubmit={onSubmitSrMtrl}>
        {srMtrls.map((srMtrl) => (
          <SrMtrl key={srMtrl._id} srMtrl={srMtrl} currentPath={currentPath} />
        ))}
      </form>
    </div>
  );
};

export default MPriceForm;
