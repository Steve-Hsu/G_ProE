import React, { useContext, Fragment, Prompt } from 'react';
// @ Components
import DeletePopover from '../layout/DeletePopover';
import SrMtrl from '../../context/srMtrl/srMtrlContext';

const srMtrl = useContext(SrMtrl);
const { srMtrls } = srMtrl;

const casesList = {};

const supplierList = {};

const mPriceForm = () => {
  return (
    <Fragment>
      {/* // Ask the user when they want to jump to another page wihout saving datas */}
      <Prompt when={formIsHalfFilledOut} message='Hey' />
      {popover ? <DeletePopover key={current.id} current={current} /> : null}
      <div className='p-1 container container-with-navbar'></div>
    </Fragment>
  );
};

export default mPriceForm;
