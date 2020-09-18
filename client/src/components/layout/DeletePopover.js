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
  const { deleteSRMtrlByMtrl, deleteSrMtrlPrice } = srMtrlContext;
  const { comName, comSymbol } = authUserContext;
  const {
    togglePopover,
    toggleLoading,
    current,
    isLoading,
    doubleCheck,
    addDoubleCheckValue,
  } = popoverContext;
  const { deleteQuoForm, deletemQuo, switchQuoForm } = quoContext;
  const { deleteOs } = purContext;
  // }
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
        switchQuoForm(null);
        break;
      case 'deleteOs':
        deleteOs(current._id);
        break;
      case 'deleteMPrice':
        const ids = {
          srMtrlId: current.srMtrlId,
          mPriceId: current.id,
        };
        deleteSrMtrlPrice(ids);
        break;
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
      case 'deleteOs':
        return `Order Summary : ${current.osNo}`;
      case 'deleteMPrice':
        return ` Price in SPEC : ${current.sizeSPEC}, and Color : ${current.mColor}`;

      default:
        return 'No defined';
    }
  };

  const doubleCheckInput = () => {
    if (current.target === 'case' || current.target === 'quoForm') {
      return (
        <div key='doubleCheckDiv' className='px-1'>
          <div className='fs-tiny'>Enter the Number for deleting</div>
          <input
            key='doubleCheckInput'
            type='text'
            value={doubleCheck || ''}
            onChange={addDoubleCheckValue}
            placeholder={current.cNo ? current.cNo : current.quoNo}
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
            <div className='p-2 h-20'>Delete this {`${words()}`}</div>
            <div className='center-content h-40'>
              {' '}
              <h3>Are you sure?</h3>
            </div>

            <div className='h-20 px-2'>{doubleCheckInput()}</div>
            <div className='h-scatter-content p-1 h-20'>
              <div className='center-content w-50'>
                <button
                  className='btn btn-sq btn-block sq-block bg-safe'
                  onClick={togglePopover}
                >
                  Back
                </button>
              </div>
              <div className='center-content w-50'>
                {(current.target === 'case' && doubleCheck != current.cNo) ||
                (current.target === 'quoForm' &&
                  doubleCheck != current.quoNo) ? (
                  <div className='btn btn-sq btn-block sq-block bg-cp-2 fc-cp-3 center-content'>
                    Delete
                  </div>
                ) : (
                  <button
                    className='btn btn-sq btn-block sq-block bg-warning'
                    onClick={onChangeDelete}
                  >
                    Delete
                  </button>
                )}
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
