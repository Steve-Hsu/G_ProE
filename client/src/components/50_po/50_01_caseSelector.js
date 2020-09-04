import React, { useContext, useEffect } from 'react';
import PurContext from '../../context/pur/purContext';
//@ Child component
import CaseItem from './50_01_01_caseItem';

const PoSelector = () => {
  const purContext = useContext(PurContext);
  const {
    // caseList,
    selectedCases,
    // getCaseList,
    selectCase,
    createOrderSummary,
  } = purContext;

  useEffect(() => {
    // getCaseList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //@ funcs

  const onClick = (e) => {
    e.preventDefault();
    selectCase(null, true);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('order summary is triggered');
    createOrderSummary(selectedCases);
  };

  //@ return
  return (
    <div className='p-1 container container-with-navbar'>
      {/* // Ask the user when they want to jump to another page wihout saving datas */}
      {/* <Prompt when={formIsHalfFilledOut} message='Hey' />
    {popover ? <DeletePopover key={current.id} current={current} /> : null} */}
      <form id='purchase' onSubmit={onSubmit}></form>
      {/* <div className='grid-6'>
          <button name='selectAll' onClick={onClick}>
            Select All
          </button>
        </div>
        <div className='card'>
          {caseList.map((caseItem) => (
            <CaseItem key={`caseList${caseItem._id}`} caseItem={caseItem} />
          ))} */}
      {/* </div> */}
    </div>
  );
};

export default PoSelector;
