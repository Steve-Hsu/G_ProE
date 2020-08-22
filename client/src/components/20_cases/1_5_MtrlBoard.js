import React, { useContext, Fragment } from 'react';
import PropTypes from 'prop-types';
import CasesContext from '../../context/cases/casesContext';
import PopoverContext from '../../context/popover/popoverContext';

import Mtrl from './1_6_Mtrl';

const MtrlBoard = ({ mtrl }) => {
  const casesContext = useContext(CasesContext);
  const popoverContext = useContext(PopoverContext);

  const { mtrls, addMtrlValue } = casesContext;
  const isEditingMtrl = mtrl.isEditingMtrl;

  const { togglePopover } = popoverContext;

  const onClick = (e) => {
    e.target.name = mtrl.id;
    e.target.id = 'isEditingMtrl';
    addMtrlValue(e);
  };

  return (
    <Fragment>
      {isEditingMtrl == true ? (
        <Mtrl key={mtrl.id} mtrl={mtrl} />
      ) : (
        <div
          className='boardChild round-card bg-cp-elem bd-light'
          onClick={onClick}
        >
          <div>No.{mtrls.findIndex(({ id }) => id === mtrl.id) + 1}</div>
          <div>{mtrl.item}</div>
          <div>{mtrl.supplier}</div>
          <div>{mtrl.ref_no}</div>
          <div>{mtrl.position}</div>
        </div>
      )}
    </Fragment>
  );
};

export default MtrlBoard;

// PropTyeps
MtrlBoard.propTypes = {
  mtrl: PropTypes.object.isRequired,
};
