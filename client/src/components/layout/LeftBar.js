import React, { useContext } from 'react';
import CasesContext from '../../context/cases/casesContext';
import QuoContext from '../../context/quo/quoContext';
import SearchBar from './SearchBar';
// import Papa from 'papaparse';
import readXlsxFile from 'read-excel-file';

const LeftBar = ({ currentPath }) => {
  const casesContext = useContext(CasesContext);
  const quoContext = useContext(QuoContext);
  const {
    cWays,
    mtrls,
    cNo,
    addcWay,
    addSize,
    addMtrl,
    clearcNo,
    getStyleFromCSV,
    getM_list,
  } = casesContext;
  const { isQuotating, quotateFor, openQuoForm } = quoContext;

  //@ Define the current page for passing to searchBar
  let currentPage = '';
  switch (currentPath) {
    case '/api/case/merchandiser':
      currentPage = 'case';
      break;
    case '/api/case/mprice':
      currentPage = 'mprice';
      break;
    case '/api/quogarment':
      currentPage = 'quotation';
      break;
    case '/api/purchase':
      currentPage = 'purchase';
    default:
  }

  const onClick = (e) => {
    e.preventDefault();
    clearcNo(mtrls);
  };

  const updateBtnlabel = () => {
    let obj = {};
    switch (currentPath) {
      case '/api/case/merchandiser':
        if (cNo === null) {
          obj = {
            label: 'Add new Case',
            form: 'caseForm',
          };
          // return 'Add New Case';
        } else {
          obj = {
            label: 'Update the Case',
            form: 'caseForm',
          };
        }
        break;
      case '/api/case/mprice':
        obj = {
          label: 'Update the Price List',
          form: 'srMtrlForm',
        };
        break;
      case '/api/quogarment':
        if (quotateFor === 'material') {
          obj = {
            label: 'Update material quotation',
            form: 'srMtrlForm',
          };
        } else if (quotateFor === 'garment') {
          if (isQuotating !== null && openQuoForm === null) {
            obj = {
              label: 'Add new quotation',
              form: 'addNewQuoForm',
            };
          } else if (isQuotating !== null && openQuoForm !== null) {
            obj = {
              label: 'Uploadp the Quotation',
              form: 'quoForm',
            };
          }
        }
        break;
      case '/api/purchase':
        obj = {
          label: 'Create Order Summary',
          form: 'purchase',
        };
        break;
      default:
    }
    return obj;
  };

  let btnSwitcher = updateBtnlabel();

  // const readCsv = (csv) => {
  //   if (csv) {
  //     Papa.parse(csv, {
  //       download: true,
  //       header: true,
  //       complete: async (result) => {
  //         console.log(result);
  //         getStyleFromCSV(result.data);
  //         console.log('In the left bar', cWays);
  //         // readCsvInsertMtrl(result.data);
  //       },
  //     });
  //   } else {
  //     console.log('Please Select a csv file before reading it');
  //   }
  // };
  const readExcel = () => {
    const excel = document.getElementById('upload-excel').files[0];
    console.log('The excel', excel);
    console.log('The type of the excel itself', typeof excel);
    if (excel) {
      readXlsxFile(excel).then((rows) => {
        const JSONRows = JSON.stringify(rows);
        console.log(`The type of the rows, ${typeof JSONRows}`);
        console.log('The result ', JSONRows);
        getM_list(JSONRows);
      });
    } else {
      console.log('Please Select a excel file before reading it');
    }
  };

  return (
    <div className='container-with-navbar leftbar p-1 test-2'>
      <div className='leftbar-component test-4'>
        {' '}
        {'Import style from Excel'}
        {/* Read CSV */}
        {currentPage === 'case' ? (
          <div>
            <input type='file' id='upload-excel' accept='.xls, .xlsx' />

            <button onClick={readExcel}>Read Excel</button>
          </div>
        ) : null}
        {'Submit'}
        <input
          type='submit'
          form={btnSwitcher.form}
          className='btn btn-primary btn-block'
          value={btnSwitcher.label || ''}
        />
        {/* Submit
        </input> */}
        <SearchBar currentPage={currentPage} />
        <div>
          {'Color Way'}
          <button
            name='cWayBtn'
            className='btn btn-sm btn-primary btn-rounded-square'
            onClick={addcWay}
          >
            +
          </button>
        </div>
        <div>
          {'    '}
          {'Size'}
          <button
            name='sizeBtn'
            className='btn btn-sm btn-primary'
            onClick={addSize}
          >
            +
          </button>
        </div>
        <div>
          {'Material'}
          <button
            name='mtrlBtn'
            className='btn btn-sm btn-primary'
            onClick={addMtrl}
          >
            +
          </button>
        </div>
        <div>
          ye{' '}
          {cNo === null ? null : (
            <input
              type='submit'
              // form='caseForm'
              className='btn btn-primary btn-block'
              value='Copy this case as a new Case'
              onClick={onClick}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
