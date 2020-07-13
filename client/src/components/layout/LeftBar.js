import React, { useContext } from 'react';
import AuthContext from '../../context/authUser/authUserContext';
import CasesContext from '../../context/cases/casesContext';
import QuoContext from '../../context/quo/quoContext';
import SearchBar from './SearchBar';

const LeftBar = ({ currentPath }) => {
  const authContext = useContext(AuthContext);
  const casesContext = useContext(CasesContext);
  const quoContext = useContext(QuoContext);
  const { mtrls, cNo, addcWay, addSize, addMtrl, clearcNo } = casesContext;
  const { isQuotating, quotateFor } = quoContext;

  //@ Define the current page for passing to searchBar
  let currentPage = '';
  switch (currentPath) {
    case '/api/case/merchandiser':
      currentPage = 'case';
      break;
    case '/api/case/mprice':
      currentPage = 'mprice';
      break;
    case '/api/case/quogarment':
      currentPage = 'quotation';
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
        } else if (quotateFor === 'garment' && isQuotating !== null) {
          obj = {
            label: 'Add new quotation',
            form: 'addNewQuoForm',
          };
        }
        break;
      default:
    }
    return obj;
  };

  let btnSwitcher = updateBtnlabel();

  return (
    <div className='container-with-navbar leftbar p-1 test-2'>
      <div className='leftbar-component test-4'>
        {' '}
        {'Import style from Excel'}
        <input type='text' name='import' id='imoprt' />
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
