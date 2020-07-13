import React, { useContext } from 'react';
import CasesContext from '../../context/cases/casesContext';
import AuthUserContext from '../../context/authUser/authUserContext';
import SrMtrlContext from '../../context/srMtrl/srMtrlContext';
import PopoverContext from '../../context/popover/popoverContext';

const DeletePopover = () => {
  const casesContext = useContext(CasesContext);
  const authUserContext = useContext(AuthUserContext);
  const srMtrlContext = useContext(SrMtrlContext);
  const popoverContext = useContext(PopoverContext);
  const {
    _id,
    caseType,
    style,
    client,
    cWays,
    sizes,
    gQtys,
    mtrls,
    deletecWay,
    deleteSize,
    deleteMtrl,
    uploadCase,
  } = casesContext;
  const { deleteSRMtrlByMtrl } = srMtrlContext;
  const { comName, comSymbol } = authUserContext;
  const { togglePopover, current } = popoverContext;

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

    switch (Object.keys(current)[1]) {
      case 'gClr':
        deletecWay(current.id);
        cases.cWays = cWays.filter((cWay) => {
          return cWay.id !== current.id;
        });

        break;
      case 'gSize':
        deleteSize(current.id);
        cases.sizes = sizes.filter((size) => {
          return size.id !== current.id;
        });

        break;
      case 'item':
        deleteSRMtrlByMtrl(comName, comSymbol, current, _id);
        deleteMtrl(current.id);
        cases.mtrls = mtrls.filter((mtrl) => {
          return mtrl.id !== current.id;
        });

        break;
      default:
    }
    uploadCase(cases, _id, false);
    togglePopover(e);
  };

  const words = () => {
    switch (Object.keys(current)[1]) {
      case 'gClr':
        return `Color : ${current.gClr}`;
      case 'gSize':
        return `Size :  ${current.gSize}`;
      case 'item':
        return `Material :  ${current.item}`;
      default:
    }
  };

  return (
    <div className='popup'>
      <div className='popup-inner'>
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
    </div>
  );
};

export default DeletePopover;
