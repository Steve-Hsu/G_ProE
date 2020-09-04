import React, { useContext, Fragment } from 'react';
import PropTypes from 'prop-types';
import PopoverContext from '../../../context/popover/popoverContext';

import Mtrl from '../../20_cases/1_6_Mtrl';

const TableItem = ({
  id,
  subject,
  idx,
  displayTitles,
  cellStyle,
  toggleItemFunc,
  purpose,
}) => {
  const popoverContext = useContext(PopoverContext);

  //   const { mtrls, addMtrlValue, displayTitles } = casesContext;
  const isEditingMtrl = subject.isEditingMtrl;

  const { togglePopover } = popoverContext;

  const trueInDisplayTitles = displayTitles.filter((obj) => {
    return Object.values(obj)[0] == true;
  }).length;

  const onClick = (e) => {
    switch (purpose) {
      case 'CaseSelector':
        e.target.name = 'isEditingCase';
        //in here the toggleItemFunc is an array containing 2 functions
        toggleItemFunc[0](id);
        toggleItemFunc[1](e);
        break;
      case '1_CaseForm':
        e.target.name = subject.id;
        e.target.id = 'isEditingMtrl';
        toggleItemFunc(e);
        break;
      case 'quoCaseSelector':
        if (subject.cNo) {
          toggleItemFunc(subject.cNo);
        }
        break;
      case 'quoFormSelector':
        toggleItemFunc(subject._id);
        break;
      case 'purCaseSelector':
        toggleItemFunc[0](subject._id);
        break;
      default:
    }
  };

  const selectedBackGround = (id) => {
    let style = { overflow: 'auto' };
    if (purpose === 'purCaseSelector') {
      let check = toggleItemFunc[1].includes(id);
      if (check) {
        style = { background: 'var(--cp-1_2)', overflow: 'auto' };
      }
    }
    return style;
  };

  return (
    <Fragment>
      {isEditingMtrl == true ? (
        <Mtrl key={subject.id} mtrl={subject} />
      ) : purpose === 'purCaseSelector' && subject.poDate !== null ? null : (
        <div
          className='flexBox bd-light bd-no-t bg-cp-elem'
          onClick={onClick}
          style={selectedBackGround(id)}
          // style={{ background: 'red' }}
        >
          <div style={cellStyle('no')}>{idx + 1}</div>
          {purpose === '1_CaseForm' ? (
            <div style={cellStyle('item')}>{subject.item}</div>
          ) : null}
          {displayTitles.map((title) => {
            if (title[Object.keys(title)[0]]) {
              //   console.log('the length of dispalytitles', trueInDisplayTitles); // Test Code
              if (Object.keys(title)[0] == 'descriptions') {
                return (
                  <div
                    style={cellStyle(
                      Object.keys(title)[0],
                      trueInDisplayTitles
                    )}
                    key={`${Object.keys(title)[0]}${subject.id}`}
                  >
                    {subject[Object.keys(title)[0]].map((des, idx) => (
                      <div
                        key={`${des}OfNum${idx}Of${subject.id}`}
                        className='mr-1'
                        style={{
                          whiteSpace: 'nowrap',
                        }}
                      >
                        <div> {des}</div>
                      </div>
                    ))}
                  </div>
                );
              } else {
                return (
                  <div
                    style={cellStyle(
                      Object.keys(title)[0],
                      trueInDisplayTitles
                    )}
                    key={`${Object.keys(title)[0]}${subject.id}`}
                  >
                    {subject[Object.keys(title)[0]]}
                  </div>
                );
              }
            } else {
              return null;
            }
          })}
        </div>
      )}
    </Fragment>
  );
};

export default TableItem;

// PropTyeps
TableItem.propTypes = {
  subject: PropTypes.object.isRequired,
  cellStyle: PropTypes.func.isRequired,
  displayTitles: PropTypes.array.isRequired,
  idx: PropTypes.number.isRequired,
};
