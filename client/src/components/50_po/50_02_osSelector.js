import React, { useContext, useEffect } from 'react';
import PurContext from '../../context/pur/purContext';
//@ Child component
import OsItem from './50_02_01_osItem';

const PoSelector = () => {
  const purContext = useContext(PurContext);
  const {
    osList,
    caseList,
    selectedCases,
    getCaseList,
    selectCase,
    getOsList,
    switchPage,
  } = purContext;

  useEffect(() => {
    getOsList();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //@ funcs

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('order summary is triggered');
    // createOrderSummary(selectedCases);
  };

  //@ return
  return (
    <div className='p-1 container container-with-navbar'>
      {osList.map((osItem) => (
        <OsItem key={`caseList${osItem._id}`} osItem={osItem} />
      ))}
    </div>
  );
};

export default PoSelector;
