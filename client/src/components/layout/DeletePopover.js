import React, { useContext } from 'react';
import CasesContext from '../../context/cases/casesContext';
import AuthUserContext from '../../context/authUser/authUserContext';
import SrMtrlContext from '../../context/srMtrl/srMtrlContext';

const DeletePopover = () => {
  const casesContext = useContext(CasesContext);
  const authUserContext = useContext(AuthUserContext);
  const srMtrlContext = useContext(SrMtrlContext);
  const {
    _id,
    caseType,
    style,
    client,
    cWays,
    sizes,
    gQtys,
    mtrls,
    togglePopover,
    current,
    deletecWay,
    deleteSize,
    deleteMtrl,
    uploadCase,
  } = casesContext;
  const { deleteSRMtrlByMtrl } = srMtrlContext;
  const { comName, comSymbol } = authUserContext;

  const onChangeDelete = async (e) => {
    e.preventDefault();
    switch (Object.keys(current)[1]) {
      case 'gClr':
        deletecWay(current.Id);
        break;
      case 'gSize':
        deleteSize(current.Id);
        break;
      case 'item':
        const mtrlId = current.id;
        deleteSRMtrlByMtrl(comName, comSymbol, current, _id);
        deleteMtrl(mtrlId);
        const cases = {
          caseType: caseType,
          style: style,
          client: client,
          cWays: cWays,
          sizes: sizes,
          gQtys: gQtys,
          mtrls: mtrls.filter((mtrl) => {
            return mtrl.id !== current.id;
          }),
        };
        uploadCase(cases, _id, false);
        break;
      default:
    }

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
