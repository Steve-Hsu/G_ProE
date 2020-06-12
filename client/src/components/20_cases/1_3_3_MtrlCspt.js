import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import CasesContext from '../../context/cases/casesContext';

const MtrlCspt = ({ cWay, mtrl }) => {
  const casesContext = useContext(CasesContext);
  const { addValueMtrlCspt, sizes, cWays } = casesContext;

  return (
    <div className='grid-5'>
      {mtrl.cspts.map((cspt) => {
        if (cspt.cWay === cWay.id) {
          const sizeLable = sizes.find(({ id }) => id === cspt.size).gSize;
          const colorLable = cWays.find(({ id }) => id === cspt.cWay).gClr;
          return (
            <div key={cspt.id}>
              <input
                name={mtrl.id}
                id={cspt.id}
                type='text'
                placeholder={`${sizeLable} in ${colorLable}`}
                onChange={addValueMtrlCspt}
              />
            </div>
          );
        }
      })}
    </div>
  );

  //   return mtrl.cspts.map((cspt) => {
  //     if (y) {
  //       const sizeLable = sizes.find(({ id }) => id === cspt.size).gSize;
  //       const colorLable = cWays.find(({ id }) => id === cspt.cWay).gClr;
  //       return (
  //         <div className='test-1 p'>
  //           <input
  //             name={mtrl.id}
  //             id={cspt.id}
  //             type='text'
  //             placeholder={`${sizeLable} in ${colorLable}`}
  //             value={cspt.cspt}
  //             onChange={addValueMtrlCspt}
  //           />
  //         </div>
  //       );
  //     } else {
  //       return null;
  //     }
  //   });
};

export default MtrlCspt;

MtrlCspt.propTypes = {
  cWay: PropTypes.object.isRequired,
  mtrl: PropTypes.object.isRequired,
};
