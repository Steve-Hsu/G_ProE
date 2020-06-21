import React, { useContext } from 'react';
import CasesContext from '../../context/cases/casesContext';

const DeletePopover = () => {
  const casesContext = useContext(CasesContext);
  const {
    togglePopover,
    current,
    deletecWay,
    deleteSize,
    deleteMtrl,
  } = casesContext;

  const onChangeDelete = (e) => {
    switch (Object.keys(current)[1]) {
      case 'gClr':
        deletecWay(e);
        break;
      case 'gSize':
        deleteSize(e);
        break;
      case 'item':
        deleteMtrl(e);
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
              value={current.id}
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
