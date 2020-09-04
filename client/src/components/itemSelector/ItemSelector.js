import React, { useContext, useEffect, Fragment } from 'react';

// Context
import CaseContext from '../../context/cases/casesContext';
import QuoContext from '../../context/quo/quoContext';
// Components
import Table from '../elements/table/Table';
import GoBackBtn from '../elements/btns/GoBackBtn';

export const ItemSelector = ({ props, purpose }) => {
  const caseContext = useContext(CaseContext);
  const quoContext = useContext(QuoContext);
  const {
    getCaseList,
    downloadCase,
    addCaseValue,
    caseList,
    defaultCase,
  } = caseContext;
  const { switchQuoFormSelector, quotation, switchQuoForm } = quoContext;

  useEffect(() => {
    if (purpose != 'quoFormSelector') {
      getList();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let getList = null;
  let subjects = null;
  let funcs = null;
  let goBack = null;
  let displayTitles = [];

  switch (purpose) {
    case 'CaseSelector':
    case 'quoCaseSelector':
      getList = getCaseList;
      subjects = caseList;
      goBack = () => {
        console.log('the props', props); // Test Code
        props.history.push('/api/case/director');
      };
      displayTitles = [
        { cNo: true },
        { caseType: true },
        { client: true },
        { merchandiser: true },
        { quoNo: true },
      ];
      switch (purpose) {
        case 'CaseSelector':
          funcs = [downloadCase, addCaseValue];
          break;
        case 'quoCaseSelector':
          funcs = switchQuoFormSelector;
          break;
        default:
      }
      break;

    case 'quoFormSelector':
      subjects = quotation.quoForms;
      funcs = switchQuoForm;
      displayTitles = [
        {
          quoNo: true,
        },
        { quotatedQty: true },
        { cm: true },
        { mQuosTotal: true },
        { otherExpensesTotal: true },
        { fob: true },
      ];
      goBack = () => {
        switchQuoFormSelector(null);
        // downLoadQuoHead(null);
        defaultCase();
      };
      break;
    default:
  }

  // const goBack = () => {
  //   switch (purpose) {
  //     case 'CaseSelector':
  //       console.log('the props', props);
  //       props.history.push('/api/case/director');
  //       break;
  //     case 'quoCaseSelector':
  //       break;
  //     default:
  //   }
  // };

  return (
    <Fragment>
      <div className='p-1 container container-with-navbar'>
        <GoBackBtn onClick={goBack} />
        <Table
          subjects={subjects}
          displayTitles={displayTitles}
          toggleItemFunc={funcs}
          purpose={purpose}
        />
      </div>
    </Fragment>
  );
};

export default ItemSelector;
