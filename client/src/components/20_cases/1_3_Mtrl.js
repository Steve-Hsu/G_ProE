import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import CasesContext from '../../context/cases/casesContext';
import MtrlClr from './1_3_1_MtrlClr';

const Mtrl = ({ mtrl }) => {
  const casesContext = useContext(CasesContext);
  const { deleteMtrl, expandMtrlColor } = casesContext;
  return (
    <div className='grid-6 pb test-3'>
      {/* Row_1  */}
      <div className='test-1'>
        <p>item</p>
        <input type='text' name='item' placeholder='Item' />
      </div>
      <div className='test-1'>
        <p>SPEC</p>
        <input type='text' name='spec' placeholder='spec' />
      </div>
      <div className='test-1'>
        <p>Supplier</p>
        <input type='text' name='supplier' placeholder='Supplier' />
      </div>
      <div className='test-1'>
        <p>REF_No</p>
        <input type='text' name='ref_no' placeholder='Reference Number' />
      </div>
      <div className='test-1'>
        <p>Position</p>
        <input type='text' name='position' placeholder='Position' />
      </div>
      <div className='test-1'>
        <p>Description</p>
        <input type='text' name='description' placeholder='Description' />
      </div>
      {/* Row_2  */}
      <div>Icon</div>
      <div className='test-1'>
        <p>Unit</p>
        <input type='text' name='unit' placeholder='Unit' />
      </div>
      <button
        value={mtrl.id}
        onClick={expandMtrlColor}
        className='btn btn-primary'
      >
        Color set
      </button>
      <div className='test-1'>
        <p>MtrlSize</p>
        <input type='text' name='mtrlSize' placeholder='MtrlSize' />
      </div>
      <div className='test-1'>
        <p>Consumption</p>
        <input type='text' name='cspt' placeholder='Consumption' />
      </div>
      <button value={mtrl.id} onClick={deleteMtrl} className='btn btn-danger'>
        x
      </button>
      {/* Row_3  */}
      {mtrl.expandColor ? (
        <Fragment>
          {mtrl.mtrlColors.map((mtrlColor) => (
            <MtrlClr
              key={mtrlColor.id}
              mtrlColor={mtrlColor}
              mtrlId={mtrl.id}
            />
          ))}
        </Fragment>
      ) : null}
    </div>
  );
};

export default Mtrl;

// PropTyeps
Mtrl.propTypes = {
  mtrl: PropTypes.object.isRequired,
};
