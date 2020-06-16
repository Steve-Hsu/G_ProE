import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import CasesContext from '../../context/cases/casesContext';
import MtrlClr from './1_4_1_MtrlClr';
import MtrlSizeSPEC from './1_4_2_MtrlSizeSPEC';
import MtrlCspt from './1_4_3_MtrlCspt';

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

  const row_1_titles = [
    'Item',
    'SPEC',
    'Supplier',
    'Ref_no',
    'Position',
    'Description',
  ];

  return (
    <div className='mb-1 p-1 card'>
      {/* Row_1  */}
      <div className='grid-6 pb'>
        {row_1_titles.map((a) => (
          <div key={`${a}${mtrl.id}`}>
            <input
              type='text'
              id={`${a}${mtrl.id}`}
              name={mtrl.id}
              placeholder='.'
              onChange={addMtrlValue}
              className='MPH-input'
            />
            <label htmlFor={`${a}${mtrl.id}`} className='MPH-input-label'>
              {a}
            </label>
          </div>
        ))}
      </div>
      {/* Row_2  */}
      <div className='grid-6 pb'>
        <div>Icon</div>
        <div>
          <input
            id={`Unit${mtrl.id}`}
            type='text'
            name={mtrl.id}
            placeholder='.'
            onChange={addMtrlValue}
            className='MPH-input'
          />
          <label htmlFor={`Unit${mtrl.id}`} className='MPH-input-label'>
            Unit
          </label>
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
              <div>
                {`${cWay.gClr}`.charAt(0).toUpperCase() +
                  `${cWay.gClr}`.slice(1)}
              </div>
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
