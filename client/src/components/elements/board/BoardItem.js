import React, { useContext, Fragment } from 'react';
import PropTypes from 'prop-types';
import PopoverContext from '../../../context/popover/popoverContext';

import Mtrl from '../../20_cases/1_6_Mtrl';

const BoardItem = ({ subjects, subject, toggleItemFunc }) => {
  const popoverContext = useContext(PopoverContext);

  const isEditingMtrl = subject.isEditingMtrl;

  const { togglePopover } = popoverContext;

  const onClick = (e) => {
    e.target.name = subject.id;
    e.target.id = 'isEditingMtrl';
    toggleItemFunc(e);
  };

  return (
    <Fragment>
      {isEditingMtrl == true ? (
        <Mtrl key={subject.id} mtrl={subject} />
      ) : (
        <div
          className='boardChild round-card bg-cp-elem bd-light'
          onClick={onClick}
        >
          <div>No.{subjects.findIndex(({ id }) => id === subject.id) + 1}</div>
          <div>{subject.item}</div>
          <div>{subject.supplier}</div>
          <div>{subject.ref_no}</div>
          <div>{subject.position}</div>
        </div>
      )}
    </Fragment>
  );
};

export default BoardItem;

// PropTyeps
BoardItem.propTypes = {
  subjects: PropTypes.array.isRequired,
  subject: PropTypes.object.isRequired,
  toggleItemFunc: PropTypes.func.isRequired,
};
