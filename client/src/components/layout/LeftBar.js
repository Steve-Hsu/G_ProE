import React, { useContext } from 'react';
import CasesContext from '../../context/cases/casesContext';
import QuoContext from '../../context/quo/quoContext';
import SearchBar from './SearchBar';
// import Papa from 'papaparse';
import readXlsxFile from 'read-excel-file';
import SqBtnLarge from '../elements/btns/SqBtnLarge';

const LeftBar = ({ currentPath }) => {
  const casesContext = useContext(CasesContext);
  const quoContext = useContext(QuoContext);
  const {
    addCaseValue,
    mtrls,
    cNo,
    addcWay,
    addSize,
    addMtrl,
    clearcNo,
    getM_list,
    isImportedExcel,
    inputFileName,
  } = casesContext;
  const { isQuotating, quotateFor, openQuoForm } = quoContext;
  const SHEET_NAME_LIST = [
    'bom',
    'trims',
    'shell',
    'fabric',
    'accessories',
    'spec',
    '228184',
    '#334183',
    'tabelle1',
  ];
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
  let excelName = '';
  const labelOfReadExcel = (e) => {
    if (document.getElementById('upload-excel').value) {
      excelName = document.getElementById('upload-excel').value;
      console.log('The e.target.value', e.target.value);
      addCaseValue(e);

      console.log(excelName);
      console.log(typeof excelName);
    }
    // let excelName = document.getElementById('upload-excel').value; // Test Code
  };

  // Parse CSV locally----,
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

  // Parse Excel by http request
  const readExcel = () => {
    const excel = document.getElementById('upload-excel').files[0];
    // console.log('The excel', excel); // Test code
    // console.log('The type of the excel itself', typeof excel); // Test Code
    // Default the input, preventing double input the same bom
    const inputValue = document.getElementById('upload-excel').value;
    console.log('the inputValue', inputValue);

    if (inputValue) {
      const styleName = inputValue
        .slice(12)
        .replace('.xlsx', '')
        .replace('.xls', '');
      addCaseValue({
        target: {
          name: 'style',
          value: styleName,
        },
      });
      addCaseValue({ target: { name: 'isImportedExcel' } });
    }

    document.getElementById('upload-excel').value = null;

    if (excel) {
      const regex = new RegExp(SHEET_NAME_LIST.join('|'), 'i');
      let resultSheet = new Array();

      readXlsxFile(excel, { getSheets: true }).then((sheets) => {
        console.log('the sheets name', sheets);

        const insertArr = new Promise((resolve) => {
          let num_L_1 = 0;
          sheets.map((sheet) => {
            if (regex.test(sheet.name)) {
              console.log('the sheet pushed', sheet.name);
              readXlsxFile(excel, { sheet: sheet.name }).then((rows) => {
                console.log(typeof rows);
                console.log('the rows', rows);

                rows.map((row, idx) => {
                  resultSheet.push(row);
                  if (idx + 1 == rows.length) {
                    num_L_1 = num_L_1 + 1;
                    if (num_L_1 === sheets.length) {
                      resolve();
                    }
                  }
                });
              });
            } else {
              num_L_1 = num_L_1 + 1;
              if (num_L_1 == sheet.length) {
                resolve();
              }
            }
          });
        });

        Promise.all([insertArr]).then(() => {
          console.log('the resultSheet', resultSheet);
          const JSONRows = JSON.stringify(resultSheet);
          console.log('the json JSONRows', JSONRows);
          getM_list(JSONRows);
        });
      });
    } else {
      console.log('Please Select a excel file before reading it');
    }
  };

  return (
    <div className='container-with-navbar leftbar p-1 bg-cp-1 bd-light bd-no-t h-100'>
      <div className='leftbar-component'>
        {' '}
        {/* Read CSV */}
        {currentPage === 'case' ? (
          isImportedExcel ? (
            <div>Have imported Style from Excel</div>
          ) : (
            <div className='round-area bg-cp-3'>
              <i className='fas fa-table fc-cp-1'> Read Bom from Excel</i>
              <label className='btn btn-block mt-05 bd-radius-s bd-light bg-cp-1 fs-small'>
                <input
                  type='file'
                  id='upload-excel'
                  name='inputFileName'
                  accept='.xls, .xlsx'
                  style={{ position: 'fixed', right: '100%', bottom: '100%' }}
                  onChange={labelOfReadExcel}
                />
                {excelName.length > 0 ? String(excelName) : null}
                {inputFileName}
              </label>
              {inputFileName == 'Select a File...' ? null : (
                <button
                  className='btn btn-block mt-05 h-100 bd-radius-s bd-light bg-cp-2'
                  onClick={readExcel}
                >
                  Read
                </button>
              )}
            </div>
          )
        ) : null}
        {/* Upper load btn */}
        <div className='round-area bg-cp-3 mt-1'>
          <i className='fas fa-cloud-upload-alt fc-cp-1 mb-05'> Save</i>
          <input
            type='submit'
            form={btnSwitcher.form}
            className='btn bg-cp-2 btn-block'
            value={btnSwitcher.label || ''}
          />
        </div>
        {/* Submit
        </input> */}
        {/* SearchBar */}
        {/* <SearchBar currentPage={currentPage} /> */}
        <div className='h-scatter-content mt-1'>
          <div> Color Way</div>
          <SqBtnLarge
            label={<i className='fas fa-swatchbook'> Color ＋</i>}
            onClick={addcWay}
          />
        </div>
        <div className='h-scatter-content mt-05'>
          <div>Size </div>
          <SqBtnLarge
            label={<i className='fas fa-ruler'> Size ＋</i>}
            onClick={addSize}
          />
        </div>
        <div className='h-scatter-content mt-05'>
          <div>Material</div>
          <SqBtnLarge
            label={<i className='fab fa-buffer '> Item ＋</i>}
            onClick={addMtrl}
          />
        </div>
        <div>
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
