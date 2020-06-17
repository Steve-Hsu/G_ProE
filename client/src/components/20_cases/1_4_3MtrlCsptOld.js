import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import CasesContext from '../../context/cases/casesContext';

const MtrlCspt = ({ cWay, mtrl }) => {
  const casesContext = useContext(CasesContext);
  const { addValueMtrlCspt, sizes, cWays } = casesContext;
  //@ Value for input
  //words length limit
  const maxWdsLength = '4';
  const csptLength = maxWdsLength;
  const SizesColumnSize = () => {
    if (sizes.length < 6) {
      return 5;
    } else {
      return sizes.length;
    }
  };

  const attachedTables = {
    display: 'grid',
    gridTemplateColumns: `repeat(${SizesColumnSize()}, 1fr)`,
    gridGap: '0',
  };

  return (
    <div style={attachedTables}>
      {mtrl.cspts.map((cspt) => {
        if (cspt.cWay === cWay.id) {
          const sizeLable = sizes.find(({ id }) => id === cspt.size).gSize;
          const colorLable = cWays.find(({ id }) => id === cspt.cWay).gClr;
          return (
            <div style={{ height: '68px' }} key={cspt.id}>
              <input
                name={mtrl.id}
                id={cspt.id}
                type='number'
                placeholder='.'
                onChange={addValueMtrlCspt}
                maxLength={csptLength}
                value={cspt.cspt || ''}
                min='0'
                max='999'
                className='MPH-input'
              />
              <label
                htmlFor={cspt.id}
                className='MPH-input-label'
              >{`${sizeLable} in ${colorLable}`}</label>
            </div>
          );
        }
      })}
    </div>
  );
};

export default MtrlCspt;

MtrlCspt.propTypes = {
  cWay: PropTypes.object.isRequired,
  mtrl: PropTypes.object.isRequired,
};
