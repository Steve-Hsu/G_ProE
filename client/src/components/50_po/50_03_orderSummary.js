import React, { useContext, Fragment } from 'react';
import PurContext from '../../context/pur/purContext';
import Board from '../elements/board/Board';
import DeleteBtnSmall from '../elements/btns/DeleteBtnSmall';
import PopoverContext from '../../context/popover/popoverContext';
import DeletePopover from '../layout/DeletePopover';
import LockedBadge from '../elements/badge/LockedBadge';

const OrderSummary = () => {
  const popoverContext = useContext(PopoverContext);
  const { popover, current, togglePopover } = popoverContext;

  const purContext = useContext(PurContext);
  const { switchPage, currentOrderSummary } = purContext;
  const { _id, osNo, cNos, suppliers, osConfirmDate } = currentOrderSummary;

  return (
    <Fragment>
      {popover ? <DeletePopover key={current._id} /> : null}
      <div className='round-area bd-light bg-cp-1 mb-05 mt-05'>
        <div className='h-scatter-content'>
          {' '}
          <div className='mb-5'>The Order Summary : {osNo}</div>
          {osConfirmDate === null ? (
            <DeleteBtnSmall
              name='deleteOs'
              onClick={togglePopover}
              value={_id}
              className='m-0 noPrint'
            />
          ) : null}
        </div>

        <div>
          The case purchased :{' '}
          {cNos.map((cNo) => {
            return (
              <span key={cNo} className='ml-05'>
                {cNo}
              </span>
            );
          })}
        </div>
        {osConfirmDate !== null ? (
          <LockedBadge
            labels={[
              'All the Purchase Order is confirmed.',
              'The date is sent to accounting Department',
            ]}
          />
        ) : null}
      </div>

      <Board
        subjects={suppliers}
        // displayTitles={suppliers}
        purpose='purchaseOrder'
        label='Purchase Order'
        toggleItemAttributes={switchPage}
      />
    </Fragment>
  );
};

export default OrderSummary;
