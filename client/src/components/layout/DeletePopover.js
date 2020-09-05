import React, { useContext } from 'react';
import CasesContext from '../../context/cases/casesContext';
import AuthUserContext from '../../context/authUser/authUserContext';
import SrMtrlContext from '../../context/srMtrl/srMtrlContext';
import PopoverContext from '../../context/popover/popoverContext';
import QuoContext from '../../context/quo/quoContext';
import PurContext from '../../context/pur/purContext';
import Spinner from '../../components/layout/Spinner';

const DeletePopover = () => {
  const casesContext = useContext(CasesContext);
  const authUserContext = useContext(AuthUserContext);
  const srMtrlContext = useContext(SrMtrlContext);
  const popoverContext = useContext(PopoverContext);
  const purContext = useContext(PurContext);
  const { _id, cNo, deleteMtrl, deletecWayOrgSize, deleteCase } = casesContext;
  const quoContext = useContext(QuoContext);
  const { deleteSRMtrlByMtrl } = srMtrlContext;
  const { comName, comSymbol } = authUserContext;
  const {
    togglePopover,
    toggleLoading,
    current,
    isLoading,
    doubleCheck,
    addDoubleCheckValue,
  } = popoverContext;
  const { deleteQuoForm, deletemQuo } = quoContext;
  const { deleteOs } = purContext;

  const onChangeDelete = (e) => {
    e.preventDefault();
    const caseId = _id;
    switch (current.target) {
      case 'cWay':
        deletecWayOrgSize('gClr', caseId, current.id);
        break;
      case 'size':
        deletecWayOrgSize('gSize', caseId, current.id);
        break;
      case 'mtrl':
        deleteSRMtrlByMtrl(comName, comSymbol, current, _id);
        deleteMtrl(caseId, current.id);
        break;
      case 'case':
        if (doubleCheck === cNo) {
          deleteCase(current.caseId);
          console.log('Yes We can delete the case');
        }
        break;
      case 'quoForm':
        const body = {
          quoNo: current.quoNo,
          quoFormId: current._id,
        };
        deleteQuoForm(body);
        break;
      case 'deleteOs':
        deleteOs(current._id);
      default:
    }

    toggleLoading(e);
    setTimeout(() => {
      toggleLoading();
      togglePopover(e);
    }, 1500);
  };

  const words = () => {
    switch (current.target) {
      case 'cWay':
        return `Color : ${current.gClr}`;
      case 'size':
        return `Size :  ${current.gSize}`;
      case 'mtrl':
        return `Material :  ${current.item}, Ref_no : ${current.ref_no}`;
      case 'case':
        return `This Case : ${current.cNo}`;
      case 'quoForm':
        return `Quotation Form : ${current.quoNo}`;
      case 'deleteOs':
        return `Order Summary : ${current.osNo}`;
      default:
    }
  };

  const doubleCheckInput = () => {
    if (current.target === 'case') {
      return (
        <div key='doubleCheckDiv' className='px-1'>
          Enter the Case Number
          <input
            key='doubleCheckInput'
            type='text'
            value={doubleCheck || ''}
            onChange={addDoubleCheckValue}
          />
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div className='popup'>
      <div className='popup-inner bd-radius-s'>
        {isLoading === false ? (
          <div className='popup-container bd-light bd-radius-s bg-cp-2'>
            <div className='h-70'>
              <div className='p-2 h-30'>
                You will delete this {`${words()}`}
              </div>
              <div className='center-content h-70'>
                {' '}
                <h3>Are you sure?</h3>
              </div>
            </div>

            <div className='h-40'>
              {doubleCheckInput()}
              <div className='h-scatter-content p-1 h-50'>
                <div className='center-content w-50'>
                  <button
                    className='btn btn-sq btn-block sq-block bg-safe'
                    onClick={togglePopover}
                  >
                    Back
                  </button>
                </div>
                <div className='center-content w-50'>
                  <button
                    className='btn btn-sq btn-block sq-block bg-warning'
                    onClick={onChangeDelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className='popup-container bd-light bd-radius-s bg-cp-2'>
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default DeletePopover;
