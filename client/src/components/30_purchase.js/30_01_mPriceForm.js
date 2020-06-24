import React, { useContext, Fragment, Prompt } from 'react';
// @ Components
import ColorWay from './1_1_ColorWay';
import Size from './1_2_Size';
import Qty from './1_3_Qty';
import Mtrl from './1_4_Mtrl';
import DeletePopover from '../layout/DeletePopover';

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
