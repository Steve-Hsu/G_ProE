import React, { useContext, Fragment } from 'react';
import PropTypes from 'prop-types';
import PopoverContext from '../../../context/popover/popoverContext';
import SrMtrl from '../../30_srMtrl/30_01_srMtrl';

import Mtrl from '../../20_cases/1_6_Mtrl';

const BoardItem = ({
  id,
  purpose,
  displayTitles,
  // subjects,
  subject,
  toggleItemAttributes,
  idx,
}) => {
  const popoverContext = useContext(PopoverContext);

  const isEditingMtrl = subject.isEditingMtrl;

  const { togglePopover } = popoverContext;

  const onClick = (e) => {
    // console.log('Hit onClick'); // test Codes
    switch (purpose) {
      case 'CaseSelector':
        e.target.name = 'isEditingCase';
        //in here the toggleItemAttributes is an array containing 2 functions
        toggleItemAttributes[0](id);
        toggleItemAttributes[1](e);
        break;
      case '1_CaseForm':
        e.target.name = subject.id;
        e.target.id = 'isEditingMtrl';
        toggleItemAttributes(e);
        break;
      case 'quoCaseSelector':
        if (subject.cNo) {
          toggleItemAttributes(subject.cNo);
        }
        break;
      case 'quoFormSelector':
        toggleItemAttributes(subject._id);
        break;
      case 'srMtrlSelector':
      case 'purCaseSelector':
        toggleItemAttributes[0](subject._id);
        break;
      default:
    }
  };

  const selectedBackGround = (id) => {
    let style = { overflow: 'auto' };
    if (purpose === 'purCaseSelector') {
      let check = toggleItemAttributes[1].includes(id);
      if (check) {
        style = { background: 'var(--cp-1_2)', overflow: 'auto' };
      }
    }
    return style;
  };

  return (
    <Fragment>
      {purpose === '1_CaseForm' && isEditingMtrl == true ? (
        <Mtrl key={subject.id} mtrl={subject} />
      ) : purpose === 'srMtrlSelector' &&
        toggleItemAttributes[1].includes(id) ? (
        <SrMtrl srMtrl={subject} />
      ) : (
        <div
          className='boardChild round-card bg-cp-elem bd-light hover-cp-2'
          style={selectedBackGround(id)}
          onClick={onClick}
        >
          <div>
            No.
            {idx + 1}
          </div>
          {displayTitles.map((title) => {
            return (
              <div
                key={`${Object.keys(title)[0]}${
                  subject.id ? subject.id : subject._id
                }`}
              >
                {subject[Object.keys(title)[0]]}
              </div>
            );
          })}
          {/* <div>{subject[target]}</div>
          <div>{subject.supplier}</div>
          <div>{subject.ref_no}</div>
          <div>{subject.position}</div> */}
        </div>
      )}
    </Fragment>
  );
};

export default BoardItem;

// PropTyeps
BoardItem.propTypes = {
  displayTitles: PropTypes.array.isRequired,
  subject: PropTypes.object.isRequired,
};
