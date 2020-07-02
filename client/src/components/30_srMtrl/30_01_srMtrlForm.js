import React, { useContext, Fragment, useEffect } from 'react';
import SrMtrlContext from '../../context/srMtrl/srMtrlContext';
//@ Child component
import SrMtrl from './30_01_01_srMtrl';

const MPriceForm = () => {
  const srMtrlContext = useContext(SrMtrlContext);
  const { srMtrls, getSrMtrls } = srMtrlContext;
  useEffect(() => {
    if (srMtrls.length === 0) {
      getSrMtrls();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className='p-1 container container-with-navbar'>
      {/* // Ask the user when they want to jump to another page wihout saving datas */}
      {/* <Prompt when={formIsHalfFilledOut} message='Hey' />
    {popover ? <DeletePopover key={current.id} current={current} /> : null} */}
      {srMtrls.map((srMtrl) => (
        <SrMtrl key={srMtrl._id} srMtrl={srMtrl} />
      ))}
    </div>
  );
};

export default MPriceForm;
