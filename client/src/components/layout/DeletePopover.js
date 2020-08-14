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
  const {
    _id,
    cNo,
    caseType,
    style,
    client,
    cWays,
    sizes,
    gQtys,
    mtrls,
    // deletecWay,
    // deleteSize,
    deleteMtrl,
    uploadCase,
    deletecWayOrgSize,
  } = casesContext;
  const quoContext = useContext(QuoContext);
  const { deleteSRMtrlByMtrl } = srMtrlContext;
  const { comName, comSymbol } = authUserContext;
  const { togglePopover, toggleLoading, current, isLoading } = popoverContext;
  const { deleteQuoForm, deletemQuo } = quoContext;
  const { deleteOs } = purContext;

  const onChangeDelete = (e) => {
    e.preventDefault();
    const cases = {
      caseType: caseType,
      style: style,
      client: client,
      cWays: cWays,
      sizes: sizes,
      gQtys: gQtys,
      mtrls: mtrls,
    };
    const caseId = _id;
    switch (Object.keys(current)[1]) {
      case 'gClr':
        // deletecWay(current.id);
        deletecWayOrgSize('gClr', caseId, current.id);
        break;
      case 'gSize':
        // deleteSize(current.id);
        deletecWayOrgSize('gSize', caseId, current.id);
        break;
      case 'item':
        deleteSRMtrlByMtrl(comName, comSymbol, current, _id);
        deletemQuo(cNo, current.id);
        deleteMtrl(current.id);
        cases.mtrls = mtrls.filter((mtrl) => {
          return mtrl.id !== current.id;
        });
        uploadCase(cases, _id, false);
        break;
      case 'quocWays':
        const body = {
          quoNo: current.quoNo,
          quoFormId: current._id,
        };
        deleteQuoForm(body);
        break;
      case 'cNos':
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
    switch (Object.keys(current)[1]) {
      case 'gClr':
        return `Color : ${current.gClr}`;
      case 'gSize':
        return `Size :  ${current.gSize}`;
      case 'item':
        return `Material :  ${current.item}`;
      case 'quoNo':
        return `Quotation Form : ${current.quoNo}`;
      case 'cNos':
        return `Order Summary : ${current.osNo}`;
      default:
    }
  };

  return (
    <div className='popup'>
      <div className='popup-inner'>
        {isLoading === false ? (
          <div>
            <div className='popup-container'>
              <div>You will delete this {`${words()}`}</div>
              <h3>Are you sure?</h3>
            </div>
            <div className='popup-btn-holder'>
              <div>
                <button
                  className='btn btn-danger btn-block center'
                  onClick={onChangeDelete}
                >
                  Delete
                </button>
              </div>
              <div>
                <button
                  className='btn btn-primary btn-block center'
                  onClick={togglePopover}
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default DeletePopover;
