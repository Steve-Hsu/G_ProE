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
            if (title == 'descriptions') {
              return (
                <div
                  // className='flexBox overflow-auto-x'
                  style={cellStyle(title, displayTitles.length)}
                  key={`${title}${mtrl.id}`}
                >
                  {mtrl[title].map((des, idx) => (
                    <div key={`${des}OfNum${idx}Of${mtrl.id}`} className='mr-1'>
                      {des}
                    </div>
                  ))}
                </div>
              );
            } else {
              return (
                <div
                  style={cellStyle(title, displayTitles.length)}
                  key={`${title}${mtrl.id}`}
                >
                  {mtrl[title]}
                </div>
              );
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
};
