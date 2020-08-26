import React, { useContext, Fragment } from 'react';
import PropTypes from 'prop-types';
import CasesContext from '../../context/cases/casesContext';
import PopoverContext from '../../context/popover/popoverContext';

import Mtrl from './1_6_Mtrl';

const MtrlTable = ({ mtrl, idx, cellStyle }) => {
  const casesContext = useContext(CasesContext);
  const popoverContext = useContext(PopoverContext);

  const { mtrls, addMtrlValue, displayTitles } = casesContext;
  const isEditingMtrl = mtrl.isEditingMtrl;

  const { togglePopover } = popoverContext;

  const trueInDisplayTitles = displayTitles.filter((obj) => {
    return Object.values(obj)[0] == true;
  }).length;

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
        <div className='flexBox bd-light bd-no-t bg-cp-elem' onClick={onClick}>
          <div style={cellStyle('no')}>{idx + 1}</div>
          <div style={cellStyle('item')}>{mtrl.item}</div>
          {displayTitles.map((title) => {
            if (title[Object.keys(title)[0]]) {
              console.log('the length of dispalytitles', trueInDisplayTitles); // Test Code
              if (Object.keys(title)[0] == 'descriptions') {
                return (
                  <div
                    style={cellStyle(
                      Object.keys(title)[0],
                      trueInDisplayTitles
                    )}
                    key={`${Object.keys(title)[0]}${mtrl.id}`}
                  >
                    {mtrl[Object.keys(title)[0]].map((des, idx) => (
                      <div
                        key={`${des}OfNum${idx}Of${mtrl.id}`}
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
                    key={`${Object.keys(title)[0]}${mtrl.id}`}
                  >
                    {mtrl[Object.keys(title)[0]]}
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

export default MtrlTable;

// PropTyeps
MtrlTable.propTypes = {
  mtrl: PropTypes.object.isRequired,
  cellStyle: PropTypes.func.isRequired,
  idx: PropTypes.number.isRequired,
};
