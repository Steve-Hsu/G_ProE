import React, { useContext, Fragment } from 'react';
import PropTypes from 'prop-types';
import PopoverContext from '../../context/popover/popoverContext';

import Mtrl from '../20_cases/1_6_Mtrl';

const TableItem = ({
  subject,
  idx,
  displayTitles,
  cellStyle,
  toggleItemFunc,
}) => {
  const popoverContext = useContext(PopoverContext);

  //   const { mtrls, addMtrlValue, displayTitles } = casesContext;
  const isEditingMtrl = subject.isEditingMtrl;

  const { togglePopover } = popoverContext;

  const trueInDisplayTitles = displayTitles.filter((obj) => {
    return Object.values(obj)[0] == true;
  }).length;

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
        <div className='flexBox bd-light bd-no-t bg-cp-elem' onClick={onClick}>
          <div style={cellStyle('no')}>{idx + 1}</div>
          <div style={cellStyle('item')}>{subject.item}</div>
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
  mtrl: PropTypes.object.isRequired,
  cellStyle: PropTypes.func.isRequired,
  displayTitles: PropTypes.array.isRequired,
  idx: PropTypes.number.isRequired,
};
