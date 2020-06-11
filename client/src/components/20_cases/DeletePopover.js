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
    }
  };

  return (
    <div className='popup'>
      <div className='popup_inner'>
        <div>
          <button
            value={current.id}
            className='btn btn-danger btn-block'
            onClick={onChangeDelete}
          >
            Delete this {`${words()}`}
          </button>
        </div>
        <div>
          <button className='btn btn-primary btn-block' onClick={togglePopover}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopover;
