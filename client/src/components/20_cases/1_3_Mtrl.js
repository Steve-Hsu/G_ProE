import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import CasesContext from '../../context/cases/casesContext';
import MtrlClr from './1_3_1_MtrlClr';
import MtrlSizeSPEC from './1_3_2_MtrlSizeSPEC';

const Mtrl = ({ mtrl }) => {
  const casesContext = useContext(CasesContext);
  const { togglePopover, expandMtrlColor, expandSizeSPEC } = casesContext;
  //For sparete the postion of btn, here use an inline style.
  //deleteBtn in mtrl.
  const deleteBtnPosition = {
    top: ' 70%',
    left: '85%',
    transform: 'translate(-1rem, -1rem)',
  };

  return (
    <div>
      {/* Row_1  */}
      <div className='grid-6 pb test-3'>
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
      </div>
      {/* Row_2  */}
      <div className='grid-6 pb test-3'>
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
        <button
          value={mtrl.id}
          onClick={expandSizeSPEC}
          className='btn btn-primary'
        >
          Size SPEC
        </button>
        <div className='test-1'>
          <p>Consumption</p>
          <input type='text' name='cspt' placeholder='Consumption' />
        </div>
        <div>
          <button
            value={mtrl.id}
            name='mtrl'
            onClick={togglePopover}
            className='btn btn-danger btn-rounded-square'
            style={deleteBtnPosition}
          >
            x
          </button>
        </div>
      </div>
      {/* Row_3  */}
      {mtrl.expandColor ? (
        <div className='grid-1-5 test-3'>
          <div className='test-5'>se</div>
          <div className='grid-5 test-4'>
            {mtrl.mtrlColors.map((mtrlColor) => (
              <MtrlClr
                key={mtrlColor.id}
                mtrlColor={mtrlColor}
                mtrlId={mtrl.id}
              />
            ))}
          </div>
        </div>
      ) : null}
      {/* Row_4  */}
      {mtrl.expandSizeSPEC ? (
        <div className='grid-1-5'>
          <div>se</div>
          <div className='grid-5 test-3'>
            {mtrl.sizeSPECs.map((sizeSPEC) => (
              <MtrlSizeSPEC
                key={sizeSPEC.id}
                sizeSPEC={sizeSPEC}
                mtrlId={mtrl.id}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Mtrl;

// PropTyeps
Mtrl.propTypes = {
  mtrl: PropTypes.object.isRequired,
};
