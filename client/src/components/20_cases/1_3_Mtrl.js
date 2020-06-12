import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import CasesContext from '../../context/cases/casesContext';
import MtrlClr from './1_3_1_MtrlClr';
import MtrlSizeSPEC from './1_3_2_MtrlSizeSPEC';
import MtrlCspt from './1_3_3_MtrlCspt';

const Mtrl = ({ mtrl }) => {
  const casesContext = useContext(CasesContext);
  const {
    cWays,
    togglePopover,
    expandMtrlColor,
    expandSizeSPEC,
    expandMtrlCspt,
    addMtrlValue,
  } = casesContext;
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
          <input
            id={mtrl.id}
            type='text'
            name='item'
            placeholder='Item'
            onChange={addMtrlValue}
          />
        </div>
        <div className='test-1'>
          <p>SPEC</p>
          <input
            id={mtrl.id}
            type='text'
            name='spec'
            placeholder='spec'
            onChange={addMtrlValue}
          />
        </div>
        <div className='test-1'>
          <p>Supplier</p>
          <input
            id={mtrl.id}
            type='text'
            name='supplier'
            placeholder='Supplier'
            onChange={addMtrlValue}
          />
        </div>
        <div className='test-1'>
          <p>REF_No</p>
          <input
            id={mtrl.id}
            type='text'
            name='ref_no'
            placeholder='Reference Number'
            onChange={addMtrlValue}
          />
        </div>
        <div className='test-1'>
          <p>Position</p>
          <input
            id={mtrl.id}
            type='text'
            name='position'
            placeholder='Position'
            onChange={addMtrlValue}
          />
        </div>
        <div className='test-1'>
          <p>Description</p>
          <input
            id={mtrl.id}
            type='text'
            name='description'
            placeholder='Description'
            onChange={addMtrlValue}
          />
        </div>
      </div>
      {/* Row_2  */}
      <div className='grid-6 pb test-3'>
        <div>Icon</div>
        <div className='test-1'>
          <p>Unit</p>
          <input
            id={mtrl.id}
            type='text'
            name='unit'
            placeholder='Unit'
            onChange={addMtrlValue}
          />
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
        <button
          value={mtrl.id}
          onClick={expandMtrlCspt}
          className='btn btn-primary'
        >
          Consumption
        </button>
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
          <div></div>
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
          <div></div>
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
      {/* Row_5  */}
      {mtrl.expandCspt
        ? cWays.map((cWay) => (
            <div className='grid-1-5' key={`ColorTitle${cWay.id}`}>
              <div>{`${cWay.gClr}`}</div>
              <MtrlCspt
                key={`Fragment${cWay.id}${mtrl.id}`}
                cWay={cWay}
                mtrl={mtrl}
              />
            </div>
          ))
        : null}
    </div>
  );
};

export default Mtrl;

// PropTyeps
Mtrl.propTypes = {
  mtrl: PropTypes.object.isRequired,
};
