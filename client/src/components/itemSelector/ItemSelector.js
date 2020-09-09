import React, { useContext, useEffect, Fragment } from 'react';

// Context
import CaseContext from '../../context/cases/casesContext';
import SrMtrlContext from '../../context/srMtrl/srMtrlContext';
import QuoContext from '../../context/quo/quoContext';
import PurContext from '../../context/pur/purContext';
// Components
import Table from '../elements/table/Table';
import Board from '../elements/board/Board';
import GoBackBtn from '../elements/btns/GoBackBtn';
import SqToggleSwitchL from '../elements/btns/SqToggleSwitchL';

export const ItemSelector = ({ props, purpose }) => {
  const caseContext = useContext(CaseContext);
  const srMtrlContext = useContext(SrMtrlContext);
  const quoContext = useContext(QuoContext);
  const purContext = useContext(PurContext);
  const {
    getCaseList,
    downloadCase,
    addCaseValue,
    caseList,
    defaultCase,
    isBoardMode,
  } = caseContext;
  const { srMtrls, getSrMtrls, openSrMtrl, editingList } = srMtrlContext;
  const { switchQuoFormSelector, quotation, switchQuoForm } = quoContext;
  const { selectCase, selectedCases, switchPage } = purContext;

  useEffect(() => {
    if (purpose === 'srMtrlSelector') {
      getSrMtrls();
    } else if (purpose != 'quoFormSelector') {
      getList();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let getList = null;
  let subjects = null;
  let attributes = null;
  let goBack = null;
  let displayTitles = [];

  switch (purpose) {
    case 'CaseSelector':
    case 'quoCaseSelector':
    case 'purCaseSelector':
      getList = getCaseList;
      subjects = caseList;
      goBack = () => {
        if (purpose === 'purCaseSelector') {
          switchPage(null);
        } else {
          props.history.push('/api/case/director');
        }
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
          attributes = [downloadCase, addCaseValue];
          break;

        case 'quoCaseSelector':
          attributes = switchQuoFormSelector;
          break;
        case 'purCaseSelector':
          attributes = [selectCase, selectedCases];
          break;
        default:
      }
      break;
    case 'srMtrlSelector':
      subjects = srMtrls;
      attributes = [openSrMtrl, editingList];
      displayTitles = [{ supplier: true }, { ref_no: true }];
      goBack = () => {
        props.history.push('/api/case/director');
      };
      break;
    case 'quoFormSelector':
      subjects = quotation.quoForms;
      attributes = switchQuoForm;
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
      {/* <div style={{ paddingTop: '50px' }} className='p-1 container'> */}
      <div
        className=' container container-with-navbar'
        // style={{ paddingTop: '60px' }}
      >
        <div className='grid-6'>
          <GoBackBtn onClick={goBack} />
          <SqToggleSwitchL
            name='isBoardMode'
            checked={isBoardMode}
            onChange={addCaseValue}
            label_1={<i className='fas fa-list-ul'> Table</i>}
            label_2={<i className='fas fa-table'> Board</i>}
          />
        </div>
        {isBoardMode === true ? (
          <Board
            purpose={purpose}
            subjects={subjects}
            displayTitles={displayTitles}
            toggleItemAttributes={attributes}
          />
        ) : (
          <Table
            purpose={purpose}
            subjects={subjects}
            displayTitles={displayTitles}
            toggleItemAttributes={attributes}
          />
        )}
        {/* </div> */}
      </div>
    </Fragment>
  );
};

export default ItemSelector;
